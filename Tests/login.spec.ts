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

  test('Invalid password and invalid username',async({page})=>{
    await loginPage.login('wronguser','wrongpass');
    await expect(loginPage.getErrorMessage()).toHaveText('Invalid credentials');
    await page.screenshot({path:'screenshots/Invalid password and invalid username.png',fullPage:true});
  });

  test('empty username and empty password',async({page})=>{
    await loginPage.login('','');
    await expect(loginPage.getEmptyMessage()).toHaveText(['Required','Required']);
    await page.screenshot({path:'screenshots/empty username and empty password.png',fullPage:true});
  });

  test('valid username and empty password',async({page})=>{
    await loginPage.login('Admin','');
    await expect(loginPage.getEmptyMessage()).toHaveText('Required');
    await page.screenshot({path:'screenshots/valid username and empty password.png',fullPage:true});
  });

  test('empty username and valid password',async({page})=>{
    await loginPage.login('','admin123');
    await expect(loginPage.getEmptyMessage()).toHaveText('Required');
    await page.screenshot({path:'screenshots/empty username and empty password.png',fullPage:true});
  });

  test('special characters username and password',async({page})=>{
    await loginPage.login('@#$@!@#','@##@#');
    await expect(loginPage.getErrorMessage()).toHaveText('Invalid credentials');
    await page.screenshot({path:'screenshots/special characters username and password.png',fullPage:true});
  });

  test('case sensitivity on username and password',async({page})=>{
    await loginPage.login('admin','ADMIN123');
    await expect(loginPage.getErrorMessage()).toHaveText('Invalid credentials');
    await page.screenshot({path:'screenshots/case sensitivity on username and password.png',fullPage:true});
  });

   test('Verify navigation to Forgot Password page',async({page})=>{
    await loginPage.clickforgotPassword();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    await expect(page.locator('h6')).toHaveText('Reset Password');
    await page.screenshot({path:'screenshots/Verify navigation to Forgot Password page.png'});
   });

});
