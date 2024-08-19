import { getVisitorId } from "@/lib/getVisitorId";

export default async function PollPage() {
  const visitorId = await getVisitorId();
  return <div>{visitorId}</div>;
}
