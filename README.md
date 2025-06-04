This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## E2E Tests

bun playwright test
Runs the end-to-end tests.

bun playwright test --ui
Starts the interactive UI mode.

bun playwright test --project=chromium
Runs the tests only on Desktop Chrome.

bun playwright test example
Runs the tests in a specific file.

bun playwright test --debug
Runs the tests in debug mode.

bun playwright codegen
Auto generate tests with Codegen.

## Database

### Overview

This project uses [Kysely](https://kysely.dev/) for type-safe database access and migrations, with PostgreSQL as the database engine. Database types are generated using `kysely-codegen` to keep TypeScript types in sync with the actual schema.

### Initial Schema

- The initial schema is set up using the SQL file at `src/db/RUN_BEFORE_MIGRATIONS.sql`. This should be run once to bootstrap a new database before applying TypeScript migrations.

### Migrations

- Migrations are written in TypeScript and stored in `src/db/migrations/`.
- Use the migration runner script at `src/db/migrate.ts` to manage migrations.
- Common commands:
  - `bun run migrate up` — Apply all pending migrations
  - `bun run migrate down` — Roll back the last migration
  - `bun run migrate version` — Show migration status
  - `bun run migrate make <name>` — Create a new migration file from a template
- Each migration file exports `up` and `down` functions using Kysely's schema builder or raw SQL.

### Making Schema Changes

1. **Create a Migration:**
   - Run `bun run migrate make <migration_name>` to generate a new migration file in `src/db/migrations/`.
   - Edit the file to add your schema changes in the `up` function and the reverse in the `down` function.
2. **Apply the Migration:**
   - Run `bun run migrate up` to apply your migration to the database.
3. **Regenerate Types:**
   - After applying migrations, regenerate the Kysely types (usually with a script or CLI command, e.g., `bun run kysely-codegen`).
   - This updates the `DB` type used throughout the codebase for type safety.

### Notes

- Always review and test migrations before running them in production.
- If you add new tables or columns, ensure you update any relevant application logic and types.
- For questions, see the files in `src/db/` for examples and reference.
