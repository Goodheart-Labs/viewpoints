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

/**
 * Gets the visitor id for the current user if there is one,
 * but does not generate a new one if there isn't. This is
 * currently used for the results page, where a user id
 * is not required.
 */
export function getOptionalVisitorId() {
  const { userId } = auth();
  const visitorId = userId || cookies().get("visitorId")?.value;
  return visitorId;
}
