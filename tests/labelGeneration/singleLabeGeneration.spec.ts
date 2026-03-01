import { test, expect } from '../fixtures/fixtures';

test('Single Label Generation', async ({ page, homePage, settingsPage }) => {
  await homePage.goto();
  await homePage.UPSplugin.click();
  await homePage.settingsInUPSplugin.click();
  await settingsPage.selectTab('Packaging');
  await settingsPage.selectParcelPackingOption('Default: Pack items individually');
  await expect(settingsPage.parcelPackingDropdown).toContainText('Default: Pack items individually');
});

test('Order Product from Checkout', async ({ page, homePage, settingsPage, shopPage }) => {
  await shopPage.goto();
  await page.waitForLoadState('domcontentloaded');
  await shopPage.search.fill('product simple 1');
  await page.keyboard.press('Enter');
  await shopPage.addToCart.click();
  await page.goto(`${process.env.site_url}/classic-checkout`);
  await shopPage.fillCheckoutDetails('United States (US)', '1100 Wyoming', 'St. Louis', 'Missouri', '63119');
  await page.waitForTimeout(20000);
});
