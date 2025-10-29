// tests/login.spec.js
import { test, expect } from '@playwright/test';
import LoginPage from './page/loginpage';

test.describe('Login E2E Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto("'https://practice.expandtesting.com/login");
  });

  test('Invalid username or password shows error message', async ({ page }) => {
    await loginPage.login('wrongUser', 'wrongPass');
    const msg = await loginPage.getMessageText()

    expect(msg).toMatch(/username|required!|invaled/)

  });
});
