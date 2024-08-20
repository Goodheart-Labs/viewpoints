import { db } from "@/db/client";
import { Selectable } from "kysely";
import { DB } from "kysely-codegen";
import { notFound } from "next/navigation";

export async function getPollAdminData(id: number) {
  const poll = await db
    .selectFrom("polls")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (!poll) {
    return notFound();
  }

  const [statements, allFlaggedStatements] = await Promise.all([
    db
      .selectFrom("statements")
      .selectAll()
      .where("poll_id", "=", poll.id)
      .orderBy("id", "asc")
      .execute(),
    db
      .selectFrom("flagged_statements")
      .selectAll()
      .where(
        "statementId",
        "in",
        db.selectFrom("statements").select("id").where("poll_id", "=", poll.id)
      )
      .execute(),
  ]);

  const flaggedStatements = allFlaggedStatements.reduce((acc, fs) => {
    if (!acc[fs.statementId]) {
      acc[fs.statementId] = [];
    }
    acc[fs.statementId].push(fs);
    return acc;
  }, {} as Record<number, Selectable<DB["flagged_statements"]>[]>);

  return { poll, statements, flaggedStatements };
}
