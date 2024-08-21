import { SORT_EXPLANATIONS } from "@/lib/copy";
import { getPollResults } from "@/lib/getPollResults";
import { getOptionalVisitorId } from "@/lib/getVisitorIdOrThrow";
import { StatementReview } from "@/lib/schemas";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import Link from "next/link";
import {
  FiThumbsUp,
  FiThumbsDown,
  FiMeh,
  FiUsers,
  FiMessageSquare,
} from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function ResultsPage({
  params,
  searchParams: { sort = "consensus" },
}: {
  params: { slug: string };
  searchParams: { sort: keyof StatementReview };
}) {
  const visitorId = getOptionalVisitorId();
  const data = await getPollResults(params.slug, sort, visitorId);
  const { visitorMostConflictStatementId, visitorMostConsensusStatementId } =
    data;

  return (
    <div className="grid gap-4">
      <div className="flex justify-center items-center gap-4">
        <div className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded-md text-sm flex items-center">
          <FiMessageSquare size={16} className="mr-2" />
          <span>{data.responsesCount} Responses</span>
        </div>
        <div className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded-md text-sm flex items-center">
          <FiUsers size={16} className="mr-2" />
          <span>{data.uniqueRespondentsCount} Respondents</span>
        </div>
      </div>

      {visitorId &&
      visitorMostConsensusStatementId &&
      visitorMostConflictStatementId ? (
        <Highlights
          visitorMostConflictStatementId={visitorMostConflictStatementId}
          visitorMostConsensusStatementId={visitorMostConsensusStatementId}
          statements={data.statements}
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
                <Link href={`/polls/${params.slug}/results?sort=consensus`}>
                  Most Consensus
                </Link>
              </TabsTrigger>
              <TabsTrigger value="conflict" asChild>
                <Link href={`/polls/${params.slug}/results?sort=conflict`}>
                  Most Conflict
                </Link>
              </TabsTrigger>
              <TabsTrigger value="confusion" asChild>
                <Link href={`/polls/${params.slug}/results?sort=confusion`}>
                  Most Confusion
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="text-sm text-neutral-600 font-medium text-pretty">
          {SORT_EXPLANATIONS[sort]}
        </div>
        <div className="grid gap-4">
          {data.statements
            .filter((s) => s.question_type === "default")
            .map((statement) => (
              <div
                key={statement.id}
                className="bg-white p-4 rounded-lg shadow"
                data-id={statement.id}
              >
                <p className="font-medium mb-2">{statement.text}</p>
                <div className="flex gap-2">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm flex items-center">
                    <FiThumbsUp className="mr-1" size={14} />
                    {Math.round(
                      data.choicePercentage[statement.id].agree * 100
                    )}
                    %
                  </div>
                  <div className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm flex items-center">
                    <FiThumbsDown className="mr-1" size={14} />
                    {Math.round(
                      data.choicePercentage[statement.id].disagree * 100
                    )}
                    %
                  </div>
                  {data.choicePercentage[statement.id].skip > 0 && (
                    <div className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded-md text-sm flex items-center">
                      <FiMeh className="mr-1" size={14} />
                      {Math.round(
                        data.choicePercentage[statement.id].skip * 100
                      )}
                      %
                    </div>
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
  statements,
}: {
  visitorMostConflictStatementId: number;
  visitorMostConsensusStatementId: number;
  statements: Awaited<ReturnType<typeof getPollResults>>["statements"];
}) {
  const visitorMostConflictStatement = statements.find(
    (s) => s.id === visitorMostConflictStatementId
  );
  const visitorMostConsensusStatement = statements.find(
    (s) => s.id === visitorMostConsensusStatementId
  );

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold">Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <FiThumbsUp className="mr-2 text-green-600" size={16} />
            My most consensus view
          </h3>
          <p className="font-medium mb-2">
            {visitorMostConsensusStatement?.text}
          </p>
          <div className="flex gap-2">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm flex items-center">
              <FiThumbsUp className="mr-1" size={14} />
              100%
            </span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm flex items-center">
              <FiThumbsDown className="mr-1" size={14} />
              0%
            </span>
            <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded-md text-sm flex items-center">
              <FiMeh className="mr-1" size={14} />
              0%
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <FiThumbsDown className="mr-2 text-red-600" size={16} />
            My most controversial view
          </h3>
          <p className="font-medium mb-2">
            {visitorMostConflictStatement?.text}
          </p>
          <div className="flex gap-2">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm flex items-center">
              <FiThumbsUp className="mr-1" size={14} />
              83%
            </span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm flex items-center">
              <FiThumbsDown className="mr-1" size={14} />
              17%
            </span>
            <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded-md text-sm flex items-center">
              <FiMeh className="mr-1" size={14} />
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
