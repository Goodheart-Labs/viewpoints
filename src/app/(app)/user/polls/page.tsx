import Link from "next/link";
import { db } from "@/db/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import {
  FiArrowRight,
  FiBarChart,
  FiEdit,
  FiLock,
  FiPlus,
} from "react-icons/fi";
import { Button } from "@/ui/button";
import { isUserPro } from "@/lib/isUserPro";
import { UpgradeLink } from "@/components/UpgradeLink";
import { DEFAULT_CORE_QUESTION } from "@/lib/copy";
import { HiChartBar, HiSparkles } from "react-icons/hi2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const { userId } = auth();

  if (!userId) notFound();

  const isPro = await isUserPro();

  const userPolls = await getUserPolls(userId);

  return (
    <div className="w-full max-w-5xl mx-auto grid gap-8 content-start p-4 py-8">
      <header className="grid gap-4 md:flex md:items-center md:justify-between">
        <div className="grid gap-1">
          <h1
            className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50"
            data-testid="your-polls"
          >
            Your Polls
          </h1>
          {!isPro && (
            <div className="text-sm text-neutral-500">
              Create up to 3 polls on our Free Plan{" "}
              <Link
                href="/upgrade"
                className="text-orange-600 hover:text-orange-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create unlimited polls for £10/month
              </Link>
            </div>
          )}
        </div>
        {userPolls.length > 0 && (
          <Button variant="outline" asChild className="w-full md:w-auto">
            <Link href="/new-poll">
              <FiPlus className="w-4 h-4 mr-2" />
              Create Poll
            </Link>
          </Button>
        )}
      </header>

      {userPolls.length === 0 ? (
        <div className="grid place-items-center gap-8 py-24 text-center">
          <div className="relative animate-pulse">
            <HiChartBar className="w-16 h-16 text-orange-500 dark:text-orange-400" />
            <HiSparkles className="w-8 h-8 text-yellow-400 dark:text-yellow-300 absolute -top-2 -right-5" />
          </div>
          <div className="grid gap-3 max-w-md">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
              Create your first poll
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Get started by creating a poll. You&apos;ll be able to share it
              with others and collect responses in no time.
            </p>
          </div>
          <Button size="lg" variant="brand" asChild className="mt-4">
            <Link href="/new-poll">
              <FiPlus className="w-5 h-5 mr-2" />
              Create Your First Poll
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-3">
          {userPolls.map((poll) => (
            <UserPoll key={poll.id} {...poll} />
          ))}
          {!isPro ? <UpgradeLink>Want unlimited polls?</UpgradeLink> : null}
        </div>
      )}
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
  results_public,
}: Awaited<ReturnType<typeof getUserPolls>>[number] & {
  results_public: boolean;
}) {
  return (
    <div className="rounded-lg md:flex border shadow-sm bg-white dark:bg-neutral-800">
      <Link href={`/polls/${slug}`} className="grid gap-1 p-4 md:p-5 flex-grow">
        <h2 className="text-lg leading-tight font-medium text-neutral-900 dark:text-neutral-50 text-pretty flex items-center gap-2">
          {title}
          {!results_public && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center text-xs text-neutral-500 dark:text-neutral-400 ml-0.5 -mt-px">
                    <FiLock
                      className="w-3.5 h-3.5"
                      aria-label="Results are private"
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Results are private
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h2>
        <span className="text-neutral-400 dark:text-neutral-500 text-sm text-pretty overflow-hidden text-ellipsis whitespace-nowrap">
          {core_question ? core_question : DEFAULT_CORE_QUESTION}
        </span>
      </Link>
      <div className="flex gap-4 px-4 py-3 md:p-4 border-t md:border-t-0 md:border-l border-neutral-100 dark:border-neutral-700">
        <Link href={`/user/polls/${id}`} className={pollButton}>
          <FiEdit />
          Edit
        </Link>
        <Link href={`/polls/${slug}`} className={pollButton}>
          <FiArrowRight />
          View
        </Link>
        <Link href={`/polls/${slug}/results`} className={pollButton}>
          <FiBarChart />
          Results
        </Link>
      </div>
    </div>
  );
}

async function getUserPolls(userId: string) {
  return db
    .selectFrom("polls")
    .select([
      "id",
      "title",
      "core_question",
      "slug",
      "created_at",
      "results_public",
    ])
    .where("user_id", "=", userId)
    .orderBy("created_at", "desc")
    .execute();
}
