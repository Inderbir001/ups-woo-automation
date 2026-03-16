import { Locator, expect, type Page } from '@playwright/test';
export class StatusPage {
  readonly page: Page;

  //Locators
  readonly logs: Locator;
  readonly logsTable: Locator;
  readonly allCheckbox: Locator;
  readonly source: Locator;
  readonly dateCreated: Locator;
  readonly dateModified: Locator;
  readonly fileSize: Locator;
  readonly row: Locator;
  readonly table: Locator;
  constructor(page: Page) {
    this.page = page;

    //Locators
    this.logs = this.page.getByRole('link', { name: 'Logs' });
    this.logsTable = this.page.getByRole('table');
    this.table = page.locator('table.wp-list-table tbody#the-list');
    this.allCheckbox = this.page.locator('#cb-select-all-1');
    this.source = this.page.locator('#source');
    this.dateCreated = this.page.locator('#created');
    this.dateModified = this.page.locator('#modified');
    this.fileSize = this.page.locator('#size');
    this.row = this.page.getByRole('row');
  }

  //Methods

  async expectTableHeadersToBePresent() {
    await expect(this.allCheckbox).toBeVisible();
    await expect(this.source).toBeVisible();
    await expect(this.dateCreated).toBeVisible();
    await expect(this.dateModified).toBeVisible();
    await expect(this.fileSize).toBeVisible();
  }
  async getCellValue(row: number, col: number): Promise<string> {
    const cell = this.table
      .locator('tr')
      .nth(row - 1)
      .locator('th, td')
      .nth(col - 1);

    return (await cell.innerText()).trim();
  }

  async expectCellValue(row: number, col: number, expected: string) {
    const cell = this.table
      .locator('tr')
      .nth(row - 1)
      .locator('th, td')
      .nth(col - 1);

    await expect(cell).toHaveText(expected);
  }

  async clickCell(row: number, col: number) {
    await this.table
      .locator('tr')
      .nth(row - 1)
      .locator('th, td')
      .nth(col - 1)
      .click();
  }

  async goto() {
    await this.page.goto('/wp-admin/admin.php?page=wc-status');
    await this.page.waitForLoadState('load');
  }
}
