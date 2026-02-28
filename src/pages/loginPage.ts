import { type Page, expect, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  //Locators
  readonly userName: Locator;
  readonly userPass: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.userName = this.page.locator("#user_login");
    this.userPass = this.page.locator("#user_pass");
    this.loginBtn = this.page.getByRole("button", { name: "Log In" });
    
  }
}
