import { test as base } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/loginPage';
import { HomePage } from '../../src/pages/wooCommerceAdmin/homePage';
import { SettingsPage } from '../../src/pages/UPSplugin/settings';
import { ShopPage } from '../../src/pages/shop/shopPage';
import { BasePage } from '../../src/pages/basePage';
import { OrdersPage } from '../../src/pages/wooCommerceAdmin/ordersPage';
import { StatusPage } from '../../src/pages/wooCommerceAdmin/status';

type Pages = {
  loginPage: LoginPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
  shopPage: ShopPage;
  basePage: BasePage;
  ordersPage: OrdersPage;
  statusPage: StatusPage;
  
};

type MyFixtures = {
  pages: Pages;
};

export const test = base.extend<MyFixtures>({
  pages: async ({ page }, use) => {
    const pages: Pages = {
      loginPage: new LoginPage(page),
      homePage: new HomePage(page),
      settingsPage: new SettingsPage(page),
      shopPage: new ShopPage(page),
      basePage: new BasePage(page),
      ordersPage: new OrdersPage(page),
      statusPage: new StatusPage(page),
    };

    await use(pages);
  },
});

export { expect } from '@playwright/test';
export { upsServiceCodes } from '../testData/upsServiceCodes';
