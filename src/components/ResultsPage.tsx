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
import { FiList, FiMessageCircle, FiUsers } from "react-icons/fi";
import { TabsTriggerProps } from "@radix-ui/react-tabs";

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
      return res.json() as Promise<Awaited<ReturnType<typeof getPollResults>>>;
    },
    initialData,
    refetchInterval: 10_000,
  });

  const { visitorMostConflictStatementId, visitorMostConsensusStatementId } =
    data;

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

  return (
    <div className="grid gap-4">
      <p className="text-center text-sm sm:text-base p-4 rounded-full text-neutral-600 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100">
        <FiUsers className="inline-block -mt-1 mr-2" size={20} />
        <strong>
          {data.uniqueRespondentsCount}{" "}
          {data.uniqueRespondentsCount === 1 ? "person has" : "people have"}
        </strong>{" "}
        given{" "}
        <strong>
          {data.responsesCount}{" "}
          {data.responsesCount === 1 ? "response" : "responses"}
        </strong>
        <FiMessageCircle className="inline-block -mt-1 mx-1" size={20} />
      </p>
      <div className="grid gap-4 mt-6">
        <div className="grid gap-2">
          <Tabs value={sort} className="w-full">
            <TabsList className="bg-transparent dark:bg-transparent flex gap-2 justify-center">
              <CustomTabTrigger value="consensus" asChild>
                <Link href={`/polls/${slug}/results?sort=consensus`}>
                  Most Consensus
                </Link>
              </CustomTabTrigger>
              <CustomTabTrigger value="conflict" asChild>
                <Link href={`/polls/${slug}/results?sort=conflict`}>
                  Most Conflict
                </Link>
              </CustomTabTrigger>
              <CustomTabTrigger value="confusion" asChild>
                <Link href={`/polls/${slug}/results?sort=confusion`}>
                  Most Confusion
                </Link>
              </CustomTabTrigger>
            </TabsList>
          </Tabs>
          <div className="bg-neutral-800 text-white p-4 rounded-lg flex items-center gap-3 max-w-lg mx-auto">
            <FiList className="flex-shrink-0 opacity-50" size={20} />
            <p className="text-sm font-medium text-pretty text-neutral-200">
              {SORT_EXPLANATIONS[sort]}
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          {data.statements
            .filter((s) => s.question_type === "default")
            .map((statement) => (
              <div
                key={statement.id}
                className="bg-white p-4 rounded-lg shadow dark:bg-neutral-800"
                data-id={statement.id}
              >
                <p className="font-medium mb-2">{statement.text}</p>
                <div className="flex gap-2">
                  <Chip variant="agree">
                    {Math.round(
                      data.choicePercentage[statement.id].agree * 100,
                    )}
                    %
                  </Chip>
                  <Chip variant="disagree">
                    {Math.round(
                      data.choicePercentage[statement.id].disagree * 100,
                    )}
                    %
                  </Chip>
                  {data.choicePercentage[statement.id].skip > 0 && (
                    <Chip variant="skip">
                      {Math.round(
                        data.choicePercentage[statement.id].skip * 100,
                      )}
                      %
                    </Chip>
                  )}
                </div>
              </div>
            ))}
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
      className="p-2 text-center text-base font-medium border-b-2 border-transparent transition-colors duration-200 hover:text-neutral-800 dark:hover:text-neutral-200 data-[state=active]:border-neutral-800 dark:data-[state=active]:border-neutral-200 data-[state=active]:text-neutral-800 dark:data-[state=active]:text-neutral-200 bg-transparent data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent"
      {...props}
    >
      {props.children}
    </TabsTrigger>
  );
}
