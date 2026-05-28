import {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  expect,
} from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { RegisterPage } from "../../pages/RegisterPage";
import { AccountPage } from "../../pages/AccountPage";
import { TestDataHelper } from "../../helpers/TestDataHelper";
import { logger } from "../../helpers/Logger";
// Set timeout for all steps
setDefaultTimeout(60 * 1000);

// Shared variables across steps
let browser: Browser;
let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let registerPage: RegisterPage;
let accountPage: AccountPage;

const testUser = TestDataHelper.generateUser();

// Runs before each scenario
Before(async () => {
  const isCI = process.env.CI === "true";
  browser = await chromium.launch({ headless: isCI ? true : false });
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);
  accountPage = new AccountPage(page);
});

// Runs after each scenario
After(async () => {
  try {
    if (context) await context.close();
    if (browser) await browser.close();
  } catch (error) {
    logger.error(`Error closing browser: ${error}`);
  }
});

// =================== STEP DEFINITIONS ===================

Given("I am on the ParaBank home page", async () => {
  await homePage.navigate();
});

When("I click on the Register link", async () => {
  await homePage.clickRegister();
});

When("I fill in the registration form with valid details", async () => {
  await registerPage.fillRegistrationForm(testUser);
});

When("I click the Register button", async () => {
  await registerPage.submitRegistration();
});

Then("I should see a successful registration message", async () => {
  const heading = await page.locator("h1.title").innerText();
  logger.info(`Registration message: ${heading}`);
  expect(heading).toBeTruthy();
});

When("I login with valid username and password", async () => {
  await homePage.login(testUser.username, testUser.password);
});

Then("I should be redirected to the account overview page", async () => {
  await page.waitForLoadState("networkidle");
  const currentURL = page.url();
  logger.info(`Current URL: ${currentURL}`);
  expect(currentURL).toContain("overview");
});

Then("I should see the welcome message", async () => {
  const url = page.url();
  logger.info(`Current page after login: ${url}`);
  expect(url).toContain("overview");
});

Then("the account balance should be displayed on the page", async () => {
  const balance = await accountPage.getAccountBalance();
  expect(balance).toBeTruthy();
});

Then("the balance amount should be logged to the console", async () => {
  const total = await accountPage.getTotalBalance();
  logger.info(`💰 Final Balance logged: ${total}`);
  expect(total).toBeTruthy();
});
