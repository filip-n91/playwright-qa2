import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, generateUserCredentials, utils } from "../fixtures";

test.describe("login tests", () => {
  const { username, email, password } = generateUserCredentials(5);

  test.beforeEach("visit the login page", async ({ page }) => {
    await page.goto(URLS["LOGIN"]);
  });

  test("log in with existing user", async ({ page }) => {
    const heading = page.locator("h1");
    await heading.waitFor();
    await expect(heading).toHaveText(HEADINGS["LOGIN"]);

    // fill in the form
    utils.fillAndSubmitForm(page, "input", [email, password]);

    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page).toHaveURL(URLS["DASHBOARD"]);
  });
});
