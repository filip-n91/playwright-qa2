import { test, expect } from "@playwright/test";
import { CartAPI } from "../../pom/modules/api/cartAPI";
import { LoginAPI } from "../../pom/modules/api/loginAPI";
import { VALID_LOGIN_PAYLOAD } from "../../fixtures";

let cartAPI;
let loginAPI;
let token;
let id;

test.describe("Cart API tests", () => {
  test.beforeEach("Create class instance and login", async ({ page }) => {
    cartAPI = new CartAPI(page);
    loginAPI = new LoginAPI(page);
    const loginResponse = await loginAPI.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );
    token = await loginResponse.auth.token;
    id = await loginResponse.user.id;
  });
  test("Add product to the cart", async ({}) => {
    const response = await cartAPI.addProductToCart(await token, 5, id);
    const noOfProductInStock = await response.cart[0].in_stock;
    expect(await noOfProductInStock).toBeGreaterThan(0);
  });
});
