import { test as base } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { HomePage } from '../src/pages/homePage';
import { SettingsPage } from '../src/pages/settings';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
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
});

export { expect } from '@playwright/test';
