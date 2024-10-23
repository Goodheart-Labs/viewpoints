"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return;

    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      throw new Error("NEXT_PUBLIC_POSTHOG_KEY is not set");
    }

    if (!process.env.NEXT_PUBLIC_POSTHOG_HOST) {
      throw new Error("NEXT_PUBLIC_POSTHOG_HOST is not set");
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always", // or 'always' to create profiles for anonymous users as well
    });
  }, []);

  // Don't init posthog in dev mode
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production")
    return <>{children}</>;

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
