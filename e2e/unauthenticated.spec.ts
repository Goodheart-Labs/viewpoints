import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page.getByTestId("site-title")).toHaveText("viewpoints.xyz");
});

test("attempting to create a poll redirects to sign in", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("create-poll-button").click();

  // Wait for navigation to complete
  await page.waitForURL(/.*sign-in.*/);
});
