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
        className="absolute top-2 right-2 p-1 rounded-full text-white opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
      >
        <FiX className="w-4 h-4" />
      </button>
      <Link href="/new-poll" className="block">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4 p-6 rounded-lg border border-orange-300 dark:border-orange-700 bg-gradient-to-b from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 dark:from-orange-800 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-600 text-white shadow-md transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-3">
            <FiPlus className="w-8 h-8 text-yellow-300 dark:text-yellow-400" />
          </div>
          <div className="grid gap-0.5 text-center sm:text-left">
            <h3 className="text-lg font-semibold">
              Want to gather opinions fast?
            </h3>
            <p className="text-sm opacity-90 dark:opacity-80">
              Create your own poll now on Viewpoints!
            </p>
          </div>
          <FiBarChart2 className="w-6 h-6 text-yellow-300 dark:text-yellow-400" />
        </div>
      </Link>
    </div>
  );
}
