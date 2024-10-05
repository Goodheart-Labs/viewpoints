"use client";

import type { getPoll } from "@/lib/getPoll";
import { forwardRef, useEffect, useOptimistic, useState } from "react";
import { FiBarChart, FiFlag } from "react-icons/fi";
import { cn } from "@/ui/cn";
import { createResponse } from "@/lib/actions";
import { usePendingAction } from "@/lib/usePendingAction";
import { Button } from "@/ui/button";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import FlagStatementDialog from "./FlagStatementDialog";
import { Progress } from "@/ui/progress";
import { ChoiceEnum } from "kysely-codegen";
import { CHOICE_COPY, CHOICE_ICON } from "@/lib/copy";
import { usePathname, useRouter } from "next/navigation";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

type GetPoll = Awaited<ReturnType<typeof getPoll>>;

let rotate = 10;
const rotateRight = () => (rotate = 10);
const rotateLeft = () => (rotate = -10);
const noRotate = () => (rotate = 0);

export function Poll({
  statements: serverStatements,
  options,
  poll,
  count,
}: GetPoll) {
  const [dragThreshold, setDragThreshold] = useState(200);
  useEffect(() => {
    setDragThreshold(window.innerWidth / 6);
  }, []);

  const [statements, next] = useOptimistic<GetPoll["statements"], void>(
    serverStatements,
    (state) => {
      return state.slice(1);
    },
  );
  const [, respond] = usePendingAction(createResponse, {
    before: next,
  });

  const statement = statements[0];

  // We show agree/disagree/skip options when the statement is not a demographic question
  const showAgreeDisagree = statement?.question_type === "default";

  const statementOptions = options.filter(
    (o) => o.statement_id === statement?.id,
  );

  const [dragSelection, setDragSelection] = useState<ChoiceEnum | null>(null);

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({
      active,
      movement: [mx, my],
      memo = [0, 0],
      swipe: [swipeX, swipeY],
    }) => {
      if (!active) {
        memo = [0, 0]; // Reset memo when drag ends

        let choice: ChoiceEnum | null = null;
        if (dragSelection) {
          choice = dragSelection;
        } else if (swipeX !== 0) {
          choice = swipeX > 0 ? "agree" : "disagree"; // Fixed: swipeX > 0 for agree, < 0 for disagree
        } else if (swipeY !== 0) {
          choice = swipeY < 0 ? "skip" : null;
        }

        if (choice) {
          respond({
            statementId: statement.id,
            choice: choice,
            pollId: poll.id,
          });
        }

        setDragSelection(null); // Reset drag selection when drag ends
        api.start({ x: 0, y: 0 }); // Reset position
      } else {
        const distances: { direction: ChoiceEnum; value: number }[] = [
          { direction: "agree", value: mx },
          { direction: "disagree", value: -mx },
          { direction: "skip", value: -my },
        ];

        console.log(distances);

        const validDistances = distances.filter(
          ({ value }) => value >= dragThreshold,
        );
        const maxDistance = validDistances.sort(
          (a, b) => Math.abs(b.value) - Math.abs(a.value),
        )[0];

        setDragSelection(maxDistance ? maxDistance.direction : null);

        // Apply rubberband effect
        const rubberband = (value: number, threshold: number) => {
          const delta = Math.abs(value) - threshold;
          const sign = Math.sign(value);
          if (delta > 0) {
            return sign * (threshold + delta * 0.15); // 0.15 is the rubberband factor
          }
          return value;
        };

        api.start({
          x: rubberband(mx, dragThreshold),
          y: rubberband(my, dragThreshold),
          immediate: active,
        });
      }

      return memo;
    },
    {
      from: () => [x.get(), y.get()],
    },
  );

  // On this page, we prevent overflow on the body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="grid gap-2 group" data-drag-selection={dragSelection}>
      <Progress
        value={(100 * (count - statements.length)) / count}
        className="h-1 text-neutral-300 dark:text-neutral-700"
      />
      <AnimatePresence mode="popLayout" initial={false}>
        {statements.length ? (
          <animated.div
            style={{
              x,
              y,
              // Reduce the maximum rotation angle
              rotate: x.to(
                [-dragThreshold * 2, 0, dragThreshold * 2],
                [-5, 0, 5], // Changed from [-10, 0, 10] to [-5, 0, 5]
              ),
            }}
            className={cn("cursor-grab touch-none", {
              "cursor-grabbing": x.get() !== 0 || y.get() !== 0,
            })}
            key={statement.id}
            {...bind()}
          >
            <PollStatement next={next} {...statement}>
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
                    {CHOICE_COPY.disagree}
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
                    {CHOICE_COPY.skip}
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
                    {CHOICE_COPY.agree}
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
          </animated.div>
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
  const Icon = CHOICE_ICON[variant];
  return (
    <button
      className={cn(
        "text-2xl flex items-center rounded-full py-4 sm:py-2 px-4 transition-all select-none",
        {
          "bg-red-200 text-red-800 hover:bg-red-300 dark:bg-red-700 dark:text-red-50 dark:hover:bg-red-600 group-data-[drag-selection=disagree]:scale-110 group-data-[drag-selection=skip]:scale-95 group-data-[drag-selection=agree]:scale-95 group-data-[drag-selection=skip]:opacity-50 group-data-[drag-selection=agree]:opacity-50":
            variant === "disagree",
          "bg-yellow-200 text-yellow-800 hover:bg-yellow-300 dark:bg-yellow-700 dark:text-yellow-50 dark:hover:bg-yellow-600 group-data-[drag-selection=skip]:scale-110 group-data-[drag-selection=disagree]:scale-95 group-data-[drag-selection=agree]:scale-95 group-data-[drag-selection=agree]:opacity-50 group-data-[drag-selection=disagree]:opacity-50":
            variant === "skip",
          "bg-green-200 text-green-800 hover:bg-green-300 dark:bg-green-700 dark:text-green-50 dark:hover:bg-green-600 group-data-[drag-selection=agree]:scale-110 group-data-[drag-selection=skip]:scale-95 group-data-[drag-selection=disagree]:scale-95 group-data-[drag-selection=skip]:opacity-50 group-data-[drag-selection=disagree]:opacity-50":
            variant === "agree",
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
>(function PollStatement({ text, children, id, next, question_type }, ref) {
  const isEmbed = useIsEmbed();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "border rounded-xl bg-white shadow-sm grid overflow-hidden dark:bg-neutral-950 grid grid-rows-[minmax(0,1fr)_auto]",
        {
          "min-h-[275px]": !isEmbed,
        },
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2, rotate }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={cn("grid gap-8 p-8 content-center", {
          "gap-4": isEmbed,
        })}
      >
        <p
          className={cn(
            "font-medium text-center tracking-[-0.02em] statement-text select-none",
            {
              "text-2xl": !isEmbed,
              "text-lg": isEmbed,
            },
          )}
        >
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
    </motion.div>
  );
});

export const GoToResults = forwardRef<HTMLDivElement, { slug: string }>(
  function GoToResults({ slug }, ref) {
    const isEmbed = useIsEmbed();
    const { push } = useRouter();

    useEffect(() => {
      const timer = setTimeout(() => {
        if (!isEmbed) {
          push(`/polls/${slug}/results?live=true`);
        }
      }, 1750);

      return () => clearTimeout(timer);
    }, [slug, isEmbed, push]);

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
          <Button asChild variant="brand" className="results-button">
            <Link
              href={`/polls/${slug}/results?live=true`}
              target={isEmbed ? "_blank" : undefined}
            >
              <FiBarChart className="mr-2" />
              Go to Results
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  },
);

function useIsEmbed() {
  const path = usePathname();
  return path.startsWith("/embed");
}
