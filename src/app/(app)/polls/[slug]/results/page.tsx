import ResultsPage from "@/components/ResultsPage";
import { getPollResults } from "@/lib/getPollResults";
import { getOptionalVisitorId } from "@/lib/getVisitorIdOrThrow";
import { StatementReview } from "@/lib/schemas";

import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default async function Results({
  params,
  searchParams: { sort = "consensus", segment = "all" },
}: {
  params: { slug: string };
  searchParams: { sort: keyof StatementReview; segment: string };
}) {
  const visitorId = getOptionalVisitorId();
  const data = await getPollResults({
    slug: params.slug,
    sort,
    segment,
    visitorId,
  });

  return (
    <ResultsPage
      slug={params.slug}
      sort={sort}
      visitorId={visitorId}
      initialData={data}
      segment={segment}
    />
  );
}
