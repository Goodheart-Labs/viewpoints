import { getIndexPolls } from "@/lib/getIndexPolls";
import Image from "next/image";
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
