import { DEFAULT_CORE_QUESTION } from "@/lib/copy";
import { getPoll } from "@/lib/getPoll";

import { PollHeader } from "@/components/PollHeader";
import { BackToSouthGlos } from "@/components/BackToSouthGlos";

export default async function PollLayout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const results = await getPoll(slug);

  const isCouncilPoll = slug.includes("council");

  return (
    <div
      className="max-w-7xl w-full mx-auto p-4 mt-4 grid content-center gap-6"
      data-testid="poll-layout"
    >
      {isCouncilPoll ? <BackToSouthGlos /> : null}
      <div className="grid gap-1">
        <PollHeader
          slug={slug}
          isOwner={results.isOwner}
          pollId={results.poll.id}
        />
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          {results.poll.title}
        </h1>
        <h2 className="sm:text-lg text-pretty text-neutral-400 dark:text-neutral-500 leading-tight">
          {results.poll.core_question || DEFAULT_CORE_QUESTION}
        </h2>
      </div>
      {children}
    </div>
  );
}
