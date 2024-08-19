import { db } from "@/db/client";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const polls = await getPolls();

  return (
    <main className="px-4 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 content-start">
      {polls.map((poll) => (
        <Poll key={poll.id} {...poll} />
      ))}
    </main>
  );
}

function getPolls() {
  return db
    .selectFrom("polls")
    .innerJoin("statements", "polls.id", "statements.poll_id")
    .innerJoin("authors", "polls.user_id", "authors.userId")
    .select(({ fn, eb }) => [
      "polls.id",
      "polls.slug",
      "polls.title",
      "polls.user_id",
      "authors.name as author_name",
      "authors.avatarUrl as author_avatar_url",
      fn.count<number>("statements.id").as("statementCount"),
      eb
        .selectFrom("responses")
        .innerJoin("statements as s", "responses.statementId", "s.id")
        .whereRef("s.poll_id", "=", "polls.id")
        .select(
          fn
            // @ts-ignore
            .count<number>("responses.session_id")
            .distinct()
            .as("respondentCount")
        )
        .as("respondentCount"),
    ])
    .where("polls.visibility", "=", "public")
    .orderBy("polls.id", "desc")
    .groupBy(["polls.id", "authors.name", "authors.avatarUrl"])
    .execute();
}

function Poll({
  title,
  author_name,
  author_avatar_url,
  statementCount,
  respondentCount,
  slug,
}: Awaited<ReturnType<typeof getPolls>>[number]) {
  return (
    <Link
      href={`/polls/${slug}`}
      className="bg-white rounded-lg p-6 grid gap-2 content-between min-h-[140px] lg:min-h-[180px] border shadow-sm"
    >
      <div className="grid gap-1">
        <h2 className="text-lg font-medium text-neutral-900 leading-tight text-pretty">
          {title}
        </h2>
        <div className="flex items-center text-xs text-neutral-400 space-x-2">
          <span>{statementCount} statements</span>
          <span>•</span>
          <span>{respondentCount} respondents</span>
        </div>
      </div>
      <div className="flex items-center mt-2">
        {author_avatar_url && (
          <Image
            src={author_avatar_url}
            alt={author_name ?? ""}
            className="rounded-full mr-2"
            width={24}
            height={24}
          />
        )}
        <span className="text-sm text-neutral-700">{author_name}</span>
      </div>
    </Link>
  );
}
