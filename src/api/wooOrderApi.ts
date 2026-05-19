import { request } from '@playwright/test';
const { faker } = require('@faker-js/faker');

export async function createWooOrder(productId: number = 1946, quantity: number = 1) {
  const apiContext = await request.newContext({
    baseURL: process.env.site_url,
  });

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const address = '43 River Ave';
  const city = 'Island Heights';
  const state = 'NJ';
  const postCode = '08732';
  const country = 'US';
  const email = faker.internet.email();

  const payload = {
    status: 'processing',

    shipping: {
      first_name: firstName,
      last_name: lastName,
      address_1: address,
      city: city,
      state: state,
      postcode: postCode,
      country: country,
    },

    billing: {
      first_name: firstName,
      last_name: lastName,
      address_1: address,
      city: city,
      state: state,
      postcode: postCode,
      country: country,
      email: email,
      phone: '1234567890',
    },

    line_items: [
      {
        product_id: productId,
        quantity: quantity,
      },
    ],

    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: '10.00',
      },
    ],
  };

  const response = await apiContext.post(`/wp-json/wc/v3/orders?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`, {
    data: payload,
  });

  const body = await response.json();
  console.log(`Order no. ${body.id} created successfully 👍`);

  if (!response.ok()) {
    throw new Error(JSON.stringify(body, null, 2));
  }

  return body;
}
