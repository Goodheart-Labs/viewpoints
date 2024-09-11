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
      className="grid grid-cols-[auto,1fr,auto] items-center gap-4 p-4 rounded-lg border border-purple-300 dark:border-purple-700 bg-gradient-to-b from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 dark:from-purple-800 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-600 text-white shadow-md transition-all duration-300 ease-in-out upgrade-link"
    >
      <FiZap className="w-8 h-8 text-yellow-300 dark:text-yellow-400" />
      <div className="grid gap-0.5 text-center sm:text-left">
        <span className="font-semibold">{children}</span>
        <span className="text-sm opacity-90 dark:opacity-80">
          Create unlimited polls by upgrading to Viewpoints Plus
        </span>
      </div>
      <FiArrowRight className="w-6 h-6" />
    </Link>
  );
}
