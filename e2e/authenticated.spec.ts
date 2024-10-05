import { expect, test } from "@playwright/test";
import { clerk } from "@clerk/testing/playwright";

test("sign in", async ({ page }) => {
  // Navigate to an unprotected page that loads Clerk
  await page.goto("/");

  await clerk.loaded({ page });

  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: process.env.TEST_EMAIL!,
      password: process.env.TEST_PASSWORD!,
    },
  });

  // Navigate to polls page
  await page.goto("/user/polls");

  await expect(page.getByTestId("your-polls")).toBeVisible();
});
