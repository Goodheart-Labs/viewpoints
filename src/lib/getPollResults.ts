import { db } from "@/db/client";
import { notFound } from "next/navigation";
import { StatementChoice, StatementReview } from "./schemas";
import { ChoiceEnum } from "kysely-codegen";

export type PollResults = Awaited<ReturnType<typeof getPollResults>>;

/**
 * Returns everything needed to render the results page.
 */
export async function getPollResults({
  slug,
  sort,
  segment,
  visitorId,
}: {
  slug: string;
  sort: keyof StatementReview;
  segment?: string;
  visitorId?: string;
}) {
  const poll = await db
    .selectFrom("polls")
    .selectAll()
    .where("slug", "=", slug)
    .executeTakeFirst();

  if (!poll) {
    return notFound();
  }

  // Get all visible statements including demographic questions
  const questions = await db
    .selectFrom("statements")
    .selectAll()
    .where("poll_id", "=", poll.id)
    .where("visible", "=", true)
    .execute();

  // Get non-demographic statements
  const visibleStatements = questions.filter(
    (statement) => statement.question_type === "default",
  );

  // Get all responses for all questions
  const allResponses = await getAllResponses();

  // Count unique respondents
  const uniqueRespondentsCount = new Set(
    allResponses.map((response) => response.session_id),
  ).size;

  const { review, choiceCount, choicePercentage } =
    measureConsensus(allResponses);

  // Sort statements
  const statements = visibleStatements.sort((a, b) => {
    if (!review[a.id] || !review[b.id]) return 0;
    return review[b.id][sort] - review[a.id][sort];
  });

  // If visitorId is provided, get their responses and see what
  // is their most consensus and conflicting response
  let visitorMostConsensusCount = 0;
  let visitorMostConsensusStatementId: number | null = null;
  let visitorMostConflictCount = 0;
  let visitorMostConflictStatementId: number | null = null;

  if (visitorId) {
    // Get all statements that the visitor has responded to
    const visitorResponses = allResponses.filter(
      (response) =>
        response.session_id === visitorId || response.user_id === visitorId,
    );

    for (const { statementId, choice } of visitorResponses) {
      if (choice === "skip") continue;

      // Get all the other responses for the same statement
      const otherResponses = allResponses
        .filter(
          (response) =>
            response.statementId === statementId &&
            response.session_id !== visitorId &&
            response.user_id !== visitorId,
        )
        .reduce(
          (acc, response) => {
            if (!response.choice) return acc;
            acc[response.choice] += 1;
            return acc;
          },
          { agree: 0, disagree: 0, skip: 0 } as Record<ChoiceEnum, number>,
        );

      let consensusCount = 0;
      let conflictCount = 0;
      if (choice === "agree") {
        consensusCount = otherResponses.agree;
        conflictCount = otherResponses.disagree;
      } else {
        consensusCount = otherResponses.disagree;
        conflictCount = otherResponses.agree;
      }

      if (consensusCount > visitorMostConsensusCount) {
        visitorMostConsensusCount = consensusCount;
        visitorMostConsensusStatementId = statementId;
      }

      if (conflictCount > visitorMostConflictCount) {
        visitorMostConflictCount = conflictCount;
        visitorMostConflictStatementId = statementId;
      }
    }
  }

  let segments: {
    text: string;
    measures: ReturnType<typeof measureConsensus>;
  }[] = [];
  if (segment && segment !== "all") {
    // get the statement referenced by the segment
    const segmentStatement = questions.find(
      (statement) => statement.id === parseInt(segment, 10),
    );

    if (segmentStatement) {
      // get all the responses for the segment statement
      const segmentResponses = allResponses.filter(
        (response) => response.statementId === segmentStatement.id,
      );

      const isDemographic = segmentStatement.question_type === "demographic";

      let segmentOptions: {
        id: number;
        icon: string | null;
        option: string;
        statement_id: number;
      }[] = [];

      if (isDemographic) {
        // Get all the options for the segment statement
        segmentOptions = await db
          .selectFrom("statement_options")
          .selectAll()
          .where("statement_id", "=", segmentStatement.id)
          .execute();
      }

      // Group the respondents by choice
      const groupedRespondents = segmentResponses.reduce(
        (acc, response) => {
          if (!response.session_id) return acc;

          if (isDemographic) {
            const option = segmentOptions.find(
              (option) => option.id === response.option_id,
            );
            if (!option) return acc;
            if (!acc[option.option]) acc[option.option] = [];
            acc[option.option].push(response.session_id);
          } else {
            if (!response.choice) return acc;
            if (!acc[response.choice]) acc[response.choice] = [];
            acc[response.choice].push(response.session_id);
          }
          return acc;
        },
        {} as Record<string, string[]>,
      );

      // Group all responses by choice depending on which group the respondent belongs to
      const groupedResponses = allResponses.reduce(
        (acc, response) => {
          // get the group the respondent belongs to
          let responseGroup: string | null = null;
          for (const [choice, group] of Object.entries(groupedRespondents)) {
            if (group.includes(response.session_id)) {
              responseGroup = choice;
              break;
            }
          }
          if (!responseGroup) return acc;
          if (!acc[responseGroup]) acc[responseGroup] = [];
          acc[responseGroup].push(response);
          return acc;
        },
        {} as Record<string, typeof segmentResponses>,
      );

      // Measure consensus for each choice
      for (const [choice, responses] of Object.entries(groupedResponses)) {
        const measures = measureConsensus(responses);
        segments.push({
          text: choice,
          measures,
        });
      }

      // Sort segments alphabetically
      segments.sort((a, b) => a.text.localeCompare(b.text));
    }
  }

  /**
   * We'll generalize measuring consensus for a set of responses
   */
  function measureConsensus(
    responses: Awaited<ReturnType<typeof getAllResponses>>,
  ) {
    // Count agree/disagree/skip for each statement
    const choiceCount = visibleStatements.reduce(
      (acc, statement) => {
        acc[statement.id] = {
          agree: 0,
          disagree: 0,
          skip: 0,
        };
        return acc;
      },
      {} as Record<string, StatementChoice>,
    );

    // Count agree/disagree/skip for each statement
    for (const { statementId, choice } of responses) {
      if (!choice) {
        continue;
      }

      if (!choiceCount[statementId]) {
        continue;
      }

      if (!(choice in choiceCount[statementId])) {
        continue;
      }

      choiceCount[statementId][choice] += 1;
    }

    // Calculate percentage of agree/disagree/skip for each statement
    const choicePercentage: Record<string, StatementChoice> = {};

    for (const [statementId, consensus] of Object.entries(choiceCount)) {
      const total = Object.values(consensus).reduce((a, b) => a + b, 0);
      if (total === 0) {
        choicePercentage[statementId] = {
          agree: 0,
          disagree: 0,
          skip: 0,
        };
      } else {
        choicePercentage[statementId] = {
          agree: consensus.agree / total,
          disagree: consensus.disagree / total,
          skip: consensus.skip / total,
        };
      }
    }

    // Measure amount of consensus, conflict, and uncertainty for each statement
    const review: Record<string, StatementReview> = {};
    for (const statement of visibleStatements) {
      const choices = choicePercentage?.[statement.id];
      if (!choices) continue;
      const consensus = Math.max(choices.agree, choices.disagree);
      const conflict = Math.min(choices.agree, choices.disagree);
      const confusion = choices.skip;
      review[statement.id] = {
        consensus,
        conflict,
        confusion,
        agree: choices.agree,
        disagree: choices.disagree,
        recent: statement.created_at.getTime(),
      };
    }

    return {
      review,
      choiceCount,
      choicePercentage,
    };
  }

  return {
    poll,
    statements,
    responsesCount: allResponses.length,
    choiceCount,
    choicePercentage,
    uniqueRespondentsCount,
    review,
    visitorMostConsensusStatementId,
    visitorMostConflictStatementId,
    allStatements: questions,
    segments,
  };

  function getAllResponses() {
    return db
      .selectFrom("responses")
      .selectAll()
      .where(
        "statementId",
        "in",
        questions.map((statement) => statement.id),
      )
      .execute();
  }
}
