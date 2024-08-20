import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { FiExternalLink } from "react-icons/fi";
import { Button } from "@/ui/button";
import { getSubscription } from "@/lib/getSubscription";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Account() {
  const { userId } = auth();
  if (!userId) notFound();

  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;
  const { subscription } = await getSubscription();

  return (
    <div className="w-full max-w-3xl mx-auto grid gap-4 content-start p-4 py-8">
      <header className="grid">
        <h1 className="text-2xl font-semibold text-neutral-900">Account</h1>
        <p className="text-neutral-600">Logged in as: {email}</p>
      </header>
      {subscription ? (
        <div className="bg-white rounded-lg border shadow-sm p-4 grid gap-4">
          <h2 className="text-lg font-bold text-neutral-900">
            Subscription Details
          </h2>
          <div className="grid gap-2 text-base">
            <SubscriptionDetail label="Status" value={subscription.status} />
            <SubscriptionDetail
              label="Billing Cycle"
              value={`${subscription.billingCycle}ly`}
            />
            <SubscriptionDetail
              label="Next Billing Date"
              value={dayjs(subscription.nextBillingDate).format("MMMM D, YYYY")}
            />
            <SubscriptionDetail
              label="Currency"
              value={subscription.currency.toUpperCase()}
            />
            <SubscriptionDetail
              label="Subscription Start Date"
              value={dayjs(subscription.startDate).format("MMMM D, YYYY")}
            />
          </div>
          <Button size="lg" className="text-base mt-4" asChild>
            <Link
              href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL!}
              target="_blank"
              className="flex items-center justify-center gap-2"
            >
              <FiExternalLink className="w-4 h-4" />
              Manage Subscription
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <p className="text-neutral-600 mb-4">
            You don&apos;t have an active subscription.
          </p>
          <Button className="w-full text-base font-medium" asChild>
            <Link href="/pricing">Upgrade to Pro</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function SubscriptionDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <p className="flex justify-between">
      <span className="font-medium text-neutral-600">{label}:</span>
      <span className="text-neutral-900">
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    </p>
  );
}
