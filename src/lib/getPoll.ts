import { db } from "@/db/client";
import { notFound } from "next/navigation";

export async function getPoll(slug: string, visitorId: string) {
  const poll = await db
    .selectFrom("polls")
    .selectAll()
    .where("slug", "=", slug)
    .executeTakeFirst();

  if (!poll) notFound();

  const statements = await db
    .selectFrom("statements")
    .leftJoin("authors", "statements.user_id", "authors.userId")
    .select([
      "statements.id",
      "statements.poll_id",
      "statements.user_id",
      "statements.text",
      "statements.visible",
      "statements.created_at",
      "authors.name as author_name",
      "authors.avatarUrl as author_avatar_url",
    ])
    .where("poll_id", "=", poll.id)
    .where("visible", "=", true)
    .orderBy("statements.id", "asc")
    .execute();

  return { poll, statements };
}
