const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { InventoryPage } = require("../pages/inventoryPage");
const { CartPage } = require("../pages/cartPage");
const { CheckoutPage } = require("../pages/checkoutPage");

test("Full flow for ordering items.", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");

  // Verify that product items are visible
  await inventoryPage.assertItemsVisible();

  // Select 2 random  items
  await inventoryPage.selectRandomItems(2);

  // Go to cart
  await inventoryPage.goToCart();

  // Remove an item
  await cartPage.removeItem();

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  // Fill the checkout form and complete the purchase
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillCheckoutForm("First", "Last", "12345");
  await checkoutPage.completePurchase();

  // Assertions
  await expect(page.locator("text=THANK YOU FOR YOUR ORDER")).toBeVisible();
});
