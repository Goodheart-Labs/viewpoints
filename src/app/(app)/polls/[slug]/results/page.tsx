import { ResultsPage } from "@/components/ResultsPage";
import { getPollResults } from "@/lib/getPollResults";
import { getOptionalVisitorId } from "@/lib/getVisitorIdOrThrow";
import { StatementReview } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export default async function Results({
  params,
  searchParams: { sort = "consensus" },
}: {
  params: { slug: string };
  searchParams: { sort: keyof StatementReview };
}) {
  const visitorId = getOptionalVisitorId();
  const data = await getPollResults(params.slug, sort, visitorId);

  return (
    <ResultsPage
      slug={params.slug}
      sort={sort}
      visitorId={visitorId}
      initialData={data}
    />
  );
}
