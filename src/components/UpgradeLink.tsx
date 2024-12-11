import Link from "next/link";
import { FiArrowRight, FiZap } from "react-icons/fi";

export function UpgradeLink({
  children = "Need more polls?",
}: {
  children?: React.ReactNode;
}) {
  return (
    <Link
      href="/upgrade"
      className="grid grid-cols-[auto,1fr,auto] items-center gap-4 p-4 rounded-lg border border-orange-200 dark:border-orange-900/50 bg-gradient-to-b from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 dark:from-orange-900/20 dark:to-orange-900/30 dark:hover:from-orange-900/30 dark:hover:to-orange-900/40 text-orange-950 dark:text-orange-100 shadow-sm transition-all duration-300 ease-in-out"
    >
      <FiZap className="w-6 h-6 text-orange-500 dark:text-orange-400" />
      <div className="grid gap-0.5">
        <span className="font-medium">{children}</span>
        <span className="text-sm text-orange-700/80 dark:text-orange-300/80">
          Create unlimited polls by upgrading to Viewpoints Plus for £10/month
        </span>
      </div>
      <FiArrowRight className="w-5 h-5 text-orange-500 dark:text-orange-400" />
    </Link>
  );
}
