import { test, expect } from '/home/inderbir-singh/Documents/ups-woo-automation/tests/fixtures.ts';

test('has title', async ({ page, homePage, settingsPage }) => {
  await homePage.goto();
  await homePage.UPSplugin.click();
  await homePage.settingsInUPSplugin.click();
  await page.waitForLoadState('domcontentloaded');
  await settingsPage.selectTab('Packaging');
  await settingsPage.parcelPackingDropdown.click();
  await settingsPage.selectParcelPackingOption('Default: Pack items individually');
  await page.waitForTimeout(3000);
});
