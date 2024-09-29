import { db } from "@/db/client";
import { getVisitorId } from "@/lib/actions";

/**
 * The live endpoint returns whether there are new statements
 * that have been added since the last time the user checked.
 */
export async function GET(req: Request, context: { params: { slug: string } }) {
  const { slug } = context.params;

  if (!slug) {
    return Response.json({ error: "No slug provided" }, { status: 400 });
  }

  // get the current visitor
  const visitorId = await getVisitorId();

  // If no visitor, return false
  if (!visitorId) {
    return Response.json({ hasNewStatements: false });
  }

  // get the last statement the visitor has seen
  const hasNewStatements = await visitorRespondedToAllStatements(
    visitorId,
    slug,
  );

  return Response.json({ hasNewStatements });
}

async function visitorRespondedToAllStatements(
  visitorId: string,
  slug: string,
) {
  // get poll id from slug
  const poll = await db
    .selectFrom("polls")
    .select(["id"])
    .where("slug", "=", slug)
    .executeTakeFirst();

  if (!poll) {
    return false;
  }

  // get all the poll statements
  const visibleStatements = await db
    .selectFrom("statements")
    .select(["id", "text"])
    .where("poll_id", "=", poll.id)
    .where("visible", "=", true)
    .execute();

  // get all the responses for the visitor
  const responses = await db
    .selectFrom("responses")
    .selectAll()
    .where("session_id", "=", visitorId)
    .where(
      "statementId",
      "in",
      visibleStatements.map((s) => s.id),
    )
    .execute();

  // get any flags from this user for these statements
  const flaggedStatements = await db
    .selectFrom("flagged_statements")
    .selectAll()
    .where("session_id", "=", visitorId)
    .where(
      "statementId",
      "in",
      visibleStatements.map((s) => s.id),
    )
    .execute();

  return visibleStatements.length > responses.length + flaggedStatements.length;
}
