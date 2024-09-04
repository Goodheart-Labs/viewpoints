import Link from "next/link";
import { db } from "@/db/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import {
  FiArrowRight,
  FiEdit,
  FiEye,
  FiPlus,
  FiSettings,
} from "react-icons/fi";
import { Button } from "@/ui/button";
import { isUserPro } from "@/lib/isUserPro";
import { UpgradeLink } from "@/components/UpgradeLink";
import { DEFAULT_CORE_QUESTION } from "@/lib/copy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const { userId } = auth();

  if (!userId) notFound();

  const isPro = await isUserPro();
  console.log({ isPro });

  const userPolls = await getUserPolls(userId);

  return (
    <div className="w-full max-w-5xl mx-auto grid gap-4 content-start p-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
          Your Polls
        </h1>
        <Button variant="highlight" asChild>
          <Link href="/new-poll">
            <FiPlus className="w-4 h-4 mr-2" />
            Create Poll
          </Link>
        </Button>
      </header>
      <div className="grid gap-2">
        {userPolls.map((poll) => (
          <UserPoll key={poll.id} {...poll} />
        ))}
        {!isPro ? <UpgradeLink>Want unlimited polls?</UpgradeLink> : null}
      </div>
    </div>
  );
}

const pollButton =
  "flex items-center gap-2 p-2 text-sm text-neutral-600 font-medium hover:opacity-50 dark:text-neutral-400";

function UserPoll({
  id,
  title,
  core_question,
  slug,
}: Awaited<ReturnType<typeof getUserPolls>>[number]) {
  return (
    <div className="rounded-lg md:flex border shadow-sm bg-white dark:bg-neutral-800">
      <Link href={`/polls/${slug}`} className="grid p-6 flex-grow">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">
          {title}
        </h2>
        <span className="text-neutral-500 text-sm text-pretty overflow-hidden text-ellipsis whitespace-nowrap dark:text-neutral-400">
          {core_question ? core_question : DEFAULT_CORE_QUESTION}
        </span>
      </Link>
      <div className="flex gap-4 p-4">
        <Link href={`/user/polls/${id}`} className={pollButton}>
          <FiEdit />
          Edit
        </Link>
        <Link href={`/polls/${slug}`} className={pollButton}>
          <FiArrowRight />
          View
        </Link>
      </div>
    </div>
  );
}

async function getUserPolls(userId: string) {
  return db
    .selectFrom("polls")
    .select(["id", "title", "core_question", "slug", "created_at"])
    .where("user_id", "=", userId)
    .orderBy("created_at", "desc")
    .execute();
}
