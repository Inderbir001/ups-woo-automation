// import { test } from '../fixtures/fixtures';

// test('Explore UPS Shipping Labels tab', async ({ page, pages }) => {
//   test.setTimeout(60000);

//   await pages.homePage.goto();
//   await pages.basePage.selectAdminMenu('UPS Shipping', 'Settings');
//   await page.waitForLoadState('domcontentloaded');

//   // Click the Shipping Labels tab
//   await page.locator('a.ph-ups-tabs').filter({ hasText: 'Shipping Labels' }).click();
//   await page.waitForLoadState('domcontentloaded');
//   await page.screenshot({ path: 'test-results/shipping-labels-tab.png', fullPage: true });

//   // All selects on this tab
//   console.log('\n=== All SELECT elements ===');
//   const selects = page.locator('select');
//   const selectCount = await selects.count();
//   for (let i = 0; i < selectCount; i++) {
//     const id = await selects.nth(i).getAttribute('id');
//     const value = await selects.nth(i).inputValue().catch(() => '');
//     const options = await selects.nth(i).locator('option').allTextContents();
//     console.log(`  [${id}] = "${value}" | options: ${options.join(' | ')}`);
//   }

//   // All radios and checkboxes
//   console.log('\n=== All RADIO / CHECKBOX elements ===');
//   const inputs = page.locator('input[type="radio"], input[type="checkbox"]');
//   const inputCount = await inputs.count();
//   for (let i = 0; i < inputCount; i++) {
//     const id = await inputs.nth(i).getAttribute('id');
//     const name = await inputs.nth(i).getAttribute('name');
//     const value = await inputs.nth(i).getAttribute('value');
//     const checked = await inputs.nth(i).isChecked();
//     console.log(`  [${id}] name=${name} value=${value} checked=${checked}`);
//   }

//   // All visible labels (row headings)
//   console.log('\n=== All table row headings ===');
//   const labels = page.locator('table.form-table th');
//   const labelCount = await labels.count();
//   for (let i = 0; i < labelCount; i++) {
//     console.log(`  ${await labels.nth(i).innerText()}`);
//   }
// });
