import { test as base } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/loginPage';
import { HomePage } from '../../src/pages/home/homePage';
import { SettingsPage } from '../../src/pages/settings/settings';
import { ShopPage } from '../../src/pages/shop/shopPage';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
  shopPage: ShopPage;
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
});

export { expect } from '@playwright/test';
