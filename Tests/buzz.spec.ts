import { test, expect } from '@playwright/test';
import { BuzzPage } from '../Pages/buzz.page';
import { LoginPage } from '../Pages/login.page';



test.describe('Orange HRM Login Tests', () => {


    let buzzpage: BuzzPage;
    let loginPage: LoginPage;
  
    test.beforeEach(async ({ page }) => {
      buzzpage = new BuzzPage(page);
      await buzzpage.goto();
    });
 

 test('Verify the post button is visible',async({page})=>{
  await expect(buzzpage.postbtn).toBeVisible();
  await page.screenshot({ path: 'screenshots/Verify the post button is visible.png', fullPage: true });
 });
  

});