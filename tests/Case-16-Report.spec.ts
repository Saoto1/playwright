import { test, expect } from '@playwright/test';

test('Report Test', async ({ page }) => {
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/');
  await page.getByRole('button', { name: 'Login as a Different Role' }).click();
  await page.getByRole('link', { name: 'Administrator', exact: true }).click();
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.getByRole('link', { name: 'Employee Management' }).click();
  
  await page.locator('.table-cell-link').first().waitFor({
    state: 'visible',
    timeout: 10000
  });
  const summary = await page.locator('.summary').innerText();
  console.log('Summary: ', summary);

  let indiceDelEspacio = summary.lastIndexOf(" ");
  let quantity = summary.slice(indiceDelEspacio + 1);
  console.log('Cantidad: ',quantity);


  await page.getByRole('link', { name: 'Reports and Analytics' }).click();
  await page.getByText('View All').first().click();
  await page.locator('[data-test="reportItem262"]').click();
  await page.locator('.report-results-pagination-total').waitFor({ state: 'visible' });
  const records = await page.locator('.report-results-pagination-total').innerText();
  console.log('Records Found: ',records);

  const match = records.match(/\((\d+)\)/);
  const total = match ? match[1] : null;
  console.log('Total: ', total);

  expect(quantity).toContain(total);

});