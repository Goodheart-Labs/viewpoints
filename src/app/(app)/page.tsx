import { getIndexPolls } from "@/lib/getIndexPolls";
import Link from "next/link";

export default async function Home() {
  const polls = await getIndexPolls();

  return (
    <main className="px-4 w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 content-start">
      {polls.map((poll) => (
        <Poll key={poll.id} {...poll} />
      ))}
    </main>
  );
}

function Poll({
  title,
  author_name,
  author_avatar_url,
  statementCount,
  respondentCount,
  slug,
}: Awaited<ReturnType<typeof getIndexPolls>>[number]) {
  return (
    <Link
      href={`/polls/${slug}`}
      className="rounded-lg p-6 grid gap-2 content-between min-h-[140px] lg:min-h-[180px] shadow-sm bg-white hover:bg-white/30 dark:bg-neutral-800 dark:hover:bg-neutral-800/80"
    >
      <div className="grid gap-1">
        <h2 className="text-lg font-semibold leading-tight text-pretty text-neutral-700 dark:text-neutral-100">
          {title}
        </h2>
        <div className="flex items-center space-x-2 text-neutral-400 text-[15px]">
          <span>{statementCount} statements</span>
          <span>•</span>
          <span>{respondentCount} respondents</span>
        </div>
      </div>
      <div className="flex items-center mt-2">
        {author_avatar_url && (
          <img
            src={author_avatar_url}
            alt={author_name ?? ""}
            className="rounded-full mr-2"
            width={24}
            height={24}
          />
        )}
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          {author_name}
        </span>
      </div>
    </Link>
  );
}
