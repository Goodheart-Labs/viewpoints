import { getVisitorId } from "@/lib/actions";
import { DEFAULT_CORE_QUESTION } from "@/lib/copy";
import { getPoll } from "@/lib/getPoll";
import Link from "next/link";
import { FiLink, FiPlus, FiBarChart, FiCode } from "react-icons/fi";
import { LuQrCode } from "react-icons/lu";

export default async function PollLayout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const visitorId = await getVisitorId();
  const { poll } = await getPoll(slug, visitorId);
  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-8 grid content-center gap-6">
      <div className="grid">
        <div className="flex gap-1 items-center mb-4">
          <PollButton icon={FiLink}>Copy Link</PollButton>
          <PollButton icon={LuQrCode}>Show QR Code</PollButton>
          <PollButton icon={FiPlus}>Add Statement</PollButton>
          <PollButton icon={FiBarChart} href={`/polls/${slug}/results`}>
            Jump to Results
          </PollButton>
          {/* <PollButton>Download Results</PollButton>
    <PollButton>Share Results</PollButton> */}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
          {poll.title}
        </h1>
        <h2 className="text-lg text-neutral-400 text-pretty">
          {poll.core_question || DEFAULT_CORE_QUESTION}
        </h2>
      </div>
      {children}
    </div>
  );
}

const pollBtnClasses =
  "flex items-center gap-2 text-sm text-neutral-500 font-medium p-1 px-2 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors";

function PollButton({
  children,
  icon: Icon,
  href,
}: {
  children: React.ReactNode;
  icon: typeof FiCode;
  href?: string;
}) {
  if (href) {
    return (
      <Link href={href} className={pollBtnClasses}>
        <Icon />
        {children}
      </Link>
    );
  }
  return (
    <button className={pollBtnClasses}>
      <Icon />
      {children}
    </button>
  );
}