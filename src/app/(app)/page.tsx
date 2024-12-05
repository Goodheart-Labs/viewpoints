import { Banner } from "@/components/Banner";
import { PollList } from "@/components/PollList";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { getIndexPolls } from "@/lib/getIndexPolls";
import Link from "next/link";
import { FiCalendar, FiPlus } from "react-icons/fi";

export default async function Home() {
  const polls = await getIndexPolls();

  return (
    <main className="px-4 w-full max-w-5xl mx-auto">
      <link rel="canonical" href={getBaseUrl()} />

      <Banner />

      <h2 className="text-xl font-medium my-4 ml-px text-neutral-800 dark:text-neutral-200 border-b pb-2 flex items-center">
        <FiCalendar className="inline-block mr-2" />
        Latest Polls
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
        <CreatePoll />
        <PollList polls={polls} />
      </div>
    </main>
  );
}

function CreatePoll() {
  return (
    <Link
      href="/new-poll"
      className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 grid content-between min-h-[160px] lg:min-h-[200px] shadow-md hover:rotate-1 hover:scale-105 transition-all duration-300"
    >
      <div className="grid gap-2">
        <h2 className="text-xl font-bold leading-tight text-neutral-700 dark:text-neutral-100">
          Create your own poll!
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 text-pretty">
          It only takes a few minutes to create a poll, and you can create
          public or private polls.{" "}
        </p>
      </div>
      <div className="flex items-center gap-2 font-medium">
        <FiPlus className="w-5 h-5" />
        Create poll
      </div>
    </Link>
  );
}
