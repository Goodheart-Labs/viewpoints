"use client";

import {
  FiArchive,
  FiBarChart,
  FiClipboard,
  FiCode,
  FiDownload,
  FiEdit,
  FiLink,
  FiShare2,
} from "react-icons/fi";
import { LuQrCode } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { toast } from "sonner";
import { getBaseUrl } from "@/lib/getBaseUrl";
import Link from "next/link";
import { forwardRef } from "react";
import QRCodeDialog from "./QRCodeDialog";
import { usePathname } from "next/navigation";

import { useBetterPendingAction } from "@/lib/usePendingAction";
import { getCSV } from "@/lib/getCsv";

export function PollHeader({
  slug,
  isOwner,
  pollId,
}: {
  slug: string;
  isOwner: boolean;
  pollId: number;
}) {
  const pathname = usePathname();
  const isResultsPage = pathname.endsWith("/results");
  const [isPending, handleDownload] = useBetterPendingAction(getCSV, {
    after(csv) {
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `poll-${slug}-results.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });

  return (
    <div className="flex gap-1 items-center mb-3">
      {isResultsPage ? (
        <PollButton icon={FiArchive} href={`/polls/${slug}`}>
          Vote
        </PollButton>
      ) : (
        <PollButton icon={FiBarChart} href={`/polls/${slug}/results`}>
          Results
        </PollButton>
      )}
      {isOwner ? (
        <PollButton icon={FiEdit} href={`/user/polls/${pollId}`}>
          Edit
        </PollButton>
      ) : null}

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <PollButton icon={FiShare2}>Share</PollButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onSelect={() => {
              copyLink(
                `${getBaseUrl()}/polls/${slug}`,
                "Poll link copied to clipboard",
              );
            }}
          >
            <FiLink className="w-4 h-4 mr-2" />
            Copy link to poll
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              copyLink(
                `${getBaseUrl()}/polls/${slug}/results`,
                "Results link copied to clipboard",
              );
            }}
          >
            <FiBarChart className="w-4 h-4 mr-2" />
            Copy link to results
          </DropdownMenuItem>
          <QRCodeDialog link={`${getBaseUrl()}/polls/${slug}`}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <LuQrCode className="w-4 h-4 mr-2" />
              Show QR code
            </DropdownMenuItem>
          </QRCodeDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <PollButton icon={FiDownload} onClick={() => handleDownload({ pollId })}>
        {isPending ? "Downloading..." : "Download"}
      </PollButton>
    </div>
  );
}

const pollBtnClasses =
  "flex items-center gap-2 text-sm font-medium p-1 px-2 rounded-md transition-colors text-neutral-500 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400";

interface PollButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  icon: typeof FiCode;
  href?: string;
}

const PollButton = forwardRef<HTMLButtonElement, PollButtonProps>(
  function PollButton({ children, icon: Icon, href, ...props }, ref) {
    if (href) {
      return (
        <Link href={href} className={pollBtnClasses}>
          <Icon />
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={pollBtnClasses} {...props}>
        <Icon />
        {children}
      </button>
    );
  },
);

function copyLink(url: string, success: string) {
  navigator.clipboard.writeText(url).then(() => {
    toast.success(success, {
      icon: <FiClipboard />,
    });
  });
}
