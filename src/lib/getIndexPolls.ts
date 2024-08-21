import { db } from "@/db/client";

/**
 * Get public polls which have at least one visible statement
 */
export function getIndexPolls() {
  return db
    .selectFrom("polls")
    .innerJoin("statements", "polls.id", "statements.poll_id")
    .innerJoin("authors", "polls.user_id", "authors.userId")
    .select(({ fn, eb }) => [
      "polls.id",
      "polls.slug",
      "polls.title",
      "polls.user_id",
      "polls.created_at",
      "authors.name as author_name",
      "authors.avatarUrl as author_avatar_url",
      fn.count<number>("statements.id").as("statementCount"),
      eb
        .selectFrom("responses")
        .innerJoin("statements as s", "responses.statementId", "s.id")
        .whereRef("s.poll_id", "=", "polls.id")
        .select(
          fn
            // @ts-ignore
            .count<number>("responses.session_id")
            .distinct()
            .as("respondentCount")
        )
        .as("respondentCount"),
    ])
    .where("polls.visibility", "=", "public")
    .where("statements.visible", "=", true)
    .groupBy(["polls.id", "authors.name", "authors.avatarUrl"])
    .having((eb) => eb.fn.count("statements.id"), ">", 0)
    .orderBy("polls.id", "desc")
    .execute();
}
