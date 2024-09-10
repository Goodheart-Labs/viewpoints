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
      className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-4 rounded-lg border border-purple-300 bg-gradient-to-b from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-md transition-all duration-300 ease-in-out upgrade-link"
    >
      <FiZap className="w-8 h-8 text-yellow-300" />
      <div className="grid gap-0.5 flex-1 text-center sm:text-left">
        <span className="font-semibold">{children}</span>
        <span className="text-sm opacity-90">
          Create unlimited polls by upgrading to Viewpoints Plus
        </span>
      </div>
      <FiArrowRight className="w-6 h-6" />
    </Link>
  );
}
