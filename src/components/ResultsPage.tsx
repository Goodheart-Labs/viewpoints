"use client";

import { getPollResults } from "@/lib/getPollResults";
import { StatementReview } from "@/lib/schemas";
import { useQuery } from "@tanstack/react-query";
import { SORT_EXPLANATIONS, VARIANT_ICON } from "@/lib/copy";
import { cn } from "@/ui/cn";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { ChoiceEnum } from "kysely-codegen";
import Link from "next/link";
import { FiMessageCircle, FiUsers } from "react-icons/fi";
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
  return (
    <div className="grid gap-4">
      <p className="text-center text-base p-4 rounded-full text-neutral-600 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100">
        <FiUsers className="inline-block -mt-1 mr-2" size={20} />
        <strong>{data.uniqueRespondentsCount} people</strong> have given{" "}
        <strong>{data.responsesCount} responses</strong>
        <FiMessageCircle className="inline-block -mt-1 mx-1" size={20} />
      </p>

      {visitorId &&
      visitorMostConsensusStatementId &&
      visitorMostConflictStatementId ? (
        <Highlights
          visitorMostConflictStatementId={visitorMostConflictStatementId}
          visitorMostConsensusStatementId={visitorMostConsensusStatementId}
          statements={data.statements}
          choicePercentage={data.choicePercentage}
        />
      ) : null}
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Results</h1>
        </div>
        <div className="flex items-center justify-between">
          <Tabs value={sort}>
            <TabsList>
              <TabsTrigger value="consensus" asChild>
                <Link href={`/polls/${slug}/results?sort=consensus`}>
                  Most Consensus
                </Link>
              </TabsTrigger>
              <TabsTrigger value="conflict" asChild>
                <Link href={`/polls/${slug}/results?sort=conflict`}>
                  Most Conflict
                </Link>
              </TabsTrigger>
              <TabsTrigger value="confusion" asChild>
                <Link href={`/polls/${slug}/results?sort=confusion`}>
                  Most Confusion
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="text-sm font-medium text-pretty text-neutral-600 dark:text-neutral-400">
          {SORT_EXPLANATIONS[sort]}
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

function Highlights({
  visitorMostConflictStatementId,
  visitorMostConsensusStatementId,
  choicePercentage,
  statements,
}: {
  visitorMostConflictStatementId: number;
  visitorMostConsensusStatementId: number;
  choicePercentage: Awaited<
    ReturnType<typeof getPollResults>
  >["choicePercentage"];
  statements: Awaited<ReturnType<typeof getPollResults>>["statements"];
}) {
  const visitorMostConsensusStatement = statements.find(
    (s) => s.id === visitorMostConsensusStatementId,
  );
  const visitorMostConflictStatement = statements.find(
    (s) => s.id === visitorMostConflictStatementId,
  );

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold">Your Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            {/* <FiThumbsUp className="mr-2 text-green-600" size={16} /> */}
            My most consensus view
          </h3>
          <p className="font-medium mb-2">
            {visitorMostConsensusStatement?.text}
          </p>
          <div className="flex gap-2">
            <Chip variant="agree">
              {Math.round(
                choicePercentage[visitorMostConsensusStatementId].agree * 100,
              )}
              %
            </Chip>
            <Chip variant="disagree">
              {Math.round(
                choicePercentage[visitorMostConsensusStatementId].disagree *
                  100,
              )}
              %
            </Chip>
            <Chip variant="skip">
              {Math.round(
                choicePercentage[visitorMostConsensusStatementId].skip * 100,
              )}
              %
            </Chip>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            {/* <FiThumbsDown className="mr-2 text-red-600" size={16} /> */}
            My most controversial view
          </h3>
          <p className="font-medium mb-2">
            {visitorMostConflictStatement?.text}
          </p>
          <div className="flex gap-2">
            <Chip variant="agree">
              {Math.round(
                choicePercentage[visitorMostConflictStatementId].agree * 100,
              )}
              %
            </Chip>
            <Chip variant="disagree">
              {Math.round(
                choicePercentage[visitorMostConflictStatementId].disagree * 100,
              )}
              %
            </Chip>
            <Chip variant="skip">
              {Math.round(
                choicePercentage[visitorMostConflictStatementId].skip * 100,
              )}
              %
            </Chip>
          </div>
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
  const Icon = VARIANT_ICON[variant];
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
