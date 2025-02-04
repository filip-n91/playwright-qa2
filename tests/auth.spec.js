const { test, expect } = require("@playwright/test");
import { generateRandomString } from "../fixtures/utils";

test.describe.configure({ mode: "serial" });
test.describe("register a user and log in", () => {
  let username = generateRandomString(5);
  let email = `${username}@mail.com`;
  let password = "test123";

  test("register with valid data", async ({ page }) => {
    // visit the register page
    await page.goto("/register");

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText("Register!");

    // fill in the form
    await page.locator("#username").fill(username);
    await page.locator("#email").fill(email);
    await page.locator("#password").fill(password);

    // click on submit button
    await page.locator("button").click();

    await expect(page).toHaveURL("/dashboard");
  });

  test("log in with registered user", async ({ page }) => {
    // visit the login page
    await page.goto("/login");

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText("Welcome Back! 👋🏻");

    // fill in the form
    await page.locator("#email").fill(email);
    await page.locator("#password").fill(password);

    // click on submit button
    await page.locator("button").click();

    await expect(page).toHaveURL("/dashboard");
  });
});
