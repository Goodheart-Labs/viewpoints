"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPollResults } from "@/lib/getPollResults";
import { StatementReview } from "@/lib/schemas";
import { useQuery } from "@tanstack/react-query";
import { CHOICE_ICON, SORT_EXPLANATIONS } from "@/lib/copy";
import { cn } from "@/ui/cn";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { ChoiceEnum } from "kysely-codegen";
import Link from "next/link";
import { FiMessageCircle, FiUsers } from "react-icons/fi";
import { TabsTriggerProps } from "@radix-ui/react-tabs";
import { CreatePollCallout } from "./CreatePollCallout";
import { AnimatePresence, motion } from "framer-motion";

type Data = Awaited<ReturnType<typeof getPollResults>>;
type Statement = Data["statements"][number];
type Row = { type: "statement"; statement: Statement } | { type: "cta" };

export function ResultsPage({
  slug,
  sort,
  visitorId,
  initialData,
}: {
  slug: string;
  sort: keyof StatementReview;
  visitorId?: string;
  initialData: Awaited<ReturnType<typeof getPollResults>>;
}) {
  const isCreator = initialData.poll.user_id === visitorId;
  const searchParams = useSearchParams();
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const liveParam = searchParams.get("live");
    setIsLive(liveParam === "true");
  }, [searchParams]);

  const { data } = useQuery({
    queryKey: ["results", slug, sort],
    queryFn: async () => {
      const res = await fetch(`/api/polls/${slug}/results?sort=${sort}`);
      return res.json() as ReturnType<typeof getPollResults>;
    },
    initialData,
    refetchInterval: 10_000,
  });

  const { push } = useRouter();

  useQuery({
    queryKey: ["live", slug],
    queryFn: async () => {
      const res = await fetch(`/api/polls/${slug}/live`);
      const { hasNewStatements } = (await res.json()) as {
        hasNewStatements: boolean;
      };

      if (hasNewStatements) push(`/polls/${slug}`);

      return { hasNewStatements };
    },
    refetchInterval: 10_000,
    enabled: isLive,
  });

  const isSingleRespondent = data.uniqueRespondentsCount === 1;

  // Show CTA in the 6th position or halfway down, whichever is smaller
  const ctaPosition = Math.min(Math.floor(data.statements.length / 2), 6);
  const [ctaShowing, setCtaShowing] = useState(false);
  const closeCta = () => setCtaShowing(false);

  const rows: Row[] = data.statements.reduce((acc, statement, index) => {
    if (statement.question_type === "default") {
      acc.push({ type: "statement", statement });
    }
    if (index === ctaPosition && ctaShowing) acc.push({ type: "cta" });
    return acc;
  }, [] as Row[]);

  return (
    <div className="grid gap-12 -mt-2">
      <p className="flex items-center gap-2 text-sm rounded-lg text-neutral-600 dark:text-neutral-300">
        <FiUsers size={16} />
        <span>
          <strong>
            {data.uniqueRespondentsCount}{" "}
            {isSingleRespondent ? "person" : "people"}
          </strong>{" "}
          {isSingleRespondent ? "has" : "have"} given{" "}
          <strong>
            {data.responsesCount}{" "}
            {data.responsesCount === 1 ? "response" : "responses"}
          </strong>
        </span>
        <FiMessageCircle size={16} />
      </p>
      <div className="grid gap-4">
        <div className="grid">
          <Tabs value={sort} className="w-full">
            <TabsList className="bg-transparent dark:bg-transparent flex flex-wrap gap-2 justify-center pt-0 pb-2 sm:py-0">
              <CustomTabTrigger value="consensus" asChild>
                <Link
                  href={`/polls/${slug}/results?sort=consensus${
                    isLive ? "&live=true" : ""
                  }`}
                >
                  Consensus
                </Link>
              </CustomTabTrigger>
              <CustomTabTrigger value="conflict" asChild>
                <Link
                  href={`/polls/${slug}/results?sort=conflict${
                    isLive ? "&live=true" : ""
                  }`}
                >
                  Conflict
                </Link>
              </CustomTabTrigger>
              <CustomTabTrigger value="agree" asChild>
                <Link
                  href={`/polls/${slug}/results?sort=agree${
                    isLive ? "&live=true" : ""
                  }`}
                >
                  Agree
                </Link>
              </CustomTabTrigger>
              <CustomTabTrigger value="disagree" asChild>
                <Link
                  href={`/polls/${slug}/results?sort=disagree${
                    isLive ? "&live=true" : ""
                  }`}
                >
                  Disagree
                </Link>
              </CustomTabTrigger>
              <CustomTabTrigger value="confusion" asChild>
                <Link
                  href={`/polls/${slug}/results?sort=confusion${
                    isLive ? "&live=true" : ""
                  }`}
                >
                  Confusion
                </Link>
              </CustomTabTrigger>
              <CustomTabTrigger value="recent" asChild>
                <Link
                  href={`/polls/${slug}/results?sort=recent${
                    isLive ? "&live=true" : ""
                  }`}
                >
                  Recent
                </Link>
              </CustomTabTrigger>
            </TabsList>
          </Tabs>
          <div className="text-neutral-800 bg-neutral-100 dark:bg-neutral-800 dark:text-white p-4 rounded-lg flex items-center w-full h-[80px]">
            <p className="w-full text-sm text-neutral-700 dark:text-neutral-200 text-center text-balance leading-relaxed">
              {SORT_EXPLANATIONS[sort]}
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          <AnimatePresence key="only-once">
            {rows.map((row, index) => {
              if (row.type === "statement") {
                const hasAgree =
                  data.choicePercentage[row.statement.id].agree > 0;
                const hasDisagree =
                  data.choicePercentage[row.statement.id].disagree > 0;
                const hasSkip =
                  data.choicePercentage[row.statement.id].skip > 0;
                const consensus = data.review[row.statement.id].consensus;
                const conflict = data.review[row.statement.id].conflict;
                return (
                  <motion.div
                    layout
                    key={row.statement.id}
                    data-id={row.statement.id}
                  >
                    <p className="mb-2">{row.statement.text}</p>
                    <div className="flex items-stretch">
                      <div className="font-semibold text-[11px] tabular-nums w-[28px] text-center bg-green-500/70 rounded-l-md">
                        {(consensus * 100).toFixed(0)}
                      </div>

                      <div className="font-semibold text-[11px] tabular-nums w-[28px] text-center mr-0.5 bg-red-500/70 rounded-r-md">
                        {(conflict * 100).toFixed(0)}
                      </div>

                      <div className="h-4 rounded-md flex overflow-hidden gap-0.5 flex-1">
                        {hasAgree ? (
                          <div
                            className="h-full bg-green-500/70"
                            style={{
                              width: `${data.choicePercentage[row.statement.id].agree * 100}%`,
                            }}
                          />
                        ) : null}
                        {hasDisagree ? (
                          <div
                            className="h-full bg-red-500/70"
                            style={{
                              width: `${data.choicePercentage[row.statement.id].disagree * 100}%`,
                            }}
                          />
                        ) : null}
                        {hasSkip ? (
                          <div
                            className="h-full bg-yellow-500/70"
                            style={{
                              width: `${data.choicePercentage[row.statement.id].skip * 100}%`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                    {/* <div className="flex gap-2">
                      <Chip variant="agree">
                        {Math.round(
                          data.choicePercentage[row.statement.id].agree * 100,
                        )}
                        %
                      </Chip>
                      <Chip variant="disagree">
                        {Math.round(
                          data.choicePercentage[row.statement.id].disagree *
                            100,
                        )}
                        %
                      </Chip>
                      {data.choicePercentage[row.statement.id].skip > 0 && (
                        <Chip variant="skip">
                          {Math.round(
                            data.choicePercentage[row.statement.id].skip * 100,
                          )}
                          %
                        </Chip>
                      )}
                    </div> */}
                  </motion.div>
                );
              } else {
                return (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <CreatePollCallout closeCta={closeCta} />
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Chip({
  variant,
  children,
}: {
  variant: ChoiceEnum;
  children: React.ReactNode;
}) {
  const Icon = CHOICE_ICON[variant];
  return (
    <div
      className={cn("px-2 py-1 rounded-md text-sm flex items-center", {
        "bg-green-500/50": variant === "agree",
        "bg-red-500/50": variant === "disagree",
        "bg-yellow-500/50": variant === "skip",
      })}
    >
      <Icon className="mr-1" size={14} />
      {children}
    </div>
  );
}

function CustomTabTrigger(props: TabsTriggerProps) {
  return (
    <TabsTrigger
      className={cn(
        "p-2 text-center text-base text-sm transition-colors duration-200",
        // Mobile styles (default)
        "bg-neutral-100 dark:bg-neutral-700 rounded-md",
        "data-[state=active]:bg-neutral-200 dark:data-[state=active]:bg-neutral-600",
        // Desktop styles
        "sm:bg-transparent sm:dark:bg-transparent",
        "sm:border-b-2 sm:border-transparent sm:rounded-none",
        "sm:data-[state=active]:bg-transparent sm:dark:data-[state=active]:bg-transparent",
        "sm:data-[state=active]:border-neutral-800 sm:dark:data-[state=active]:border-neutral-200",
        // Hover states
        "hover:text-neutral-800 dark:hover:text-neutral-200",
        "!shadow-none",
      )}
      {...props}
    >
      {props.children}
    </TabsTrigger>
  );
}
