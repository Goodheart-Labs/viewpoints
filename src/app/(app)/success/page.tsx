import { FiCheckCircle, FiZap } from "react-icons/fi";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Success() {
  return (
    <div className="grid items-center justify-center">
      <div className="grid text-center gap-4 justify-items-center">
        <div className="flex items-center justify-center gap-2">
          <FiCheckCircle className="w-10 h-10 text-green-500" />
          <FiZap className="w-8 h-8 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Thank You for Signing Up!
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Welcome to Viewpoints. We&apos;re excited to have you on board!
        </p>
        <Link
          href="/user/polls"
          className="inline-block px-5 py-2 text-base font-semibold text-white bg-zinc-800 rounded-full hover:bg-zinc-700 transition duration-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          View Your Polls
        </Link>
      </div>
    </div>
  );
}
