import { Page } from '@playwright/test';

export class BuzzPage {
  constructor(private page: Page) {}

  async createPost(text: string) {
    // 1- اكتب داخل textarea
    const textarea = this.page.locator('textarea[placeholder="What\'s on your mind?"]');
    await textarea.click();
    await textarea.fill(text);

    // 2- استنى ظهور زر Post
    const postBtn = this.page.locator('button:has-text("Post")');
    await postBtn.waitFor({ state: 'visible', timeout: 10000 });

    // 3- اضغطي على زر Post
    await postBtn.click();

    // 4- استنى ظهور البوست الجديد
    await this.page.waitForSelector(`text=${text}`, { timeout: 10000 });
  }
}
