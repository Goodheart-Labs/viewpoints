import { getPollResults } from "@/lib/getPollResults";
import { getOptionalVisitorId } from "@/lib/getVisitorIdOrThrow";
import { StatementReview } from "@/lib/schemas";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const visitorId = getOptionalVisitorId();
  const { slug } = params;
  const { searchParams } = new URL(req.url);
  const sort = (searchParams.get("sort") ??
    "consensus") as keyof StatementReview;
  const segment = searchParams.get("segment") ?? "all";
  const results = await getPollResults({ slug, sort, segment, visitorId });
  return Response.json(results, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
