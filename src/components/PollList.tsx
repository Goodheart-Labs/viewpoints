"use client";

import { getIndexPolls } from "@/lib/getIndexPolls";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { useEffect } from "react";
import { useState } from "react";

export function PollList({
  polls,
}: {
  polls: Awaited<ReturnType<typeof getIndexPolls>>;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {polls.map((poll) => (
        <Poll key={poll.id} {...poll} />
      ))}
    </>
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
        <span className="text-lg font-semibold leading-tight text-pretty text-neutral-700 dark:text-neutral-100">
          {title}
        </span>
        <div className="flex items-center space-x-2 text-neutral-400 text-[15px]">
          <span>{statementCount} statements</span>
          <span>•</span>
          <span>{respondentCount} respondents</span>
        </div>
      </div>
      <div className="flex items-center mt-2">
        {author_avatar_url && (
          <Avatar className="mr-2">
            <AvatarImage src={author_avatar_url} alt={author_name ?? ""} />
            <AvatarFallback>{author_name?.[0] ?? ""}</AvatarFallback>
          </Avatar>
        )}
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          {author_name}
        </span>
      </div>
    </Link>
  );
}
