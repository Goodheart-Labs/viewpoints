import { getPoll } from "@/lib/getPoll";

import { PollStatement } from "@/components/PollStatement";
import { getVisitorId } from "@/lib/actions";

export default async function PollPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const visitorId = await getVisitorId();
  const { poll, statements } = await getPoll(slug, visitorId);

  return (
    <div className="grid gap-2">
      <PollStatement {...statements[0]} />
    </div>
  );
}
