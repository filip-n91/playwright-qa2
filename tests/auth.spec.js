import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, generateUserCredentials, utils } from "../fixtures";

test.describe.configure({ mode: "serial" });
test.describe("register a user and log in", () => {
  const { username, email, password } = generateUserCredentials(5);

  test("register with valid data", async ({ page }) => {
    // visit the register page
    await page.goto(URLS["REGISTER"]);

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText(HEADINGS["REGISTER"]);

    // fill in the form
    utils.fillAndSubmitForm(page, "input", [username, email, password]);

    await expect(page).toHaveURL(URLS["DASHBOARD"]);
  });

  test("log in with registered user", async ({ page }) => {
    // visit the login page
    await page.goto(URLS["LOGIN"]);

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText(HEADINGS["LOGIN"]);

    // fill in the form
    utils.fillAndSubmitForm(page, "input", [email, password]);

    await expect(page).toHaveURL(URLS["DASHBOARD"]);
  });
});
