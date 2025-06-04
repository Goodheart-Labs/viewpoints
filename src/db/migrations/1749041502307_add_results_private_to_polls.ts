import type { Kysely } from "kysely";
import type { Database } from "../schema";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable("polls")
    .addColumn("results_public", "boolean", (col) =>
      col.notNull().defaultTo(true),
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.alterTable("polls").dropColumn("results_public").execute();
}
