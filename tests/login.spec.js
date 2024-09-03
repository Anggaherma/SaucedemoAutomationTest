const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { InventoryPage } = require("../pages/inventoryPage");

test("Assert essential elements visibility", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  // Verify that essential UI elements are visible
  await loginPage.assertElementsVisible();
});

test("Login with valid credentials / standard_user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");

  // Verify successful login
  const inventoryPage = new InventoryPage(page);
  await expect(inventoryPage.inventoryItems).toBeVisible;
});

test("Login with locked user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("locked_out_user", "secret_sauce");

  // Verify there is error message
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Login with problem user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("problem_user", "secret_sauce");

  // Verify successful login
  const inventoryPage = new InventoryPage(page);
  await expect(inventoryPage.inventoryItems).toBeVisible;
});

test("Login with performance glitch user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("performance_glitch_user", "secret_sauce");

  // Verify successful login
  const inventoryPage = new InventoryPage(page);
  await expect(inventoryPage.inventoryItems).toBeVisible;
});

test("Login with visual user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("visual_user", "secret_sauce");

  // Verify successful login
  const inventoryPage = new InventoryPage(page);
  await expect(inventoryPage.inventoryItems).toBeVisible;
});

test("Login with wrong password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("standard_user", "wrong_password");

  // Verify there is error message
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
