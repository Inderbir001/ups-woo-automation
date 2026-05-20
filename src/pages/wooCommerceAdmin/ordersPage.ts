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
  readonly printReturnLabelInWSSOrdersPage: Locator;
  readonly numofPackages: Locator;
  readonly warningTextVoidShipment: Locator;
  readonly voidShipmentInWSSOrdersPage: Locator;
  readonly returnServiceSelect: Locator;
  readonly generateReturnLabel: Locator;
  readonly clientSideResetBtn: Locator;
  readonly voidShipmentSuccessMessage: Locator;

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
    this.numofPackages = this.page.locator('#wf_ups_package_list tbody tr');
    this.confirmShipmentBtn = this.page.locator('.button.ups_create_shipment');
    this.printLabelInWSSOrdersPage = this.page.getByRole('link', { name: 'Print Label' });
    this.printReturnLabelInWSSOrdersPage = this.page.getByRole('link', { name: 'Print Return Label' });
    this.voidShipmentInWSSOrdersPage = this.page.getByRole('link', { name: 'Void Shipment' });
    this.clientSideResetBtn = this.page.getByRole('link', { name: 'Client Side Reset' });
    this.warningTextVoidShipment = this.page.getByText(`Please note that void is not possible in 'Test' mode, as there is no real shipment is created with UPS.`);
    this.returnServiceSelect = this.page.locator('#return_label_service');
    this.generateReturnLabel = this.page.getByRole('link', { name: 'Generate Return Label' });
    this.voidShipmentSuccessMessage = this.page.getByText('UPS: Client side reset of labels and shipment completed. You can re-initiate shipment now.');
  }

  async selectReturnService(serviceName: string) {
    await this.returnServiceSelect.selectOption({ label: serviceName });
  }

  async numberOfPackagesInOrdersPage(quantityOfProduct: number) {
    const numOfPackages = (await this.numofPackages.count()) - 1;
    if (quantityOfProduct === numOfPackages) {
      console.log(`Number of packages ${numOfPackages} and is matching to the quantity of product.`);
    } else {
      console.log(`Number of packages is ${numOfPackages} ❌`);
    }
    return numOfPackages;
  }

  async clickAndCheckVerifyPrintLabel() {
    const labels = this.printLabelInWSSOrdersPage;
    const count = await labels.count();

    for (let i = 0; i < count; i++) {
      const [download] = await Promise.all([this.page.waitForEvent('download'), labels.nth(i).click()]);

      const fileName = download.suggestedFilename();

      console.log(`Label ${i + 1} Downloaded: ${fileName}`);

      expect(fileName).toMatch(/^UPS-ShippingLabel-Label.*\.gif$/);
    }
  }

  async clickAndCheckVerifyPrintReturnLabel() {
    const labels = this.printReturnLabelInWSSOrdersPage;
    const count = await labels.count();
    for (let i = 0; i < count; i++) {
      const [download] = await Promise.all([this.page.waitForEvent('download'), labels.nth(i).click()]);
      const fileName = download.suggestedFilename();
      console.log(`Label ${i + 1} Downloaded: ${fileName}`);
      expect(fileName).toMatch(/^UPS-ShippingLabel-Label.*\.gif$/);
    }
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
