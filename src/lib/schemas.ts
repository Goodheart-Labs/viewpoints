import { z } from "zod";
import { checkSlugExists } from "./actions";

export const getStatementsArrayFromString = (value: string) =>
  value
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s !== "");

export const createPollSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format")
    .refine(async (value) => !(await checkSlugExists(value)), {
      message: "Slug already exists",
    }),
  question: z.string().default(""),
  statements: z.string().refine(
    (value) => getStatementsArrayFromString(value).length >= 5,
    (value) => ({
      message: `At least ${
        5 - getStatementsArrayFromString(value).length
      } more statements required. (Use a new line for each statement)`,
    })
  ),
  with_demographic_questions: z.boolean().default(false),
  new_statements_visible_by_default: z.boolean().default(true),
  poll_type: z.enum(["public", "private", "hidden"]).default("public"),
});

export type CreatePoll = z.infer<typeof createPollSchema>;

export type StatementChoice = {
  agree: number;
  skip: number;
  disagree: number;
};

export type StatementReview = {
  consensus: number;
  conflict: number;
  confusion: number;
};
