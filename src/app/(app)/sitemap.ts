import { getBaseUrl } from "@/lib/getBaseUrl";
import type { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Get most recent polls
    // const polls = await getIndexPolls();
    // const mostRecentPoll = polls[0];
    // const pollPages = polls.map((poll) => ({
    //   url: `${getBaseUrl()}/polls/${poll.slug}`,
    //   priority: 0.25,
    //   lastModified: new Date(poll.created_at!),
    // }));

    const staticPages = [
      {
        url: `${getBaseUrl()}/`,
        priority: 1,
        lastModified: new Date(),
      },
      {
        url: `${getBaseUrl()}/how-it-works`,
        priority: 0.5,
        lastModified: new Date(),
      },
      {
        url: `${getBaseUrl()}/privacy-policy`,
        priority: 0.5,
        lastModified: new Date(),
      },
      {
        url: `${getBaseUrl()}/features/rapid-ai-poll-creation`,
        priority: 0.5,
        lastModified: new Date(),
      },
      {
        url: `${getBaseUrl()}/features/realtime-consensus-analytics`,
        priority: 0.5,
        lastModified: new Date(),
      },
      {
        url: `${getBaseUrl()}/features/integration-ready-api`,
        priority: 0.5,
        lastModified: new Date(),
      },
    ];
    return [...staticPages];
  } catch (e) {
    return [];
  }
}
