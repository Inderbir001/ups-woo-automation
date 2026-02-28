import { type Page, expect, Locator } from '@playwright/test';

export class ShopPage {
  readonly page: Page;

  //Locators
  readonly search: Locator;
  readonly addToCart: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.search = this.page.locator('#woocommerce-product-search-field-0');
    this.addToCart = this.page.locator('form.cart').getByRole('button', { name: 'Add to cart' }).first();
  }

  async goto() {
    await this.page.goto(`${process.env.site_url}/shop/`);
  }
}
