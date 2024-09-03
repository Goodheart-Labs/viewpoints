import { getPoll } from "@/lib/getPoll";

import { Poll } from "@/components/Poll";

export default async function PollPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getPoll(slug);
  return <Poll {...data} />;
}
