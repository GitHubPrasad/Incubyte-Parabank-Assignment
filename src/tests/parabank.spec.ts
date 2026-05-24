import { test, expect, Browser, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { AccountPage } from "../pages/AccountPage";
import { TestDataHelper } from "../helpers/TestDataHelper";

// Shared username across all tests in this file

const testUser = TestDataHelper.generateUser();

test.describe("Parabank User Flows", () => {
  // This runs before ALL tests - registers the user once
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.navigate();
    await homePage.clickRegister();
    await registerPage.fillRegistrationForm(testUser);
    await registerPage.submitRegistration();

    // Wait for success then close this setup page
    await page.waitForURL(/parabank/);
    await page.close();
  });

  test("TC01 - Register a new user successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.navigate();
    await homePage.clickRegister();
    await expect(page).toHaveURL(/register/);

    await registerPage.fillRegistrationForm({
      ...testUser,
      username: `${testUser.username}_2`, // slightly different from main testUser
    });

    await registerPage.submitRegistration();

    // Verify success - check for welcome text after registration
    await expect(page.locator("h1.title")).toBeVisible();
    const heading = await page.locator("h1.title").innerText();
    console.log(`Registration heading: ${heading}`);
    expect(heading).toBeTruthy();
  });

  test("TC02 - Login with registered credentials", async ({ page }) => {
    const homePage = new HomePage(page);
    const accountPage = new AccountPage(page);

    await homePage.navigate();
    await homePage.login(testUser.username, testUser.password);

    // Verify URL changed after login
    await expect(page).toHaveURL(/overview/);

    // Verify logged in state
    const isLoggedIn = await accountPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test("TC03 - Display and log account balance after login", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const accountPage = new AccountPage(page);

    await homePage.navigate();
    await homePage.login(testUser.username, testUser.password);

    // Wait for overview page
    await expect(page).toHaveURL(/overview/);

    // Log the balance - core requirement!
    const balance = await accountPage.getAccountBalance();
    const totalBalance = await accountPage.getTotalBalance();

    expect(balance).toBeTruthy();
    expect(totalBalance).toBeTruthy();

    console.log(`✅ Balance: ${balance} | Total: ${totalBalance}`);
  });
});
