import { getPollResults } from "@/lib/getPollResults";
import { getOptionalVisitorId } from "@/lib/getVisitorIdOrThrow";
import { StatementReview } from "@/lib/schemas";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const visitorId = getOptionalVisitorId();
  console.log("visitorId", visitorId);
  const { slug } = params;
  const { searchParams } = new URL(req.url);
  const sort = (searchParams.get("sort") ??
    "consensus") as keyof StatementReview;

  const results = await getPollResults(slug, sort, visitorId);
  return Response.json(results);
}
