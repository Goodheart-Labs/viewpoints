import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export function Banner() {
  return (
    <div className="w-full text-neutral-800 dark:text-white">
      <div className="py-12">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div className="grid gap-4 pl-1">
            <p className="text-3xl md:text-4xl font-extrabold tracking-tight dark:from-white dark:to-neutral-300">
              What on earth are you thinking?
            </p>
            <p className="text-lg md:text-xl text-neutral-400 dark:text-neutral-400 text-balance font-medium">
              Viewpoints.xyz is a tool that lets you gauge opinions on any
              topic. Create a poll, get a link, and find out what your community
              is thinking.
              <br />
              <Link
                href="/how-it-works"
                className="text-orange-600 hover:underline"
              >
                Learn how it works.
              </Link>
            </p>
          </div>
          <Link
            href="/new-poll"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg text-white bg-gradient-to-r from-neutral-700 to-neutral-900 hover:from-neutral-600 hover:to-neutral-800 dark:from-white dark:to-neutral-300 dark:text-black dark:hover:from-neutral-100 dark:hover:to-neutral-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-800 dark:focus:ring-white"
          >
            <FiPlus className="mr-2" />
            Create Poll
          </Link>
        </div>
      </div>
    </div>
  );
}
