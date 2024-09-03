const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async removeItem() {
    // Click the first "Remove" button in the cart
    const firstRemoveButton = this.page.locator(".cart_button").first();
    await firstRemoveButton.click(); // Click the first remove button
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async verifyTextInCart(expectedTexts) {
    for (const text of expectedTexts) {
      const textLocator = this.page.locator(`text="${text}"`);
      await expect(textLocator).toBeVisible();
    }
  }
}

module.exports = { CartPage };
