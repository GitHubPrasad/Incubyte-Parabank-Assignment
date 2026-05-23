import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole("button", { name: "Log In" });
    this.registerLink = page.getByRole("link", { name: "Register" });
  }

  async navigate() {
    await this.page.goto("/parabank/index.htm");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickRegister() {
    await this.registerLink.click();
  }
}
