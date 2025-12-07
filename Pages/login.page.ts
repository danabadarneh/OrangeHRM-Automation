
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly emptyMassage :Locator;
  readonly forgotPasswordLink :Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.emptyMassage=page.locator('.oxd-input-group__message');
    this.forgotPasswordLink=page.locator('.orangehrm-login-forgot-header');
  }
//class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"
  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  
  async clickforgotPassword (){
    await this.forgotPasswordLink.click();
  }

  getErrorMessage(): Locator {
    return this.errorMessage;
  }

  getEmptyMessage():Locator{
    return this.emptyMassage;
  }
  
}
