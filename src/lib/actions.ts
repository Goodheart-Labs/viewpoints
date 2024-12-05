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
import { ChoiceEnum } from "kysely-codegen";
import { checkIsBot } from "./checkIsBot";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

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
  let slug = slugify(title, {
      lower: true,
      replacement: "-",
      strict: true,
    }),
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
            .execute(),
        ),
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
  const userAgent = headers().get("user-agent");
  const isBot = checkIsBot(userAgent);

  // If it's a bot, return a constant value, and avoid auth()
  if (isBot) return "bot";

  const { userId } = auth();
  const visitorId = userId ?? cookies().get("visitorId")?.value ?? "";

  // refresh the page to generate a new visitor id
  if (!visitorId) {
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

/**
 * Creates a response to a statement
 */
export async function createResponse({
  statementId,
  pollId,
  choice,
  optionId,
  embedVisitorId,
}: {
  statementId: number;
  pollId: number;
  choice?: ChoiceEnum;
  optionId?: number;
  embedVisitorId?: string;
}) {
  if (!choice && !optionId) {
    throw new Error("Either choice or optionId must be provided");
  }

  let user: User | null = null;
  let visitorId: string | null = null;

  // In the case of embeds, don't lookup user because Clerk is not initialized
  if (embedVisitorId) {
    visitorId = embedVisitorId;
  } else {
    user = await currentUser();
    visitorId = getVisitorIdOrThrow();
  }

  await db
    .insertInto("responses")
    .values({
      statementId,
      choice: choice || null,
      option_id: optionId || null,
      user_id: user?.id,
      session_id: visitorId,
    })
    .execute();

  revalidatePath(`/polls/${pollId}`);
}

/**
 * Flags a statement
 */
export async function flagStatement({
  statementId,
  reason,
  description,
}: {
  statementId: number;
  reason: string;
  description: string | null;
}) {
  const user = await currentUser();
  const visitorId = getVisitorIdOrThrow();

  const statement = await db
    .selectFrom("statements")
    .selectAll()
    .where("id", "=", statementId)
    .executeTakeFirst();

  if (!statement) {
    throw new Error("Statement not found");
  }

  await db
    .insertInto("flagged_statements")
    .values({
      statementId,
      user_id: user?.id,
      session_id: visitorId,
      reason,
      description,
    })
    .execute();

  // Get the total number of flags for this statement
  const totalFlags = await db
    .selectFrom("flagged_statements")
    .select((eb) => [
      eb.fn.countAll<number>().as("total_flags"),
      eb.ref("statementId").as("statement_id"),
    ])
    .where("statementId", "=", statementId)
    .groupBy("statementId")
    .executeTakeFirst();

  // If the total number of flags is greater than or equal to 3, hide the statement
  if (totalFlags && totalFlags.total_flags >= 3) {
    await db
      .updateTable("statements")
      .set({ visible: false })
      .where("id", "=", statementId)
      .execute();
  }

  revalidatePath(`/polls/${statement.poll_id}`);
}

/**
 * Adds a statement to a poll
 */
export async function addStatement({
  slug,
  statement,
}: {
  slug: string;
  statement: string;
}) {
  // First, get the poll
  const poll = await db
    .selectFrom("polls")
    .selectAll()
    .where("slug", "=", slug)
    .executeTakeFirst();

  if (!poll) {
    throw new Error("Poll not found");
  }

  // Then, add the statement
  await db
    .insertInto("statements")
    .values({
      poll_id: poll.id,
      text: statement.trim(),
    })
    .execute();

  revalidatePath(`/polls/${slug}`);
}

const generatePollSchema = z.object({
  title: z.string(),
  main_question: z.string().optional(),
  statements: z.array(z.string()),
  show_demographic_questions: z.boolean().optional(),
});

type GeneratedPoll = z.infer<typeof generatePollSchema>;

/**
 * This is a function which creates a poll's title, main question and statements
 * using AI, given guidance in the prompt.
 */
export async function generatePollWithAI({
  description,
}: {
  description: string;
}): Promise<
  { success: true; poll: GeneratedPoll } | { success: false; error: string }
> {
  const basePrompt = `You are a poll creation expert. You create polls in which all statements can be answered with "agree" or "disagree". When given a description of a poll, you generate a title, main question and between 5 and 25 statements for the poll.

  For example, if the description is "I want to learn how people feel about the environment", you could generate a poll with the title "Climate Change Opinion Poll", the main question "Do you think climate change is happening?", and statements like "I think we should invest more in renewable energy" and "I think we should reduce our carbon footprint".
  
  If left blank, the main question will be "What do you think of the following statements?" 
  You can also declare whether this poll would benefit from demographic questions.

  Create a poll based on the following request:

  """
  ${description}
  """
  `;

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: generatePollSchema,
      prompt: basePrompt,
    });

    return { success: true, poll: object };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "An error occurred",
    };
  }
}
