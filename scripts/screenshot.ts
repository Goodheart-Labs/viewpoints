import { chromium } from "@playwright/test";
import path from "path";
import * as dotenv from "dotenv";
import { clerk } from "@clerk/testing/playwright";

// Load .env.util file
dotenv.config({ path: ".env.util" });

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  try {
    // Navigate to homepage first
    await page.goto("http://localhost:3000");

    // Wait for Clerk to load
    await clerk.loaded({ page });

    // Sign in using Clerk's testing helper
    await clerk.signIn({
      page,
      signInParams: {
        strategy: "password",
        identifier: process.env.USER_EMAIL!,
        password: process.env.USER_PASSWORD!,
      },
    });

    // Navigate to polls page
    await page.goto("http://localhost:3000/user/polls");
    await page.waitForSelector("[data-testid=your-polls]");

    // Create screenshots directory
    const screenshotDir = path.resolve(__dirname, "../src/public/screenshots");
    await Bun.write(Bun.file(`${screenshotDir}/.gitkeep`), "");

    await page.screenshot({
      path: path.join(screenshotDir, "polls-page.png"),
      fullPage: true,
    });

    console.log("Screenshot captured successfully!");
  } catch (error) {
    console.error("Error capturing screenshot:", error);
  } finally {
    await browser.close();
  }
}

// Run the script
captureScreenshots();
