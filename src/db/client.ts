import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "kysely-codegen";

let connectionString = process.env.DATABASE_URL;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
