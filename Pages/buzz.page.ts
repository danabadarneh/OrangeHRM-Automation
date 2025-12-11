import { Page,Locator,expect } from "@playwright/test";

export class BuzzPage {
 readonly page: Page;
 readonly textarea :Locator;
 readonly postbtn:Locator;

constructor (page:Page){
    this.page = page;
    this.textarea=page.locator('.oxd-buzz-post-input');
    this.postbtn=page.locator('.oxd-button--main');

}
async goto (){
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz');
}
async createpost(text: string) {
    await this.textarea.fill(text);
    await this.postbtn.click();
  }
}