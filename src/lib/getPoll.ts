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
      statements.map((s) => s.id),
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
      statements.map((s) => s.id),
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
      statements.map((s) => s.id),
    )
    .execute();

  statements = shuffleStatements(statements, visitorId);

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
  statements: Awaited<ReturnType<typeof getPoll>>["statements"],
  sessionId: string,
) {
  const demographicQuestions = statements.filter(
    (s) => s.question_type === "demographic",
  );

  const nonDemographicQuestions = statements.filter(
    (s) => s.question_type !== "demographic",
  );

  const shuffledNonDemographicQuestions = predictableShuffle(
    nonDemographicQuestions,
    sessionId,
  );

  const result = [...shuffledNonDemographicQuestions];

  let demographicIndex = 3;
  while (demographicQuestions.length) {
    result.splice(demographicIndex, 0, demographicQuestions.pop()!);
    // increment by the ceiling of the remaining non-demographic questions / demographic questions
    demographicIndex += Math.ceil(
      (nonDemographicQuestions.length - 3) / (demographicQuestions.length - 1),
    );
  }

  return result;
}

function hashStringToNumber(hash: string): number {
  let hashValue = 0;
  for (let i = 0; i < hash.length; i++) {
    hashValue = (hashValue << 5) - hashValue + hash.charCodeAt(i);
    hashValue |= 0; // Convert to 32bit integer
  }
  return Math.abs(hashValue);
}

function predictableShuffle<T>(array: T[], sessionId: string): T[] {
  // Step 1: Convert session ID to a numerical seed
  const seed = hashStringToNumber(sessionId);

  // Step 2: Shuffle using the seed
  const rng = new SeededRandom(seed);
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  random(): number {
    // Generate a pseudo-random number based on the seed
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
}
