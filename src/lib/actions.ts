"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { CreatePoll, getStatementsArrayFromString } from "./schemas";
import { currentUser, User } from "@clerk/nextjs/server";
import { cookies, headers } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getVisitorIdOrThrow } from "./getVisitorIdOrThrow";
import { createDemoQuestions } from "./createDemoQuestions";

/**
 * Checks if a slug exists in the database
 */
export async function checkSlugExists(slug: string) {
  const poll = await db
    .selectFrom("polls")
    .where("slug", "=", slug)
    .executeTakeFirst();
  return poll !== undefined;
}

/**
 * Revalidate the current user's polls
 */
export async function revalidateUserPolls() {
  revalidatePath("/users/polls");
}

/**
 * Get a valid slug for a new poll
 */
export async function getNewPollSlug(title: string) {
  let slug = slugify(title, { lower: true }),
    i = 0;
  while (await checkSlugExists(slug)) {
    i++;
    slug = slugify(title, { lower: true }) + "-" + i;
  }
  return slug;
}

/**
 * Create a new poll
 */
export async function createPoll({
  new_statements_visible_by_default,
  title,
  slug,
  poll_type: visibility,
  question,
  with_demographic_questions,
  statements: statementsInput,
}: CreatePoll) {
  const user = await currentUser();
  const visitorId = getVisitorIdOrThrow();
  const { protect } = auth();

  if (!user || !visitorId) {
    protect();
    return;
  }

  // Switch to this if allowing anonymous poll creators
  // if (!user && !visitorId) return protect();

  const statements = getStatementsArrayFromString(statementsInput);

  const poll = await db.transaction().execute(async (tx) => {
    const newPoll = await tx
      .insertInto("polls")
      .values({
        user_id: user.id,
        title,
        slug,
        core_question: question,
        visibility,
        new_statements_visible_by_default,
        analytics_filters: {},
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    if (Array.isArray(statements) && statements.length) {
      await createAuthorIfNeeded(user);

      await Promise.all(
        statements.map((statement: string) =>
          tx
            .insertInto("statements")
            .values({
              answer_type: "default",
              poll_id: newPoll.id,
              user_id: user.id,
              session_id: visitorId,
              text: statement,
            })
            .execute()
        )
      );
    }

    if (with_demographic_questions) {
      await createDemoQuestions(tx, {
        poll_id: newPoll.id,
        user_id: user.id,
        session_id: visitorId,
      });
    }

    return newPoll;
  });

  revalidatePath("/users/polls");
  redirect(`/polls/${poll.slug}`);
}

async function createAuthorIfNeeded(user: User) {
  const author = await db
    .selectFrom("authors")
    .selectAll()
    .where("userId", "=", user.id)
    .executeTakeFirst();

  if (!author) {
    await db
      .insertInto("authors")
      .values({
        userId: user.id,
        name:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : "Anonymous",
        avatarUrl: user.imageUrl,
      })
      .execute();
  }
}

/**
 * Returns the unique visitor id for the current user or generates a new one if none is found.
 */
export async function getVisitorId() {
  const { userId } = auth();
  const visitorId = userId || cookies().get("visitorId")?.value;
  if (!visitorId) {
    // refresh the page to generate a new visitor id
    redirect(headers().get("x-pathname") || "/");
  }
  return visitorId;
}

/**
 * Changes the visibility of a poll
 */
export async function changePollVisibility({
  pollId,
  visibility,
}: {
  pollId: number;
  visibility: "public" | "hidden" | "private";
}) {
  await db
    .updateTable("polls")
    .set({ visibility })
    .where("id", "=", pollId)
    .execute();
  revalidatePath(`/user/polls/${pollId}`);
}

/**
 * Toggles the visibility of new statements for a poll
 */
export async function toggleNewStatementsVisibility({
  pollId,
  visible,
}: {
  pollId: number;
  visible: boolean;
}) {
  await db
    .updateTable("polls")
    .set({ new_statements_visible_by_default: visible })
    .where("id", "=", pollId)
    .execute();
  revalidatePath(`/user/polls/${pollId}`);
}

/**
 * Toggles the visibility of a statement
 */
export async function toggleStatementVisibility({
  pollId,
  statementId,
  visible,
}: {
  pollId: number;
  statementId: number;
  visible: boolean;
}) {
  await db
    .updateTable("statements")
    .set({ visible })
    .where("id", "=", statementId)
    .execute();
  revalidatePath(`/user/polls/${pollId}`);
}

/**
 * Deletes a statement
 */
export async function deleteStatement({
  pollId,
  statementId,
}: {
  pollId: number;
  statementId: number;
}) {
  await db.deleteFrom("statements").where("id", "=", statementId).execute();
  revalidatePath(`/user/polls/${pollId}`);
}

/**
 * Removes all flags from a statement
 */
export async function removeAllFlagsFromStatement({
  pollId,
  statementId,
}: {
  pollId: number;
  statementId: number;
}) {
  await db
    .deleteFrom("flagged_statements")
    .where("statementId", "=", statementId)
    .execute();
  // make statement visible again
  await db
    .updateTable("statements")
    .set({ visible: true })
    .where("id", "=", statementId)
    .execute();
  revalidatePath(`/user/polls/${pollId}`);
}
