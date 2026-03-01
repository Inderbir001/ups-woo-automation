import { type Page, expect, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ShopPage {
  readonly page: Page;

  //Locators
  readonly search: Locator;
  readonly addToCart: Locator;
  readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly countryOrRegion: Locator;
  readonly streetAddress: Locator;
  readonly apartmentNumber: Locator;
  readonly townOrCity: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phoneNumber: Locator;
  readonly countryOrRegionInputField: Locator;
  readonly stateInputFiled: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.search = this.page.locator('#woocommerce-product-search-field-0');
    this.addToCart = this.page.locator('form.cart').getByRole('button', { name: 'Add to cart' }).first();
    this.email = this.page.locator('#billing_email');
    this.firstName = this.page.locator('#billing_first_name');
    this.lastName = this.page.locator('#billing_last_name');
    this.countryOrRegion = this.page.locator('#select2-billing_country-container');
    this.countryOrRegionInputField = this.page.locator('.select2-search__field');
    this.streetAddress = this.page.locator('#billing_address_1');
    this.apartmentNumber = this.page.locator('#billing_address_2');
    this.townOrCity = this.page.locator('#billing_city');
    this.state = this.page.locator('#select2-billing_state-container');
    this.stateInputFiled = this.page.locator('.select2-search__field');
    this.zipCode = this.page.locator('#billing_postcode');
    this.phoneNumber = this.page.locator('#billing_phone');
  }

  async fillCheckoutDetails(country: string, street: string, town: string, state: string, zip: any) {
    await this.email.fill(`${faker.internet.email()}`);
    await this.firstName.fill(`${faker.person.firstName()}`);
    await this.lastName.fill(`${faker.person.lastName()}`);
    await this.countryOrRegion.click();
    await this.countryOrRegionInputField.fill(country);
    await this.page.keyboard.press('Enter');
    await this.streetAddress.fill(street);
    await this.townOrCity.fill(town);
    await this.state.click();
    await this.stateInputFiled.fill(state);
    await this.page.keyboard.press('Enter');
    await this.zipCode.fill(zip);
    await this.phoneNumber.fill(`${faker.phone.number({ style: 'international' })}`);
  }

  async goto() {
    await this.page.goto(`${process.env.site_url}/shop/`);
  }
}
