// tests/pages/LoginPage.js

export default class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submitButton = page.locator('#submit-login');
    this.form = page.locator('#login');
  }

  async goto() {
    await this.page.goto('https://practice.expandtesting.com/login');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submitButton.click();
  }

  async getFlashMessage() {
    // After login, an alert or banner shows message
    const messageLocator = this.page.locator('.alert, #flash, .message');
    if (await messageLocator.count()) {
      return (await messageLocator.first().innerText()).trim();
    } else {
      // fallback if message area isn't found
      return await this.page.textContent('body');
    }
  }
}
