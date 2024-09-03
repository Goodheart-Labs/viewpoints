import { db } from "@/db/client";
import { notFound } from "next/navigation";
import { getVisitorId } from "./actions";

/**
 * Gets the data for the page where a visitor can respond to a poll
 */
export async function getPoll(slug: string) {
  const visitorId = await getVisitorId();

  const poll = await db
    .selectFrom("polls")
    .selectAll()
    .where("slug", "=", slug)
    .executeTakeFirst();

  if (!poll) notFound();

  let statements = await db
    .selectFrom("statements")
    .leftJoin("authors", "statements.user_id", "authors.userId")
    .select([
      "statements.id",
      "statements.poll_id",
      "statements.user_id",
      "statements.text",
      "statements.visible",
      "statements.created_at",
      "statements.question_type",
      "authors.name as author_name",
      "authors.avatarUrl as author_avatar_url",
    ])
    .where("poll_id", "=", poll.id)
    .where("visible", "=", true)
    .orderBy("statements.id", "asc")
    .execute();

  // get options for statements
  const options = await db
    .selectFrom("statement_options")
    .selectAll()
    .where(
      "statement_id",
      "in",
      statements.map((s) => s.id)
    )
    .execute();

  // get any responses from this visitor id for these statements
  const responses = await db
    .selectFrom("responses")
    .selectAll()
    .where("session_id", "=", visitorId)
    .where(
      "statementId",
      "in",
      statements.map((s) => s.id)
    )
    .execute();

  const count = statements.length;

  // Get statements this user has flagged
  const flaggedStatements = await db
    .selectFrom("flagged_statements")
    .selectAll()
    .where("session_id", "=", visitorId)
    .where(
      "statementId",
      "in",
      statements.map((s) => s.id)
    )
    .execute();

  statements = statements
    // Filter out statements which the user has already responded to
    .filter((s) => {
      const response = responses.find((r) => r.statementId === s.id);
      return !response;
    })
    // Filter out statements user has flagged
    .filter((s) => {
      const flagged = flaggedStatements.find((f) => f.statementId === s.id);
      return !flagged;
    });

  statements = shuffleStatements(statements);

  return { poll, statements, responses, count, options };
}

/**
 * This function shuffles the statements array. It also
 * implements the following logic with respect to demographic
 * questions:
 * - No demographic questions should be shown in the first 3 positions.
 * - After that they should be evenly distributed throughout the remaining items
 */
function shuffleStatements(
  statements: Awaited<ReturnType<typeof getPoll>>["statements"]
) {
  const demographicQuestions = statements.filter(
    (s) => s.question_type === "demographic"
  );

  const nonDemographicQuestions = statements.filter(
    (s) => s.question_type !== "demographic"
  );

  const shuffledNonDemographicQuestions = nonDemographicQuestions.sort(
    () => 0.5 - Math.random()
  );

  const result = [...shuffledNonDemographicQuestions];

  let demographicIndex = 3;
  while (demographicQuestions.length) {
    result.splice(demographicIndex, 0, demographicQuestions.pop()!);
    // increment by the ceiling of the remaining non-demographic questions / demographic questions
    demographicIndex += Math.ceil(
      (nonDemographicQuestions.length - 3) / (demographicQuestions.length - 1)
    );
  }

  return result;
}
