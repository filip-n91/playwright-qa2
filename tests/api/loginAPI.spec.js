import { test, expect } from "@playwright/test";
import { utils, VALID_LOGIN_PAYLOAD } from "../../fixtures";
import { LoginAPI } from "../../pom/modules/api/loginAPI";

test.describe("login API tests", () => {
  let loginAPI;

  test.beforeEach("instantiate class", ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test("try login via BE using invalid email adress", async ({}) => {
    const response = await loginAPI.login(
      utils.generateRandomString(5),
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );
    expect(response.message).toBe(
      "The email field must be a valid email address."
    );
  });

  test("try login via BE using invalid password", async ({}) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      utils.generateRandomString(5)
    );

    expect(await response.error).toBe("Unauthorized");
  });

  test("login via BE", async ({}) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );

    expect(response.status).toBe("Success");
    expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD["EMAIL"]);
  });
});
