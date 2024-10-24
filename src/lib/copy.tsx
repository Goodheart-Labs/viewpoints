import { ChoiceEnum } from "kysely-codegen";
import { StatementReview } from "./schemas";
import { FiMeh, FiThumbsDown, FiThumbsUp } from "react-icons/fi";

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
    confusion: `Statements with the most "${CHOICE_COPY.skip}" votes appear at the top.`,
    agree: `Statements with the most 👍 votes appear at the top.`,
    disagree: `Statements with the most 👎 votes appear at the top.`,
    recent: `Statements that were added most recently appear at the top.`,
  };

export const CHOICE_ICON: Record<ChoiceEnum, typeof FiThumbsUp> = {
  agree: FiThumbsUp,
  disagree: FiThumbsDown,
  skip: FiMeh,
};

export const SEO = {
  title: "Viewpoints: Effortless Poll Creation & Consensus Building",
  description:
    "Create and share polls with Viewpoints.xyz. Use our intuitive platform to collect opinions, build consensus, and analyze results in real-time. Start free, upgrade for pro features.",
};
