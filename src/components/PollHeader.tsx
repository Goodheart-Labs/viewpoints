"use client";

import {
  FiBarChart,
  FiClipboard,
  FiCode,
  FiEdit,
  FiLink,
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

export function PollHeader({
  slug,
  isOwner,
  id,
}: {
  slug: string;
  isOwner: boolean;
  id: number;
}) {
  return (
    <div className="flex gap-1 items-center mb-3">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <PollButton icon={FiLink}>Share</PollButton>
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
      <PollButton icon={FiBarChart} href={`/polls/${slug}/results`}>
        Results
      </PollButton>
      {isOwner ? (
        <PollButton icon={FiEdit} href={`/user/polls/${id}`}>
          Edit
        </PollButton>
      ) : null}
      {/* <PollButton>Download Results</PollButton>
  <PollButton>Share Results</PollButton> */}
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
