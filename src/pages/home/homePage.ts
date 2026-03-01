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

  async selectAdminMenu(mainMenu: string, subMenu?: string) {
    const adminMenu = this.page.locator('#adminmenu');
    const mainMenuItem = adminMenu.locator('li').filter({ has: this.page.getByRole('link', { name: mainMenu, exact: true }) });
    const mainLink = mainMenuItem.getByRole('link', { name: mainMenu, exact: true });
    await mainLink.click();
    if (subMenu) {
      const subLink = mainMenuItem.getByRole('link', { name: new RegExp(`^${subMenu}`) });
      await subLink.click();
    }
  }

  async goto() {
    await this.page.goto(`/wp-admin/`);
    await this.page.waitForLoadState('load');
  }
}
