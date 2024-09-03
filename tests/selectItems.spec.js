const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { InventoryPage } = require("../pages/inventoryPage");
const { CartPage } = require("../pages/cartPage");

test("Access the inventory page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");

  // Verify that product items are visible
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.assertItemsVisible();
});

test("Select 2 items", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");

  // Select 2 items
  const itemsToSelect = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
  ];
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.selectItemByLocator(itemsToSelect);
  await inventoryPage.goToCart();

  // Verify items are in the cart
  const textsToVerify = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
  const cartPage = new CartPage(page);
  await cartPage.verifyTextInCart(textsToVerify);
});

test("Select 3 items", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");

  // Select 3 items
  const itemsToSelect = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
    "add-to-cart-sauce-labs-bolt-t-shirt",
  ];
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.selectItemByLocator(itemsToSelect);
  await inventoryPage.goToCart();

  // Verify items are in the cart
  const textsToVerify = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
  ];
  const cartPage = new CartPage(page);
  await cartPage.verifyTextInCart(textsToVerify);
});

test("Select 4 items", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");

  // Select 4 items
  const itemsToSelect = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
    "add-to-cart-sauce-labs-bolt-t-shirt",
    "add-to-cart-sauce-labs-fleece-jacket",
  ];
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.selectItemByLocator(itemsToSelect);
  await inventoryPage.goToCart();

  // Verify items are in the cart
  const textsToVerify = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
  ];
  const cartPage = new CartPage(page);
  await cartPage.verifyTextInCart(textsToVerify);
});
