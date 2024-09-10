import { DEFAULT_CORE_QUESTION } from "@/lib/copy";
import { getPoll } from "@/lib/getPoll";
import { auth } from "@clerk/nextjs/server";

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
  const session = auth();
  const { poll } = await getPoll(slug);
  const isOwner = poll.user_id === session.userId;
  const isCouncilPoll = slug.includes("council");

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-8 grid content-center gap-6">
      {isCouncilPoll ? <BackToSouthGlos /> : null}
      <div className="grid gap-1">
        <PollHeader slug={slug} isOwner={isOwner} id={poll.id} />
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          {poll.title}
        </h1>
        <h2 className="text-lg text-pretty text-neutral-400 dark:text-neutral-500">
          {poll.core_question || DEFAULT_CORE_QUESTION}
        </h2>
      </div>
      {children}
    </div>
  );
}
