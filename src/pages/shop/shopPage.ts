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
  readonly logOutLink: Locator;
  readonly shippingMethod: Locator;
  readonly placeOrder: Locator;
  readonly getOrderNumber: Locator;
  readonly quantityInCart: Locator;
  readonly updateCart: Locator;

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
    this.logOutLink = this.page.getByRole('link', { name: 'log out' });
    this.shippingMethod = this.page.locator('#shipping_method');
    this.placeOrder = this.page.locator('#place_order');
    this.getOrderNumber = this.page.getByText('Order number:').locator('strong');
    this.quantityInCart = this.page.locator('#quantity_69a42636dd026');
    this.updateCart = this.page.getByRole('button', { name: 'Update cart' });
  }

  async clearCartIfNotEmpty() {
    // await page.goto(`${process.env.site_url}/classic-cart`);

    const cartItems = this.page.locator('tr.woocommerce-cart-form__cart-item');

    const count = await cartItems.count();

    if (count > 0) {
      console.log(`Cart has ${count} items. Removing all...`);

      while ((await cartItems.count()) > 0) {
        await cartItems.first().locator('a.remove').click();

        // Wait for cart to update after removal
        await this.page.waitForLoadState('networkidle');
      }

      // Optional: verify cart empty message
      // await expect(this.page.locator('.cart-empty')).toBeVisible();
    } else {
      console.log('Cart is already empty.');
    }
    // await this.page.getByRole('button', { name: 'Return to shop' }).click();
  }

  async fillQuantityInCart(qty: string) {
    this.quantityInCart.fill(qty);
  }

  async cickOnPlaceOrder() {
    await this.placeOrder.click();
    await this.page.waitForLoadState();
    const orderId = await this.getOrderNumber.innerText();
    console.log(`Order Id = `, orderId);
  }

  async selectShippingMethod(serviceName: string) {
    await expect(this.shippingMethod).toContainText(serviceName);
    await this.page.getByRole('radio', { name: serviceName }).first().check();
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
    await this.page.goto(`/shop/`);
  }
}
