import { test, expect } from '../fixtures/fixtures';

test('Change Packaging type to "Default: Pack items individually"', async ({ page, homePage, settingsPage }) => {
  await homePage.goto();
  await homePage.selectAdminMenu('UPS Shipping', 'Settings');
  await settingsPage.selectTab('Packaging');
  await settingsPage.selectParcelPackingOption('Default: Pack items individually');
  await expect(settingsPage.parcelPackingDropdown).toContainText('Default: Pack items individually');
});

test('Order Product from Checkout', async ({ page, shopPage }) => {
  await page.goto(`/classic-cart`);
  await shopPage.clearCartIfNotEmpty();
  await shopPage.goto();
  await page.waitForLoadState('domcontentloaded');
  await shopPage.search.fill('product simple 1');
  await page.keyboard.press('Enter');
  await shopPage.addToCart.click();
  await page.goto(`/classic-checkout`);
  await shopPage.fillCheckoutDetails('United States (US)', '1100 Wyoming', 'St. Louis', 'Missouri', '63119');
  await shopPage.selectShippingMethod('UPS Next Day Air®');
  await shopPage.cickOnPlaceOrder();
});

test('Go To WooCommerce > Orders > Label Generation', async ({ page, homePage, settingsPage }) => {
  await homePage.goto();
  await homePage.selectAdminMenu('WooCommerce', 'Orders');
  await page.waitForTimeout(10000);
});
