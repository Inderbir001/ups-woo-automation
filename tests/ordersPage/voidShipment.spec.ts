import { test, expect } from '../fixtures/fixtures';
import { createWooOrder } from '../../src/api/wooOrderApi';

test.describe.serial('Void Shipment', () => {
  let orderId: string;
  let serviceName = 'UPS Next Day Air®';

  test('Create order from api', async ({ page, pages }) => {
    const apiOrder = await createWooOrder();
    orderId = apiOrder.id;
    expect(apiOrder.id).toBeTruthy();
  });

  test('Go To WooCommerce > Orders > Label Generation > Void Shipment', async ({ page, pages }) => {
    test.setTimeout(120000);
    await pages.ordersPage.goto();
    await pages.ordersPage.selectOrderInWSSOrdersPage(orderId);
    await expect(pages.ordersPage.generatePackagesBtn).toBeVisible();
    await pages.ordersPage.generatePackagesBtn.click();
    await expect(pages.ordersPage.calculateRatesBtn).toBeVisible();
    await pages.ordersPage.calculateRatesBtn.click();
    await expect(pages.ordersPage.verifyPackages).toBeVisible();
    await pages.ordersPage.chooseServiceInWssOrdersPage(serviceName);
    await expect(pages.ordersPage.confirmShipmentBtn).toBeVisible();
    await pages.ordersPage.confirmShipmentBtn.click();
    await page.waitForLoadState();
    await page.goBack();
    await page.waitForLoadState('load');
    await expect(pages.ordersPage.voidShipmentInWSSOrdersPage).toBeVisible();
    await pages.ordersPage.voidShipmentInWSSOrdersPage.click();
    await page.waitForLoadState();
    await expect(pages.ordersPage.warningTextVoidShipment).toBeVisible();
  });
});
