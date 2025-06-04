import { EditPollForm } from "@/components/EditPollForm";
import { getPollAdminData } from "@/lib/getPollAdminData";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArchive, FiBarChart } from "react-icons/fi";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PollAdminPage({ params }: PageProps) {
  const pollId = params.id;
  const data = await getPollAdminData(parseInt(pollId, 10));
  if (!(await canAdmin(data))) {
    return notFound();
  }

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Poll Admin: {data.poll.title}</h1>
      <div className="flex gap-2 mb-6">
        <Link
          href={`/polls/${data.poll.slug}`}
          className="flex items-center gap-2 text-sm font-medium p-1 px-2 rounded-md transition-colors text-neutral-500 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400"
        >
          <FiArchive /> View Poll
        </Link>
        <Link
          href={`/polls/${data.poll.slug}/results`}
          className="flex items-center gap-2 text-sm font-medium p-1 px-2 rounded-md transition-colors text-neutral-500 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400"
        >
          <FiBarChart /> View Results
        </Link>
      </div>
      <EditPollForm {...data} />
    </div>
  );
}

async function canAdmin(data: Awaited<ReturnType<typeof getPollAdminData>>) {
  const user = await currentUser();
  const { protect } = auth();

  if (!user) {
    return protect();
  }

  const isCreator = data.poll.user_id === user?.id;
  const isSuperAdmin = Boolean(user.publicMetadata.isSuperAdmin);

  return isCreator || isSuperAdmin;
}
