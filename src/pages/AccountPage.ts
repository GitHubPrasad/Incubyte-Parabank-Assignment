import { Page, Locator } from "@playwright/test";

export class AccountPage {
  readonly page: Page;

  readonly welcomeMessage: Locator;
  readonly accountBalance: Locator;
  readonly totalBalance: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator(".smallText");
    this.accountBalance = page.locator(
      "#accountTable tbody tr:first-child td:nth-child(2)",
    );
    this.totalBalance = page.locator(
      "#accountTable tbody tr:nth-child(2) td:nth-child(2) b",
    );
    this.logoutLink = page.getByRole("link", { name: "Log Out" });
  }

  async getWelcomeMessage(): Promise<string> {
    await this.welcomeMessage.waitFor({ state: "visible" });
    return await this.welcomeMessage.innerText();
  }

  async getAccountBalance(): Promise<string> {
    await this.accountBalance.waitFor({ state: "visible" });
    const balance = await this.accountBalance.innerText();
    console.log(`💰 Account Balance displayed on page: ${balance}`);
    return balance;
  }

  async getTotalBalance(): Promise<string> {
    await this.totalBalance.waitFor({ state: "visible" });
    const total = await this.totalBalance.innerText();
    console.log(`💰 Total Balance displayed on page: ${total}`);
    return total;
  }

  async logout() {
    await this.logoutLink.click();
  }

  async isLoggedIn(): Promise<boolean> {
    // Wait for page to load after login
    await this.page.waitForLoadState("networkidle");
    console.log(`Current URL: ${this.page.url()}`);

    // Check URL contains 'overview' instead of checking element
    return this.page.url().includes("overview");
  }
}
