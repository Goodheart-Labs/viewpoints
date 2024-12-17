"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPollResults, PollResults } from "@/lib/getPollResults";
import { StatementReview } from "@/lib/schemas";
import { useQuery } from "@tanstack/react-query";
import { SORT_EXPLANATIONS } from "@/lib/copy";
import { cn } from "@/ui/cn";
import { TabsTrigger } from "@/ui/tabs";
import { FiMessageCircle, FiUsers } from "react-icons/fi";
import { TabsTriggerProps } from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

type Data = Awaited<ReturnType<typeof getPollResults>>;
type Statement = Data["statements"][number];
type Row = { type: "statement"; statement: Statement } | { type: "cta" };

export function ResultsPage({
  slug,
  sort,
  segment,
  visitorId,
  initialData,
}: {
  slug: string;
  sort: keyof StatementReview;
  segment?: string;
  visitorId?: string;
  initialData: Awaited<ReturnType<typeof getPollResults>>;
}) {
  const searchParams = useSearchParams();
  const [isLive, setIsLive] = useState(false);

  const { push } = useRouter();

  const segments: { text: string; id: number }[] =
    initialData.allStatements.map((statement) => ({
      text: statement.text,
      id: statement.id,
    }));

  useEffect(() => {
    const liveParam = searchParams.get("live");
    setIsLive(liveParam === "true");
  }, [searchParams]);

  const { data } = useQuery({
    queryKey: ["results", slug, sort, segment],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("sort", sort);
      if (segment) params.set("segment", segment);

      const res = await fetch(
        `/api/polls/${slug}/results?${params.toString()}`,
      );
      return res.json() as ReturnType<typeof getPollResults>;
    },
    initialData,
    refetchInterval: 10_000,
  });

  const router = useRouter();

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

  const getUrl = useCallback(
    ({
      _sort = sort,
      _isLive = isLive,
      _segment = segment,
    }: {
      _sort?: keyof StatementReview;
      _isLive?: boolean;
      _segment?: string;
    }) => {
      const params = new URLSearchParams();
      if (_sort) params.set("sort", _sort);
      if (_segment) params.set("segment", _segment);
      if (_isLive) params.set("live", "true");
      return `/polls/${slug}/results?${params.toString()}`;
    },
    [sort, segment, isLive, slug],
  );

  // Ordered statement ids
  const statementIds = data.statements.map((statement) => statement.id);

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
        <div className="grid md:grid-cols-2 gap-2">
          <SelectWrapper label="Sort">
            <Select
              value={sort}
              onValueChange={(value) => {
                router.push(getUrl({ _sort: value as keyof StatementReview }));
              }}
            >
              <SelectTrigger className="h-auto text-left border-none shadow-none bg-neutral-100 dark:bg-neutral-800 min-h-[77px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SORT_EXPLANATIONS).map(
                  ([sortKey, explanation]) => (
                    <SelectItem key={sortKey} value={sortKey}>
                      <div className="grid gap-0.5">
                        <div className="font-medium">
                          {sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400 leading-normal max-w-[500px] text-pretty text-[13px]">
                          {explanation}
                        </div>
                      </div>
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </SelectWrapper>
          <SelectWrapper label="Segment">
            <Select
              value={segment}
              onValueChange={(value) => {
                router.push(getUrl({ _segment: value }));
              }}
            >
              <SelectTrigger
                className={cn(
                  "h-auto text-left border-none shadow-none min-h-[77px]",
                  {
                    "bg-neutral-100 dark:bg-neutral-800": segment !== "all",
                  },
                )}
              >
                <SelectValue placeholder="Select a segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">None</SelectItem>
                {segments.map((segment) => (
                  <SelectItem key={segment.id} value={segment.id.toString()}>
                    {segment.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SelectWrapper>
        </div>
        {segment === "all" ? (
          <Column
            statementIds={statementIds}
            statements={data.statements}
            choicePercentage={data.choicePercentage}
            review={data.review}
          />
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${data.segments.length}, minmax(0, 1fr))`,
                  minWidth: data.segments.length * 300,
                }}
              >
                {data.segments.map((segment) => (
                  <div key={segment.text} className="grid gap-2">
                    <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                      {segment.text.charAt(0).toUpperCase() +
                        segment.text.slice(1)}
                    </span>
                    <Column
                      statementIds={statementIds}
                      statements={data.statements}
                      choicePercentage={segment.measures.choicePercentage}
                      review={segment.measures.review}
                      animationKey={segment.text}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Column({
  statementIds,
  statements,
  choicePercentage,
  review,
  animationKey = "only-once",
}: {
  statementIds: number[];
  statements: PollResults["statements"];
  choicePercentage: PollResults["choicePercentage"];
  review: PollResults["review"];
  animationKey?: string;
}) {
  const rows: Row[] = statementIds.reduce((acc, statementId, index) => {
    const statement = statements.find(
      (statement) => statement.id === statementId,
    );
    if (statement?.question_type === "default") {
      acc.push({ type: "statement", statement });
    }
    return acc;
  }, [] as Row[]);

  return (
    <div className="grid gap-4">
      <AnimatePresence key={animationKey} mode="sync">
        {rows.map((row, index) => {
          if (row.type === "statement") {
            const hasAgree = choicePercentage[row.statement.id].agree > 0;
            const hasDisagree = choicePercentage[row.statement.id].disagree > 0;
            const hasSkip = choicePercentage[row.statement.id].skip > 0;
            const consensus = review[row.statement.id].consensus;
            const conflict = review[row.statement.id].conflict;
            return (
              <motion.div
                key={row.statement.id}
                layout="position"
                transition={{ duration: 0.3 }}
                data-id={row.statement.id}
              >
                <p className="mb-2">{row.statement.text}</p>
                <div className="flex items-stretch">
                  <div className="flex rounded-md bg-neutral-100 dark:bg-neutral-800 font-semibold text-[11px] tabular-nums">
                    <span className="text-green-600 w-[28px] text-center">
                      {(consensus * 100).toFixed(0)}
                    </span>
                    <span className="text-red-600 w-[28px] text-center">
                      {(conflict * 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="h-4 rounded-md flex overflow-hidden flex-1 bg-neutral-100 dark:bg-neutral-800">
                    {hasAgree ? (
                      <div
                        className="h-full bg-green-500/70"
                        style={{
                          width: `${choicePercentage[row.statement.id].agree * 100}%`,
                        }}
                      />
                    ) : null}
                    {hasDisagree ? (
                      <div
                        className="h-full bg-red-500/70"
                        style={{
                          width: `${choicePercentage[row.statement.id].disagree * 100}%`,
                        }}
                      />
                    ) : null}
                    {hasSkip ? (
                      <div
                        className="h-full bg-yellow-500/70"
                        style={{
                          width: `${choicePercentage[row.statement.id].skip * 100}%`,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>
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

function SelectWrapper({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-0.5 grid-rows-[auto_minmax(0,1fr)]">
      <label className="text-sm uppercase text-neutral-400 dark:text-neutral-600">
        {label}
      </label>
      {children}
    </div>
  );
}
