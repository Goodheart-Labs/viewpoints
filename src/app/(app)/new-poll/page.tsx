import { NewPollForm } from "@/components/NewPollForm";
import { UpgradeLink } from "@/components/UpgradeLink";
import { db } from "@/db/client";
import { getVisitorId } from "@/lib/actions";
import { isUserPro, MAX_POLLS } from "@/lib/isUserPro";
import { auth } from "@clerk/nextjs/server";

export const revalidate = 0;

export default async function NewPoll() {
  const isPro = await isUserPro();
  const { userId } = auth();
  const result = await db
    .selectFrom("polls")
    .where("user_id", "=", userId)
    .select((eb) => eb.fn.count("id").as("count"))
    .executeTakeFirstOrThrow();

  // Ensure visitorId is set, will be useful if we allow anonymous poll creators
  getVisitorId();

  const count =
    typeof result.count === "string"
      ? parseInt(result.count, 10)
      : result.count;
  const canCreatePoll = isPro || count < MAX_POLLS;
  return (
    <div
      className="w-full max-w-4xl mx-auto grid gap-2 content-start p-4 py-8"
      data-testid="new-poll-page"
    >
      <header className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Create a Poll
        </h1>
      </header>
      {canCreatePoll ? (
        <NewPollForm />
      ) : (
        <UpgradeLink>
          You&apos;ve reached the maximum number of polls you can create. Create
          unlimited polls for £10/month by upgrading to Viewpoints Plus
        </UpgradeLink>
      )}
    </div>
  );
}
