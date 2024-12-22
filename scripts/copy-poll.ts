import { config } from "dotenv";
import { resolve } from "path";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "kysely-codegen";

// Load production credentials
config({ path: resolve(__dirname, "../.env.util") });

// Hardcoded local user ID to assign polls to
const LOCAL_USER_ID = "user_2VORchEE6k0mYlVb4t57uwIfMmC"; // Adjust this based on your local setup

// Initialize production DB connection
const productionDb = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.COPY_DATABASE_URL,
    }),
  }),
});

// Initialize local DB connection
const localDb = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString:
        "postgres://viewpoints:viewpoints@localhost:5432/viewpoints_development", // Adjust this to match your local DB
    }),
  }),
});

async function copyPoll(slug: string) {
  try {
    // 1. Fetch the poll and related data from production
    const poll = await productionDb
      .selectFrom("polls")
      .selectAll()
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!poll) {
      throw new Error(`Poll with slug "${slug}" not found`);
    }

    // 2. Fetch related statements
    const statements = await productionDb
      .selectFrom("statements")
      .selectAll()
      .where("poll_id", "=", poll.id)
      .execute();

    // 3. Fetch statement options
    const options = await productionDb
      .selectFrom("statement_options")
      .selectAll()
      .where(
        "statement_id",
        "in",
        statements.map((s) => s.id),
      )
      .execute();

    // 4. Fetch statement responses
    const responses = await productionDb
      .selectFrom("responses")
      .selectAll()
      .where(
        "statementId",
        "in",
        statements.map((s) => s.id),
      )
      .execute();

    // 4. Begin transaction for local insertion
    await localDb.transaction().execute(async (trx) => {
      // Insert poll with local user
      const [newPoll] = await trx
        .insertInto("polls")
        .values({
          ...poll,
          id: undefined, // Let DB auto-generate
          user_id: LOCAL_USER_ID,
          created_at: new Date(),
        })
        .returning("id")
        .execute();

      // Insert statements
      const statementMap = new Map<number, number>();
      for (const statement of statements) {
        const [newStatement] = await trx
          .insertInto("statements")
          .values({
            ...statement,
            id: undefined,
            poll_id: newPoll.id,
            user_id: LOCAL_USER_ID,
            session_id: LOCAL_USER_ID,
            created_at: new Date(),
          })
          .returning("id")
          .execute();

        statementMap.set(statement.id, newStatement.id);
      }

      // Insert statement options and maintain mapping
      const optionMap = new Map<number, number>();
      for (const option of options) {
        const [newOption] = await trx
          .insertInto("statement_options")
          .values({
            ...option,
            id: undefined,
            statement_id: statementMap.get(option.statement_id)!,
          })
          .returning("id")
          .execute();

        optionMap.set(option.id, newOption.id);
      }

      // Insert responses with mapped option IDs
      if (responses.length > 0) {
        await trx
          .insertInto("responses")
          .values(
            responses.map((response) => ({
              ...response,
              id: undefined,
              statementId: statementMap.get(response.statementId)!,
              option_id: response.option_id
                ? optionMap.get(response.option_id)
                : null,
              created_at: new Date(),
            })),
          )
          .execute();
      }
    });

    console.log(`Successfully copied poll "${slug}" to local database`);
  } catch (error) {
    console.error("\nFailed to copy poll:");
    if (error instanceof Error) {
      console.error(`\n  Error: ${error.message}`);
      if (error.stack) {
        console.error(`\n  Stack: ${error.stack}`);
      }
    } else {
      console.error(`\n  ${error}`);
    }
    process.exit(1);
  } finally {
    // Cleanup connections
    try {
      await Promise.all([productionDb.destroy(), localDb.destroy()]);
    } catch (error) {
      console.error("Failed to cleanup database connections:", error);
      process.exit(1);
    }
  }
}

// Get slug from command line arguments
const slug = process.argv[2];
if (!slug) {
  console.error("Please provide a poll slug");
  process.exit(1);
}

copyPoll(slug);
