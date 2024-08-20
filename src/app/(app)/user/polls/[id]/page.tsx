import { EditPollForm } from "@/components/EditPollForm";
import { getPollAdminData } from "@/lib/getPollAdminData";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

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
