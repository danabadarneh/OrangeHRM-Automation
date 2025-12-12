import { test, expect } from '@playwright/test';
import { BuzzPage } from '../Pages/buzz.page';
import { LoginPage } from '../Pages/login.page';

test('Create a new post via UI', async ({ page }) => {
  const login = new LoginPage(page);
  const buzz = new BuzzPage(page);

  await login.goto();
  await login.login('Admin', 'admin123');

  // فتح buzz من المينيو
  await page.click('a[href="/web/index.php/buzz/viewBuzz"]');

  const postText = "Hello from Playwright!";
  await buzz.createPost(postText);

  await expect(page.locator(`text=${postText}`)).toBeVisible();
});
