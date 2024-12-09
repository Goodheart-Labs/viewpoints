import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import { checkIsBot } from "./lib/checkIsBot";

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

type NextMiddlewareRequestParam = Parameters<NextMiddleware>["0"];
type NextMiddlewareEvtParam = Parameters<NextMiddleware>["1"];
type NextMiddlewareReturn = ReturnType<NextMiddleware>;
type ClerkMiddlewareHandler = (
  auth: ClerkMiddlewareAuth,
  request: NextMiddlewareRequestParam,
  event: NextMiddlewareEvtParam,
) => NextMiddlewareReturn;

const isPublicRoute = createRouteMatcher([
  "/",
  "/polls/(.*)",
  "/embed/polls/(.*)",
  "/api/polls/(.*)",
  "/api/public/(.*)",
  "/privacy-policy",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sitemap.xml",
  "/robots.txt",
  "/success",
  "/embed/(.*)",
  "/how-it-works",
  "/features/(.*)",
]);

/**
 * This function ensures the visitorId cookie is set or
 * removes it if the request has a "removeVisitorId" query param.
 *
 * It accepts a getVisitorId function so we can generate the id differently
 * depending on whether the Clerk provider is present or not.
 */
function handleVisitorId(
  req: NextRequest,
  res: NextResponse,
  getVisitorId: () => string,
) {
  const visitorIdCookie = req.cookies.get("visitorId");
  if (req.nextUrl.searchParams.get("removeVisitorId")) {
    res.cookies.delete("visitorId");
  } else if (!visitorIdCookie) {
    res.cookies.set({
      name: "visitorId",
      value: getVisitorId(),
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "none",
      secure: true,
    });
    res.headers.set("x-pathname", req.nextUrl.pathname);
  }

  return res;
}

const clerkHandler: ClerkMiddlewareHandler = (auth, req, event) => {
  // If not a public route, ensure user is authenticated
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  const res = NextResponse.next();

  handleVisitorId(req, res, () => auth().userId || v4());

  return res;
};

function isEmbedRoute(request: NextRequest) {
  return request.nextUrl.pathname.startsWith("/embed");
}

export default function middleware(
  request: NextRequest,
  event: NextMiddlewareEvtParam,
) {
  const isBot = checkIsBot(request.headers.get("user-agent"));

  // If it's a bot, avoid the clerk middleware
  if (isBot) {
    return NextResponse.next();
  }

  // If it's an embed route, avoid the clerk middleware
  if (isEmbedRoute(request)) {
    return NextResponse.next();
  }

  return clerkMiddleware(clerkHandler)(request, event);
}
