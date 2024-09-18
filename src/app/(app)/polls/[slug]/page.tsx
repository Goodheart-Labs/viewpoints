import { getPoll } from "@/lib/getPoll";

import { Poll } from "@/components/Poll";
import { getBaseUrl } from "@/lib/getBaseUrl";

export default async function PollPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getPoll(slug);
  const url = `${getBaseUrl()}/polls/${data.poll.slug}`;
  const twitterShareUrl = `${url}?utm_source=twitter&utm_medium=social&utm_campaign=share&utm_content=${data.poll.id}`;
  return (
    <>
      <title>{data.poll.title}</title>
      <meta name="description" content={data.poll.core_question} />
      <meta property="og:title" content={data.poll.title} />
      <meta property="og:description" content={data.poll.core_question} />
      <meta property="og:url" content={twitterShareUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${getBaseUrl()}/open-graph.png`} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={data.poll.title} />
      <meta property="twitter:description" content={data.poll.core_question} />
      <meta property="twitter:site" content="viewpoints.xyz" />
      <meta property="twitter:url" content={twitterShareUrl} />
      <Poll {...data} />
    </>
  );
}
