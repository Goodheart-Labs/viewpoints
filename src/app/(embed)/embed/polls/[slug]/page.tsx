import { getPoll } from "@/lib/getPoll";

import { Poll } from "@/components/Poll";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getPoll(slug);
  return (
    <div className="min-h-[100dvh] grid place-items-center">
      <div className="max-w-4xl w-full mx-auto px-4 py-8 grid content-center gap-6">
        <Poll {...data} />
      </div>
    </div>
  );
}
