import { type Page, expect, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  //Locators
  readonly mainAdminMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.mainAdminMenu = this.page.locator('#adminmenu').locator('li');
  }

  async selectAdminMenu(mainMenu: string, subMenu?: string) {
    const mainMenuItem = this.mainAdminMenu.filter({ has: this.page.getByRole('link', { name: mainMenu, exact: true }) });
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
