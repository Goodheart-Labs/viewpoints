import { getPoll } from "@/lib/getPoll";

import { FiCode, FiBarChart, FiPlus, FiLink } from "react-icons/fi";
import { LuQrCode } from "react-icons/lu";

import { PollStatement } from "@/components/PollStatement";
import { getVisitorId } from "@/lib/actions";

export default async function PollPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const visitorId = await getVisitorId();
  const { poll, statements } = await getPoll(slug, visitorId);

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-8 grid content-center gap-6">
      <div className="grid">
        <div className="flex gap-1 items-center mb-4">
          <PollButton icon={FiLink}>Copy Link</PollButton>
          <PollButton icon={LuQrCode}>Show QR Code</PollButton>
          <PollButton icon={FiPlus}>Add Statement</PollButton>
          <PollButton icon={FiBarChart}>Jump to Results</PollButton>
          {/* <PollButton>Download Results</PollButton>
        <PollButton>Share Results</PollButton> */}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
          {poll.title}
        </h1>
        <h2 className="text-lg text-neutral-400 text-pretty">
          {poll.core_question ||
            "What do you think of the following statements?"}
        </h2>
      </div>
      <div className="grid gap-2">
        <PollStatement {...statements[0]} />
      </div>
    </div>
  );
}

function PollButton({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon: typeof FiCode;
}) {
  return (
    <button className="flex items-center gap-2 text-sm text-neutral-500 font-medium p-1 px-2 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors">
      <Icon />
      {children}
    </button>
  );
}
