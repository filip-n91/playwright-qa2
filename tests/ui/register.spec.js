import { test, expect } from "@playwright/test";
import {
  HEADINGS,
  URLS,
  generateUserCredentials,
  VALID_LOGIN_PAYLOAD,
} from "../../fixtures";
import { RegisterPage } from "../../pom/modules/ui/registerPage";

test.describe("register tests", () => {
  let registerPage;
  const { username, email, password } = generateUserCredentials(5);

  test.beforeEach("visit the register page", async ({ page }) => {
    registerPage = new RegisterPage(page);

    await page.goto(URLS["REGISTER"]);
  });

  test("try to register without username data", async ({}) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    await registerPage.register("", email, password);

    await expect(registerPage.registerErrorMessage).toBeVisible();
  });

  test("try to register with already registered credentials", async ({}) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    await registerPage.register(
      username,
      VALID_LOGIN_PAYLOAD["EMAIL"],
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );

    await expect(registerPage.registerErrorMessage).toBeVisible();
  });

  test("register with valid data", async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    registerPage.register(username, email, password);

    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page).toHaveURL(URLS["DASHBOARD"]);
  });
});
