import { test, expect } from '../fixtures/fixtures';
test.describe.serial('Label Flow', () => {
  let orderId: string;
  let serviceName = 'UPS Next Day Air®';

  test('Change Packaging type to "Default: Pack items individually"', async ({ page, homePage, settingsPage }) => {
    await homePage.goto();
    await homePage.selectAdminMenu('UPS Shipping', 'Settings');
    await settingsPage.selectTab('Packaging');
    await settingsPage.selectParcelPackingOption('Default: Pack items individually');
    await expect(settingsPage.parcelPackingDropdown).toContainText('Default: Pack items individually');
  });

  test.only('Order Product from Checkout', async ({ page, shopPage }) => {
    await page.goto(`/classic-cart`);
    await shopPage.clearCartIfNotEmpty();
    await shopPage.goto();
    await page.waitForLoadState('domcontentloaded');
    await shopPage.search.fill('product simple 1');
    await page.keyboard.press('Enter');
    await shopPage.addToCart.click();
    await page.goto(`/classic-checkout`);
    await shopPage.fillCheckoutDetails('United States (US)', '1100 Wyoming', 'St. Louis', 'Missouri', '63119');
    await shopPage.selectShippingMethod(serviceName);
    orderId = await shopPage.cickOnPlaceOrder();
  });

  test.only('Go To WooCommerce > Orders > Label Generation', async ({ page, homePage, settingsPage }) => {
    test.setTimeout(120000);
    await homePage.goto();
    await homePage.selectAdminMenu('WooCommerce', 'Orders');
    await homePage.selectOrderInWSSOrdersPage(orderId);
    await expect(homePage.generatePackagesBtn).toBeVisible();
    await homePage.generatePackagesBtn.click();
    await expect(homePage.calculateRatesBtn).toBeVisible();
    await homePage.calculateRatesBtn.click();
    await expect(homePage.verifyPackages).toBeVisible();
    await homePage.chooseServiceInWssOrdersPage(serviceName);
    await expect(homePage.confirmShipmentBtn).toBeVisible();
    await homePage.confirmShipmentBtn.click();
    await page.waitForLoadState();
    await page.goBack();
    await page.waitForLoadState('load');
    await expect(homePage.printLabelInWSSOrdersPage).toBeVisible();
    await homePage.clickAndCheckVerifyPrintLabel();
  });
});
