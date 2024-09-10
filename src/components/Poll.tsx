"use client";

import type { getPoll } from "@/lib/getPoll";
import { forwardRef, useOptimistic } from "react";
import { FiBarChart, FiFlag, FiPlus } from "react-icons/fi";
import { cn } from "@/ui/cn";
import { createResponse } from "@/lib/actions";
import { usePendingAction } from "@/lib/usePendingAction";
import { Button } from "@/ui/button";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import FlagStatementDialog from "./FlagStatementDialog";
import { Progress } from "@/ui/progress";
import { ChoiceEnum } from "kysely-codegen";
import { VARIANT_ICON } from "@/lib/copy";
import { usePathname } from "next/navigation";

type GetPoll = Awaited<ReturnType<typeof getPoll>>;

let rotate = 10;
const rotateRight = () => (rotate = 10);
const rotateLeft = () => (rotate = -10);
const noRotate = () => (rotate = 0);

export function Poll({
  statements: serverStatements,
  responses,
  options,
  poll,
  count,
}: GetPoll) {
  const [statements, next] = useOptimistic<GetPoll["statements"], void>(
    serverStatements,
    (state) => {
      return state.slice(1);
    },
  );
  const [isPending, respond] = usePendingAction(createResponse, () => {}, next);

  const statement = statements[0];

  // We show agree/disagree/skip options when the statement is not a demographic question
  const showAgreeDisagree = statement?.question_type === "default";

  const statementOptions = options.filter(
    (o) => o.statement_id === statement?.id,
  );

  return (
    <div className="grid gap-2">
      <Progress
        value={(100 * (count - statements.length)) / count}
        className="h-1 text-neutral-300 dark:text-neutral-700"
      />
      <AnimatePresence mode="popLayout" initial={false}>
        {statements.length ? (
          <PollStatement key={statement.id} next={next} {...statement}>
            {showAgreeDisagree ? (
              <>
                <StatementButton
                  variant="disagree"
                  onClick={() => {
                    respond({
                      statementId: statement.id,
                      choice: "disagree",
                      pollId: poll.id,
                    });
                  }}
                  onMouseEnter={rotateLeft}
                >
                  Disagree
                </StatementButton>
                <StatementButton
                  variant="skip"
                  onClick={() => {
                    respond({
                      statementId: statement.id,
                      choice: "skip",
                      pollId: poll.id,
                    });
                  }}
                  onMouseEnter={noRotate}
                >
                  Skip
                </StatementButton>
                <StatementButton
                  variant="agree"
                  onClick={() => {
                    respond({
                      statementId: statement.id,
                      choice: "agree",
                      pollId: poll.id,
                    });
                  }}
                  onMouseEnter={rotateRight}
                >
                  Agree
                </StatementButton>
              </>
            ) : (
              <div className="grid md:grid-cols-2 gap-1 md:gap-4">
                {statementOptions.map((option) => (
                  <OptionButton
                    key={option.id}
                    onClick={() => {
                      respond({
                        statementId: statement.id,
                        optionId: option.id,
                        pollId: poll.id,
                      });
                    }}
                  >
                    {option.option}
                  </OptionButton>
                ))}
              </div>
            )}
          </PollStatement>
        ) : (
          <GoToResults slug={poll.slug!} />
        )}
      </AnimatePresence>
    </div>
  );
}

type StatementButtonProps = {
  variant: ChoiceEnum;
} & React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>;

/**
 * A button that allows the user to respond to a statement.
 */
function StatementButton({
  className,
  children,
  variant,
  ...props
}: StatementButtonProps) {
  const Icon = VARIANT_ICON[variant];
  return (
    <button
      className={cn(
        "text-2xl flex items-center rounded-full py-4 sm:py-2 px-4 transition-colors",
        {
          "bg-red-500 text-white hover:bg-red-600": variant === "disagree",
          "bg-yellow-500 text-white hover:bg-yellow-600": variant === "skip",
          "bg-green-500 text-white hover:bg-green-600": variant === "agree",
        },
        className,
      )}
      {...props}
    >
      <Icon className="sm:mr-2" />
      <span className="hidden sm:block text-lg">{children}</span>
    </button>
  );
}

/**
 * A button that allows the user to respond to an option.
 */
function OptionButton({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="text-lg font-medium flex items-center justify-center rounded-full p-2 px-4 transition-colors bg-blue-500 text-white hover:bg-blue-600 w-full"
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * A statement that can be responded to.
 */
export const PollStatement = forwardRef<
  HTMLDivElement,
  Awaited<ReturnType<typeof getPoll>>["statements"][number] & {
    children: React.ReactNode;
    next: () => void;
  }
>(function PollStatement(
  {
    text,
    created_at,
    author_name,
    author_avatar_url,
    children,
    id,
    next,
    question_type,
  },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      className="border rounded-xl bg-white shadow-sm grid overflow-hidden dark:bg-neutral-950 min-h-[275px] grid grid-rows-[minmax(0,1fr)_auto]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2, rotate }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid gap-8 p-8 content-center">
        <p className="text-2xl font-medium text-center tracking-[-0.02em] statement-text">
          {text}
        </p>
        <div className="flex space-x-4 justify-center">{children}</div>
      </div>
      {question_type !== "demographic" ? (
        <div className="p-2 px-4 flex items-center justify-end border-t">
          <FlagStatementDialog statementId={id} next={next}>
            <button className="text-sm text-neutral-400 hover:text-neutral-500 flex items-center gap-2">
              <FiFlag />
              Flag Statement
            </button>
          </FlagStatementDialog>
        </div>
      ) : null}
      {/* <div className="flex items-center justify-end">
          {author_avatar_url ? (
            <Image
              src={author_avatar_url}
              alt={author_name ?? ""}
              className="rounded-full mr-2"
              width={32}
              height={32}
            />
          ) : null}
          <div className="grid text-xs">
            <span className="font-medium text-neutral-700">{author_name}</span>
            <span className="text-neutral-400 tabular-nums">
              {new Date(created_at).toLocaleDateString()}
            </span>
          </div>
        </div> */}
    </motion.div>
  );
});

export const GoToResults = forwardRef<HTMLDivElement, { slug: string }>(
  function GoToResults({ slug }, ref) {
    const path = usePathname();
    const isEmbed = path.startsWith("/embed");

    return (
      <motion.div
        ref={ref}
        className="grid gap-4 justify-items-center items-center justify-center content-center p-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 min-h-[275px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-extrabold text-center flex items-center gap-2">
          You&apos;ve responded to all statements!
        </h2>
        <div className="flex gap-1 items-center">
          <Button variant="default">
            <FiPlus className="mr-2" />
            Add Statement
          </Button>
          <Button asChild variant="brand">
            <Link
              href={`/polls/${slug}/results`}
              target={isEmbed ? "_blank" : undefined}
            >
              <FiBarChart className="mr-2" />
              View Results
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  },
);
