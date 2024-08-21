import { Button } from "@/ui/button";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function PollNotFound() {
  return (
    <div className="grid place-items-center content-center">
      <FiAlertTriangle className="text-6xl text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Poll Not Found</h1>
      <p className="text-neutral-600 mb-4">
        Sorry, we couldn&apos;t find the poll you&apos;re looking for.
      </p>
      <Button variant="highlight" asChild>
        <Link href="/">← Back to Home</Link>
      </Button>
    </div>
  );
}
