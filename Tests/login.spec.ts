// login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login.page';

test.describe('Orange HRM Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Valid login', async ({ page }) => {
    await loginPage.login('Admin', 'admin123');
    await expect(page.locator('h6')).toHaveText('Dashboard');
    await page.screenshot({ path: 'screenshots/valid-login.png', fullPage: true });
  });

  test('Invalid username', async ({ page }) => {
    await loginPage.login('WrongUser', 'admin123');
    await expect(loginPage.getErrorMessage()).toHaveText('Invalid credentials');
    await page.screenshot({ path: 'screenshots/invalid-username.png', fullPage: true });
  });

  test('Invalid password', async ({ page }) => {
    await loginPage.login('Admin', 'WrongPass');
    await expect(loginPage.getErrorMessage()).toHaveText('Invalid credentials');
    await page.screenshot({ path: 'screenshots/invalid-password.png', fullPage: true });
  });
});
