import { ChoiceEnum } from "kysely-codegen";
import { StatementReview } from "./schemas";
import { FiMeh, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import type { Metadata } from "next";

export const DEFAULT_CORE_QUESTION =
  "What do you think of the following statements?";

export const CHOICE_COPY: Record<ChoiceEnum, string> = {
  agree: "Agree",
  disagree: "Disagree",
  skip: "I don't know",
};

export const SORT_EXPLANATIONS: Record<keyof StatementReview, React.ReactNode> =
  {
    consensus: `Statements with the highest number of 👍 or the highest number of 👎 appear at the top (if everyone thinks 👎, that's consensus too)`,
    conflict: `Statements with the most disagreement (similar number of both 👍 and 👎) appear at the top.`,
    agree: `Statements with the most 👍 votes appear at the top.`,
    disagree: `Statements with the most 👎 votes appear at the top.`,
    confusion: `Statements with the most "${CHOICE_COPY.skip}" votes appear at the top.`,
    recent: `Statements that were added most recently appear at the top.`,
  };

export const CHOICE_ICON: Record<ChoiceEnum, typeof FiThumbsUp> = {
  agree: FiThumbsUp,
  disagree: FiThumbsDown,
  skip: FiMeh,
};

export const SEO = {
  title: "Viewpoints: Effortless Polls & Consensus Building",
  description:
    "Create and share polls with Viewpoints. Use our intuitive platform to collect opinions, build consensus, and analyze results in real-time. Try it now for free.",
};

const canonical = "https://viewpoints.xyz";

export const metadata: Metadata = {
  title: "Viewpoints: Effortless Polls & Consensus Building",
  description:
    "Create and share polls with Viewpoints. Use our intuitive platform to collect opinions, build consensus, and analyze results in real-time. Try it now for free.",
  icons: "/favicon.ico",
  openGraph: {
    type: "website",
    siteName: "Viewpoints",
    title: "Viewpoints: Effortless Polls & Consensus Building",
    url: canonical,
    description:
      "Create polls, gather opinions, and build consensus with Viewpoints. Our intuitive platform helps you understand what people really think.",
    images: `${canonical}/open-graph.png`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ViewpointsXYZ",
    title: "Viewpoints: Effortless Polls & Consensus Building",
    description:
      "Create polls, collect opinions, and analyze consensus in real-time. Make better decisions with data-driven insights.",
    images: `${canonical}/open-graph.png`,
  },
};
