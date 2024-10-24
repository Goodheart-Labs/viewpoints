import { getBaseUrl } from "@/lib/getBaseUrl";
import { getIndexPolls } from "@/lib/getIndexPolls";
import type { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const polls = await getIndexPolls();
    const mostRecentPoll = polls[0];
    const pollPages = polls.map((poll) => ({
      url: `${getBaseUrl()}/polls/${poll.slug}`,
      priority: 0.25,
      lastModified: new Date(poll.created_at!),
    }));
    const staticPages = [
      {
        url: `${getBaseUrl()}/`,
        priority: 1,
        lastModified: mostRecentPoll?.created_at,
      },
      {
        url: `${getBaseUrl()}/how-it-works`,
        priority: 1,
      },
    ];
    return [...pollPages, ...staticPages];
  } catch (e) {
    return [];
  }
}
