"use client";

import {
  FiArchive,
  FiBarChart,
  FiClipboard,
  FiCode,
  FiDownload,
  FiEdit,
  FiLink,
  FiPlus,
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
import { forwardRef, useCallback } from "react";
import QRCodeDialog from "./QRCodeDialog";
import { usePathname } from "next/navigation";

import { usePendingAction } from "@/lib/usePendingAction";
import { getCSV } from "@/lib/getCsv";
import AddStatementDialog from "./AddStatementDialog";
import { usePostHog } from "posthog-js/react";

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
  const [isPending, handleDownload] = usePendingAction(getCSV, {
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
  const posthog = usePostHog();
  const copyEmbedCode = useCallback(() => {
    const embedCode = `<iframe src="${getBaseUrl()}/embed/polls/${slug}" 
        frameborder="0" 
        scrolling="no" 
        allowfullscreen 
        style="width: 100%; height: 500px; border: none; overflow: hidden;">
    </iframe>`;
    posthog.capture("Share Poll Link", {
      poll_slug: slug,
      type: "embed",
    });
    copyText(embedCode, "Embed code copied to clipboard");
  }, [posthog, slug]);

  return (
    <div className="flex gap-1 items-center mb-3 justify-end">
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

      <AddStatementDialog>
        <PollButton icon={FiPlus}>Add Statement</PollButton>
      </AddStatementDialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <PollButton icon={FiShare2}>Share</PollButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onSelect={() => {
              posthog.capture("Share Poll Link", {
                poll_slug: slug,
                type: "vote",
              });
              copyText(
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
              posthog.capture("Share Poll Link", {
                poll_slug: slug,
                type: "results",
              });
              copyText(
                `${getBaseUrl()}/polls/${slug}/results`,
                "Results link copied to clipboard",
              );
            }}
          >
            <FiBarChart className="w-4 h-4 mr-2" />
            Copy link to results
          </DropdownMenuItem>
          <QRCodeDialog link={`${getBaseUrl()}/polls/${slug}`}>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                posthog.capture("Share Poll Link", {
                  poll_slug: slug,
                });
              }}
            >
              <LuQrCode className="w-4 h-4 mr-2" />
              Show QR code
            </DropdownMenuItem>
          </QRCodeDialog>
          <DropdownMenuItem onSelect={copyEmbedCode}>
            <FiCode className="w-4 h-4 mr-2" />
            Copy embed code
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleDownload({ pollId })}>
            <FiDownload className="w-4 h-4 mr-2" />
            Download CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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

function copyText(url: string, success: string) {
  navigator.clipboard.writeText(url).then(() => {
    toast.success(success, {
      icon: <FiClipboard />,
    });
  });
}
