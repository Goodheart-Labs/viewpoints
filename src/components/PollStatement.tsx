import type { getPoll } from "@/lib/getPoll";
import {
  FiThumbsDown,
  FiStar,
  FiThumbsUp,
  FiMeh,
  FiFlag,
} from "react-icons/fi";
import Image from "next/image";
import { IconType } from "react-icons";
import { cn } from "@/ui/cn";

// Updated StatementButton component
function StatementButton({
  icon: Icon,
  className,
  children,
}: {
  icon: IconType;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "text-2xl flex items-center rounded-full p-2 px-4 transition-colors",
        className
      )}
    >
      <Icon className="mr-2" />
      <span className="text-lg">{children}</span>
    </button>
  );
}

export function PollStatement({
  text,
  created_at,
  id,
  user_id,
  author_name,
  author_avatar_url,
  visible,
}: Awaited<ReturnType<typeof getPoll>>["statements"][number]) {
  return (
    <div className="border rounded-xl bg-white shadow-sm grid overflow-hidden">
      <div className="grid gap-8 p-8">
        <p className="text-2xl font-medium text-center tracking-[-0.02em] statement-text">
          {text}
        </p>
        <div className="flex space-x-4 justify-center">
          <StatementButton
            icon={FiThumbsDown}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Disagree
          </StatementButton>
          <StatementButton
            icon={FiMeh}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Skip
          </StatementButton>
          <StatementButton
            icon={FiThumbsUp}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Agree
          </StatementButton>
        </div>
      </div>
      <div className="p-2 px-4 flex items-center justify-between border-t">
        <button className="text-sm text-neutral-400 hover:text-neutral-500 flex items-center gap-2">
          <FiFlag />
          Flag Statement
        </button>
        <div className="flex items-center justify-end">
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
        </div>
      </div>
    </div>
  );
}
