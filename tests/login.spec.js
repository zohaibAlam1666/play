import { test, expect } from '@playwright/test';
import LoginPage from './page/loginpage';

test.describe('loginE2E', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();               
  });

  test('test 001 - fill and submit', async ({ page }) => {
    // either use the POM:
    // await page.fill("#username","user");
    // await page.fill("#password","pass");
    // await expect(page.locator("#flash")).toContainText("your password is invalid")

    const login2 = new LoginPage(page);

    await login2.login("anything","password")
    await login2.login("anything","password")


    // assert something about the flash message (example)

  });
});
