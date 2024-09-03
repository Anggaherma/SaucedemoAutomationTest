const { expect } = require("@playwright/test");

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('[data-test="inventory-list"] .inventory_item');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
  }

  async assertItemsVisible() {
    const itemsCount = await this.inventoryItems.count();

    for (let i = 0; i < itemsCount; i++) {
      const item = this.inventoryItems.nth(i);
      await expect(item).toBeVisible();
    }
  }

  getAddToCartButtonByLocator(locatorId) {
    return this.page.locator(`[data-test="${locatorId}"]`);
  }

  async selectItemByLocator(locatorIds) {
    for (const id of locatorIds) {
      const addToCartButton = await this.getAddToCartButtonByLocator(id);
      await addToCartButton.click();
    }
  }

  async selectRandomItems(numberOfItems) {
    const items = await this.inventoryItems.all();
    const randomItems = items
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfItems);

    for (const item of randomItems) {
      await item.locator('[data-test^="add-to-cart-"]').click();
    }
  }

  async goToCart() {
    await this.cartButton.click();
  }
}

module.exports = { InventoryPage };
