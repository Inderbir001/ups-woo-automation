import { type Page, expect, Locator } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;

  //Locators
  readonly parcelPackingDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.parcelPackingDropdown = this.page.locator('#select2-woocommerce_wf_shipping_ups_packing_method-container');
  }

  async selectTab(tabName: string) {
    await this.page.getByText(tabName, { exact: true }).click();
  }

  async selectParcelPackingOption(optionName: string) {
    await this.parcelPackingDropdown.click();
    const option = this.page.locator('.select2-container--open .select2-results__option').filter({ hasText: optionName });
    await expect(option).toBeVisible();
    await option.first().click();
  }
}
