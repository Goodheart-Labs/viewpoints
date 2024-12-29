"use client";

import { v4 } from "uuid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ClientOnly } from "@/components/ClientOnly";
import { Poll } from "@/components/Poll";
import type { GetPollData } from "@/lib/getPoll";

export const dynamic = "force-dynamic";

export default function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <>
      <ClientOnly>
        <EmbedPage slug={slug} />
      </ClientOnly>
    </>
  );
}

function EmbedPage({ slug }: { slug: string }) {
  const visitorId = useVisitorId();
  const { data } = useSuspenseQuery({
    queryKey: ["poll", slug, "vote", visitorId],
    queryFn: () =>
      fetch(`/api/polls/${slug}/vote?visitorId=${visitorId}`).then(
        (res) => res.json() as Promise<GetPollData>,
      ),
  });

  return (
    <div className="min-h-[100dvh] grid content-start">
      <div className="max-w-4xl w-full mx-auto px-4 py-8 grid content-center gap-6">
        <Poll {...data} embedVisitorId={visitorId} />
      </div>
    </div>
  );
}

const getOrCreateVisitorId = (): Promise<string> => {
  const key = "visitorId";
  let visitorId = localStorage.getItem(key);

  if (!visitorId) {
    visitorId = v4();
    localStorage.setItem(key, visitorId);
  }

  // Simulate async operation to ensure suspension
  return new Promise((resolve) => setTimeout(() => resolve(visitorId), 0));
};

const useVisitorId = () => {
  const { data: visitorId } = useSuspenseQuery({
    queryKey: ["visitorId"],
    queryFn: getOrCreateVisitorId,
    staleTime: Infinity, // Prevent unnecessary refetches
  });

  return visitorId;
};
