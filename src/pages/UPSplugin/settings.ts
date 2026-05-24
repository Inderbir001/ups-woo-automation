import { type Page, expect, Locator } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;

  //Locators
  readonly parcelPackingDropdown: Locator;
  readonly dropdownOptions: Locator;
  readonly saveChangesBtn: Locator;
  readonly printTypeLabelDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.parcelPackingDropdown = this.page.locator('#select2-woocommerce_wf_shipping_ups_packing_method-container').first();
    this.dropdownOptions = this.page.locator('.select2-container--open .select2-results__option');
    this.saveChangesBtn = this.page.getByRole('button', { name: 'save' });
    this.printTypeLabelDropdown = this.page.locator('#select2-woocommerce_wf_shipping_ups_print_label_type-container').first();
  }

  async selectTab(tabName: string) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.getByText(tabName, { exact: true }).click();
  }

  async selectLabelTypeOption(optionName: string) {
    if ((await this.printTypeLabelDropdown.textContent()) !== optionName) {
      await this.printTypeLabelDropdown.click();
      const option = this.dropdownOptions.filter({ hasText: optionName });
      await option.first().click();
      await this.saveChangesBtn.click();
    }
  }
  async selectParcelPackingOption(optionName: string) {
    if ((await this.parcelPackingDropdown.textContent()) !== optionName) {
      await this.parcelPackingDropdown.click();
      const option = this.dropdownOptions.filter({ hasText: optionName });
      await option.first().click();
      await this.saveChangesBtn.click();
    }
  }
}
