import { Locator, expect, type Page } from '@playwright/test';

export class StatusPage {
  readonly page: Page;

  //Locators
  readonly logs;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.logs = this.page.getByRole('link', { name: 'Logs' });
  }
  //Methods

  async goto() {
    await this.page.goto('/wp-admin/admin.php?page=wc-status');
    await this.page.waitForLoadState('load');
  }
}
