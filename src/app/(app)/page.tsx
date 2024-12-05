import { HomePage } from "@/components/HomePage";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { getIndexPolls } from "@/lib/getIndexPolls";

export default async function Home() {
  const polls = await getIndexPolls();
  return (
    <>
      <link rel="canonical" href={getBaseUrl()} />
      <HomePage polls={polls} />
    </>
  );
}
