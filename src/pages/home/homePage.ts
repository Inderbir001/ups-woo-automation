import { type Page, expect, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  //Locators
  readonly UPSplugin: Locator;
  readonly settingsInUPSplugin: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.UPSplugin = this.page.locator('#toplevel_page_ph_ups_registration');
    this.settingsInUPSplugin = this.page.locator('a[href="admin.php?page=ph_ups_plugin_settings"]');
  }

  async goto() {
    this.page.goto(`${process.env.site_url!}/wp-admin/`);
    this.page.waitForLoadState('load');
  }
}
