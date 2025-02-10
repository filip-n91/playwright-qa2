import { test, expect } from "@playwright/test";
import { generateUserCredentials, utils } from "../../fixtures";
import { RegisterAPI } from "../../pom/modules/api/registerAPI";

test.describe("login API tests", () => {
  let registerAPI;
  const { username, email, password } = generateUserCredentials(5);

  test.beforeEach("instantiate class", ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test("try to register without username via BE", async ({}) => {
    const response = await registerAPI.register("", email, password);

    expect(await response.message).toBe("The username field is required.");
  });

  test("try to register with an invalid email adress via BE", async ({}) => {
    const response = await registerAPI.register(
      username,
      utils.generateRandomString(5),
      password
    );

    expect(await response.message).toBe("The email field format is invalid.");
  });

  test("register via BE", async ({}) => {
    const response = await registerAPI.register(username, email, password);

    expect(response.status).toBe("Success");
    expect(response.user.username).toBe(username);
    expect(response.user.email).toBe(email);
  });
});
