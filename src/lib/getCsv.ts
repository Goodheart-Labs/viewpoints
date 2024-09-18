"use server";

import { db } from "@/db/client";
import { stringify } from "csv-stringify/sync";
type ResponseCSVRow = {
  // Statement Information
  statement_id: number;
  statement_text: string;

  // Response Information
  response_id: number;
  created_at: string;

  // Option Information
  option_id: string;
  option_text: string;

  // User Info
  session_id: string;
  user_id: string;
};

/**
 * Create the rows of all responses to all questions
 */
export async function getCSV({ pollId }: { pollId: number }) {
  const [statements, options, responses] = await Promise.all([
    db
      .selectFrom("statements")
      .selectAll()
      .where("poll_id", "=", pollId)
      .execute(),

    db
      .selectFrom("statement_options")
      .selectAll()
      .where(
        "statement_id",
        "in",
        db.selectFrom("statements").select("id").where("poll_id", "=", pollId),
      )
      .execute(),

    db
      .selectFrom("responses")
      .selectAll()
      .where(
        "responses.statementId",
        "in",
        db.selectFrom("statements").select("id").where("poll_id", "=", pollId),
      )
      .execute(),
  ]);

  const rows: ResponseCSVRow[] = [];

  for (const statement of statements) {
    // Statement Info
    const statement_id = statement.id;
    const statement_text = statement.text;
    const statementOptions = options.filter(
      (option) => option.statement_id === statement_id,
    );

    // get responses to this statement
    const statementResponses = responses.filter(
      (response) => response.statementId === statement_id,
    );

    for (const response of statementResponses) {
      // Response Info
      const { choice, created_at, session_id, user_id, id, option_id } =
        response;

      let option_text = choice?.toString() ?? "";

      // Get response text for demo question
      if (statement.question_type === "demographic" && option_id !== null) {
        option_text = getOptionText(option_id, statementOptions);
      }

      // Change skip to "Don't know" for the csv
      if (option_text === "skip") {
        option_text = "don't know";
      }

      const row: ResponseCSVRow = {
        statement_id,
        statement_text,
        response_id: id,
        option_id: option_id?.toString() ?? "",
        option_text,
        created_at: created_at instanceof Date ? created_at.toISOString() : "",
        session_id,
        user_id: user_id?.toString() ?? "",
      };

      rows.push(row);
    }
  }

  const output = stringify(rows, {
    header: true,
  });

  return output;
}

/**
 * Given an option and the statement options,
 * return the text of the option
 */
function getOptionText(
  optionId: number,
  statementOptions: {
    id: number;
    icon: string | null;
    option: string;
    statement_id: number;
  }[],
) {
  for (const option of statementOptions) {
    if (option.id === optionId) {
      return option.option ?? "";
    }
  }

  return "";
}
