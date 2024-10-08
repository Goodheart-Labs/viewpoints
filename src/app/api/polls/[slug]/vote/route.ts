import { getPoll } from "@/lib/getPoll";

export async function GET(
  req: Request,
  { params }: { params: { slug: string; visitorId: string } },
) {
  const { slug } = params;

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const visitorId = searchParams.get("visitorId");

  if (!visitorId) {
    return new Response("Missing visitorId", { status: 400 });
  }

  const poll = await getPoll(slug, visitorId);
  return Response.json(poll);
}
