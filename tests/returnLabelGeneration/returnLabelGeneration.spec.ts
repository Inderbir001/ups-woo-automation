import { OrdersPage } from '../../src/pages/wooCommerceAdmin/ordersPage';
import { StatusPage } from '../../src/pages/wooCommerceAdmin/status';
import { test, expect } from '../fixtures/fixtures';

test.describe.serial('Label Flow', () => {
  let orderId: string;
  let serviceName = 'UPS Next Day Air®';

  test('Change Packaging type to "Default: Pack items individually"', async ({ page, homePage, settingsPage, basePage }) => {
    await homePage.goto();
    await basePage.selectAdminMenu('UPS Shipping', 'Settings');
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
    await shopPage.fillCheckoutDetails('United States (US)', '2301 Airport Drive', 'Grand Forks', 'North Dakota', '58203');
    await shopPage.selectShippingMethod(serviceName);
    orderId = await shopPage.cickOnPlaceOrder();
  });

  test.skip('Verify Rates Log', async ({ page, statusPage }) => {
    await statusPage.goto();
    await statusPage.logs.click();
    await page.waitForLoadState();
  });

  test('Go To WooCommerce > Orders > Label Generation', async ({ page, basePage, ordersPage }) => {
    test.setTimeout(0);
    await ordersPage.goto();
    await ordersPage.selectOrderInWSSOrdersPage(orderId);
    await expect(ordersPage.generatePackagesBtn).toBeVisible();
    await ordersPage.generatePackagesBtn.click();
    await expect(ordersPage.calculateRatesBtn).toBeVisible();
    await ordersPage.calculateRatesBtn.click();
    await expect(ordersPage.verifyPackages).toBeVisible();
    await ordersPage.chooseServiceInWssOrdersPage(serviceName);
    await expect(ordersPage.confirmShipmentBtn).toBeVisible();
    await ordersPage.confirmShipmentBtn.click();
    await page.waitForLoadState();
    await page.goBack();
    await page.waitForLoadState('load');
    await expect(ordersPage.printLabelInWSSOrdersPage).toBeVisible();
    await ordersPage.clickAndCheckVerifyPrintLabel();
    await ordersPage.selectOptionReturnService.selectOption('UPS® Ground');
    await ordersPage.clickOnReturnLabelBtn();
  });
});
