import { type Page, expect, Locator } from '@playwright/test';

export class OrdersPage {
  readonly page: Page;

  //Locators
  readonly allOrders: Locator;
  readonly orderNumber: Locator;
  readonly generatePackagesBtn: Locator;
  readonly calculateRatesBtn: Locator;
  readonly selectServiceeInWSSOrdersPage: Locator;
  readonly editOrderHeading: Locator;
  readonly verifyPackages: Locator;
  readonly confirmShipmentBtn: Locator;
  readonly printLabelInWSSOrdersPage: Locator;
  readonly selectOptionReturnService: Locator;
  readonly returnLabelBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.allOrders = this.page.locator('#the-list');
    this.orderNumber = this.page.locator('a.order-view');
    this.generatePackagesBtn = this.page.locator('.button.ups_generate_packages');
    this.calculateRatesBtn = this.page.locator('.button.wf_ups_generate_packages_rates');
    this.selectServiceeInWSSOrdersPage = this.page.locator('#wf_ups_service_select');
    this.editOrderHeading = this.page.getByText('Edit order');
    this.verifyPackages = this.page.getByText('Step 2: Initiate your shipment.');
    this.confirmShipmentBtn = this.page.locator('.button.ups_create_shipment');
    this.printLabelInWSSOrdersPage = this.page.getByRole('link', { name: 'Print Label' });
    this.returnLabelBtn = this.page.getByRole('link', { name: 'Generate Return label' });
    this.selectOptionReturnService = this.page.locator('#return_label_service');
  }

  async clickOnReturnLabelBtn(){
  await expect(this.returnLabelBtn).toBeVisible();
    await this.returnLabelBtn.click();  
  }

  async clickAndCheckVerifyPrintLabel() {
    const [download] = await Promise.all([this.page.waitForEvent('download'), this.printLabelInWSSOrdersPage.click()]);
    const fileName = download.suggestedFilename();
    console.log('Label Downloaded: ', fileName);
    expect(fileName).toMatch(/^UPS-ShippingLabel-Label.*\.gif$/);
  }

  async chooseServiceInWssOrdersPage(serviceName: string) {
    const serviceRow = this.page.locator('#wf_ups_service_select tr').filter({ hasText: serviceName });
    await serviceRow.locator('input[type="radio"]').first().check();
  }

  async selectOrderInWSSOrdersPage(orderId: string) {
    await this.page.waitForLoadState();
    await expect(this.allOrders).toBeVisible();
    const orderRow = this.page.locator(`tr#order-${orderId}`);
    await expect(orderRow).toBeVisible({ timeout: 15000 });
    const orderLink = orderRow.locator('a.order-view');
    await orderLink.click();
    await expect(this.page.getByRole('heading', { name: 'Edit order' })).toBeVisible();
  }

  async goto() {
    await this.page.goto(`/wp-admin/admin.php?page=wc-orders`);
    await this.page.waitForLoadState('load');
  }
}
