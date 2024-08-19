import Link from "next/link";
import { db } from "@/db/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { FiEye, FiPlus, FiSettings, FiEdit2 } from "react-icons/fi";
import { Button } from "@/ui/button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const { userId } = auth();

  if (!userId) notFound();

  const userPolls = await getUserPolls(userId);

  return (
    <div className="w-full max-w-5xl mx-auto grid gap-4 content-start p-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Your Polls</h1>
        <Button variant="highlight">
          <FiPlus className="w-4 h-4 mr-2" />
          Create Poll
        </Button>
      </header>
      <div className="grid gap-2">
        {userPolls.map((poll) => (
          <UserPoll key={poll.id} {...poll} />
        ))}
      </div>
    </div>
  );
}

const pollButton =
  "flex items-center gap-2 p-2 text-sm text-neutral-600 font-medium hover:opacity-50";

function UserPoll({
  id,
  title,
  core_question,
  slug,
}: Awaited<ReturnType<typeof getUserPolls>>[number]) {
  return (
    <div className="bg-white rounded-lg md:flex border shadow-sm">
      <Link href={`/polls/${slug}`} className="grid p-6 flex-grow">
        <h2 className="text-lg font-medium text-neutral-900">{title}</h2>
        <span className="text-neutral-500 text-sm text-pretty overflow-hidden text-ellipsis whitespace-nowrap">
          {core_question ? core_question : <em>No question</em>}
        </span>
      </Link>
      <div className="flex gap-4 p-4">
        <Link href={`/user/polls/${id}`} className={pollButton}>
          <FiSettings />
          Admin
        </Link>
        <Link href={`/polls/${slug}`} className={pollButton}>
          <FiEye />
          View
        </Link>
      </div>
    </div>
  );
}

async function getUserPolls(userId: string) {
  return db
    .selectFrom("polls")
    .select(["id", "title", "core_question", "slug"])
    .where("user_id", "=", userId)
    .execute();
}
