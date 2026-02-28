import { type Page, expect, Locator } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;

  //Locators
  readonly parcelPackingDropdown: Locator;
  readonly parcelPackingDropdownOptions: Locator;
  readonly saveChangesButtonInPackaging: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.parcelPackingDropdown = this.page.locator('#select2-woocommerce_wf_shipping_ups_packing_method-container').first();
    this.parcelPackingDropdownOptions = this.page.locator('.select2-container--open .select2-results__option');
    this.saveChangesButtonInPackaging = this.page.getByRole('button', { name: 'save' });
  }

  async selectTab(tabName: string) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.getByText(tabName, { exact: true }).click();
  }

  async selectParcelPackingOption(optionName: string) {
    await this.parcelPackingDropdown.click();
    const option = this.parcelPackingDropdownOptions.filter({ hasText: optionName });
    await option.first().click();
  }
}
