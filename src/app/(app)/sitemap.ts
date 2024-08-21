import { getBaseUrl } from "@/lib/getBaseUrl";
import { getIndexPolls } from "@/lib/getIndexPolls";
import type { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const polls = await getIndexPolls();
    const mostRecentPoll = polls[0];
    const pollPages = polls.map((poll) => ({
      url: `${getBaseUrl()}/poll/${poll.slug}`,
      priority: 0.5,
      lastModified: new Date(poll.created_at!),
    }));
    const staticPages = [
      {
        url: `${getBaseUrl()}/`,
        priority: 1,
        lastModified: mostRecentPoll?.created_at,
      },
    ];
    return [...pollPages, ...staticPages];
  } catch (e) {
    return [];
  }
}
