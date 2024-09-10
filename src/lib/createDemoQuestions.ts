import { Insertable, Transaction } from "kysely";
import { DB } from "kysely-codegen";

const questions: {
  question: string;
  responses: string[];
}[] = [
  {
    question: "How old are you?",
    responses: ["<18", "18 - 25", "26 - 39", "40+", "Rather not say"],
  },
  {
    question: "Education",
    responses: [
      "To ~18",
      "University degree",
      "Postgraduate degree",
      "Rather not say",
    ],
  },
  {
    question: "What is your gender?",
    responses: ["Male", "Female", "Other", "Rather not say"],
  },
];

export async function createDemoQuestions(
  tx: Transaction<DB>,
  pollInfo: Pick<
    Insertable<DB["statements"]>,
    "poll_id" | "user_id" | "session_id"
  >,
) {
  for (const { question, responses } of questions) {
    // eslint-disable-next-line no-await-in-loop
    const currentQuestion = await tx
      .insertInto("statements")
      .values({
        ...pollInfo,
        question_type: "demographic",
        answer_type: "custom_options",
        text: question,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // eslint-disable-next-line no-await-in-loop
    await tx
      .insertInto("statement_options")
      .values(
        responses.map((option) => ({
          statement_id: currentQuestion.id,
          option,
        })),
      )
      .execute();
  }
}
