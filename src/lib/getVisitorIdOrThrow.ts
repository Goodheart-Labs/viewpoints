import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

/**
 * Returns the visitor id without redirect – throwing an error if the visitor id is not set.
 */
export function getVisitorIdOrThrow() {
  const { userId } = auth();
  const visitorId = userId || cookies().get("visitorId")?.value;
  if (!visitorId) {
    throw new Error("Visitor ID not set");
  }
  return visitorId;
}
