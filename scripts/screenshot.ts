import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import * as dotenv from "dotenv";
import { clerk, clerkSetup } from "@clerk/testing/playwright";
import sharp from "sharp";

// Load .env.util file
dotenv.config({ path: ".env.util" });

async function captureScreenshots() {
  await clerkSetup();

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 800, height: 800 },
  });
  const page = await context.newPage();

  try {
    // Navigate to homepage first
    await page.goto("http://localhost:3000");

    // Get screenshots directory
    const screenshotDir = path.resolve(__dirname, "../public/screenshots");

    // Erase everything from the screenshots directory
    fs.rmSync(screenshotDir, { recursive: true, force: true });

    // Wait for Clerk to load
    await clerk.loaded({ page });

    await page.goto("http://localhost:3000/polls/pet-preferences-survey");

    let inputPath = path.join(screenshotDir, "_poll-page.png");
    let outputPath = path.join(screenshotDir, "poll-page.png");

    await page.screenshot({ path: inputPath, fullPage: true });

    // Process with Sharp
    let image = sharp(inputPath);
    let metadata = await image.metadata();

    // Crop to square, center
    if (metadata.width && metadata.height) {
      const size = Math.min(metadata.width, metadata.height);

      await image
        .extract({
          left: 0,
          top: 0,
          width: size,
          height: size,
        })
        .toFile(outputPath);
    }

    // Remove the input file
    fs.unlinkSync(inputPath);

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
    await page.goto("http://localhost:3000/new-poll");
    // Click the create with AI button
    await page.click("[data-testid=create-with-ai-button]");
    await page.waitForSelector("[data-testid=create-with-ai-title]");

    inputPath = path.join(screenshotDir, "_create-with-ai.png");
    outputPath = path.join(screenshotDir, "create-with-ai.png");

    // Screenshot element with testid new-poll-page
    await page.locator("[data-testid=new-poll-page]").screenshot({
      path: inputPath,
    });

    // Process with Sharp
    image = sharp(inputPath);
    metadata = await image.metadata();

    if (metadata.width && metadata.height) {
      const size = Math.min(metadata.width, metadata.height);

      await image
        .extract({
          left: 0,
          top: 0,
          width: size,
          height: size,
        })
        .toFile(outputPath);
    }

    // Remove the input file
    fs.unlinkSync(inputPath);

    // Navigate to a poll results page
    await page.goto(
      "http://localhost:3000/polls/pet-preferences-survey/results",
    );
    await page.click("[data-testid=poll-share-button]");
    await page.click("[data-testid=poll-share-qr-code]");
    await page.waitForSelector("[data-testid=qr-code-dialog-title]");

    inputPath = path.join(screenshotDir, "_qr-code-dialog.png");
    outputPath = path.join(screenshotDir, "qr-code-dialog.png");

    await page.locator("[data-testid=poll-layout]").screenshot({
      path: inputPath,
    });

    // Process with Sharp
    image = sharp(inputPath);
    metadata = await image.metadata();

    if (metadata.width && metadata.height) {
      const size = Math.min(metadata.width, metadata.height);

      await image
        .extract({
          left: 0,
          top: 0,
          width: size,
          height: size,
        })
        .toFile(outputPath);
    }

    // Remove the input file
    fs.unlinkSync(inputPath);

    // Navigate to a poll results page
    await page.goto(
      "http://localhost:3000/polls/pet-preferences-survey/results",
    );

    inputPath = path.join(screenshotDir, "_results-page.png");
    outputPath = path.join(screenshotDir, "results-page.png");

    await page.locator("[data-testid=poll-layout]").screenshot({
      path: inputPath,
    });

    // Process with Sharp
    image = sharp(inputPath);
    metadata = await image.metadata();

    if (metadata.width && metadata.height) {
      const size = Math.min(metadata.width, metadata.height);

      await image
        .extract({
          left: 0,
          top: 0,
          width: size,
          height: size,
        })
        .toFile(outputPath);
    }

    // Remove the input file
    fs.unlinkSync(inputPath);

    console.log("Screenshots captured successfully!");
  } catch (error) {
    console.error("Error capturing screenshot:", error);
  } finally {
    await browser.close();
  }
}

// Run the script
captureScreenshots();
