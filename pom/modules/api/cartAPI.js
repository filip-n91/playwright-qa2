import { expect } from "@playwright/test";

export class CartAPI {
  constructor(page) {
    this.page = page;
  }

  async addProductToCart(token, productId, cartId, statusResponse = 200) {
    let response = await this.page.request.post(
      `/api/v1/cart/${cartId}/products/${productId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(await response.status()).toBe(statusResponse);
    let responseJSON = await response.json();

    return responseJSON;
  }
}
