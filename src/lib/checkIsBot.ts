import { parse } from "express-useragent";

/**
 * Check if the request is from a bot
 */
export function checkIsBot(userAgent: string | null) {
  if (!userAgent) {
    // If there's no user agent, it's probably a bot
    return true;
  }
  const ua = parse(userAgent);
  return ua.isBot;
}
