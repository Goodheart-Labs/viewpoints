import { db } from "@/db/client";
import { notFound } from "next/navigation";
import { StatementChoice, StatementReview } from "./schemas";
import { ChoiceEnum } from "kysely-codegen";

/**
 * Returns everything needed to render the results page.
 */
export async function getPollResults(
  slug: string,
  sort: keyof StatementReview,
  visitorId?: string,
) {
  const poll = await db
    .selectFrom("polls")
    .selectAll()
    .where("slug", "=", slug)
    .executeTakeFirst();

  if (!poll) {
    return notFound();
  }

  // Get all visible statements
  const visibleStatements = await db
    .selectFrom("statements")
    .selectAll()
    .where("poll_id", "=", poll.id)
    .where("visible", "=", true)
    .where("question_type", "=", "default")
    .execute();

  // Get all responses for visible statements
  const responses = await db
    .selectFrom("responses")
    .selectAll()
    .where(
      "statementId",
      "in",
      visibleStatements.map((statement) => statement.id),
    )
    .execute();

  // Count unique respondents
  const uniqueRespondentsCount = new Set(
    responses.map((response) => response.session_id),
  ).size;

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

  for (const { statementId, choice } of responses) {
    if (!choice) continue;

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
    const visitorResponses = responses.filter(
      (response) =>
        response.session_id === visitorId || response.user_id === visitorId,
    );

    for (const { statementId, choice } of visitorResponses) {
      if (choice === "skip") continue;

      // Get all the other responses for the same statement
      const otherResponses = responses
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

  return {
    poll,
    statements,
    responsesCount: responses.length,
    choiceCount,
    choicePercentage,
    uniqueRespondentsCount,
    review,
    visitorMostConsensusStatementId,
    visitorMostConflictStatementId,
  };
}
