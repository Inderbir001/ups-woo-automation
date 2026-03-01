import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
  timeout: 60 * 1000,
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    storageState: 'playwright/.auth/user.json',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'google chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.site_url,
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.site_url,
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.site_url,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
