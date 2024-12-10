import { FiBarChart2, FiPlus, FiX } from "react-icons/fi";
import Link from "next/link";

export function CreatePollCallout({ closeCta }: { closeCta: () => void }) {
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          closeCta();
        }}
        className="absolute top-2 right-2 p-1 rounded-full text-white/80 hover:text-white transition-opacity duration-200 ease-in-out"
      >
        <FiX className="w-4 h-4" />
      </button>
      <Link href="/new-poll" className="block">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4 p-6 rounded-lg border border-blue-200 dark:border-blue-900 bg-gradient-to-b from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 dark:from-blue-900 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-700 text-white shadow-md transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-3">
            <FiPlus className="w-8 h-8 text-sky-100 dark:text-sky-200" />
          </div>
          <div className="grid gap-0.5 text-center sm:text-left">
            <h3 className="text-lg font-semibold">
              Want to gather opinions fast?
            </h3>
            <p className="text-sm text-blue-50 dark:text-blue-100">
              Create your own poll now on Viewpoints!
            </p>
          </div>
          <FiBarChart2 className="w-6 h-6 text-sky-100 dark:text-sky-200" />
        </div>
      </Link>
    </div>
  );
}
