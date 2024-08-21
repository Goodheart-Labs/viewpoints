import { StatementReview } from "./schemas";

export const DEFAULT_CORE_QUESTION =
  "What do you think of the following statements?";

export const SORT_EXPLANATIONS: Record<keyof StatementReview, React.ReactNode> =
  {
    consensus: `Statements with the highest number of 👍 or the highest number of 👎 appear at the top (if everyone thinks 👎, that's consensus too)`,
    conflict: `Statements with the most disagreement (similar number of both 👍 and 👎) appear at the top.`,
    confusion: `Statements with the most 🤷 votes appear at the top.`,
  };
