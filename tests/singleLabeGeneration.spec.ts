import { test, expect } from './fixtures.ts';

test('Single Label Generation', async ({ page, homePage, settingsPage }) => {
  await homePage.goto();
  await homePage.UPSplugin.click();
  await homePage.settingsInUPSplugin.click();
  await settingsPage.selectTab('Packaging');
  await settingsPage.selectParcelPackingOption('Default: Pack items individually');
  await expect(settingsPage.parcelPackingDropdown).toContainText('Default: Pack items individually');
  await settingsPage.saveChangesButtonInPackaging.click();
});
