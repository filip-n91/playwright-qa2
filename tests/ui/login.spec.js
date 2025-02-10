import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD } from "../../fixtures";
import { LoginPage } from "../../pom/modules/ui/loginPage";

test.describe("login tests", () => {
  let loginPage;

  test.beforeEach("visit the login page", async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto(URLS["LOGIN"]);
  });

  test("try to log in with an invalid email", async ({}) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS["LOGIN"]);

    loginPage.login(
      utils.generateRandomString(10),
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );

    await expect(loginPage.loginErrorMessage).toBeVisible();
  });

  test("try to log in with an invalid password", async ({}) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS["LOGIN"]);

    loginPage.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      utils.generateRandomString(10)
    );

    await expect(loginPage.loginErrorMessage).toBeVisible();
  });

  test("log in with existing user", async ({ page }) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS["LOGIN"]);

    loginPage.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );

    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page).toHaveURL(URLS["DASHBOARD"]);
  });
});
