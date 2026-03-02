import { test as base } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/loginPage';
import { HomePage } from '../../src/pages/wooCommerceAdmin/homePage';
import { SettingsPage } from '../../src/pages/UPSplugin/settings';
import { ShopPage } from '../../src/pages/shop/shopPage';
import { BasePage } from '../../src/pages/basePage';
import { OrdersPage } from '../../src/pages/wooCommerceAdmin/ordersPage';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
  shopPage: ShopPage;
  basePage: BasePage;
  ordersPage: OrdersPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },

  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  ordersPage: async ({ page }, use) => {
    await use(new OrdersPage(page));
  },
});

export { expect } from '@playwright/test';
