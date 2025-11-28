import { test, expect } from '@playwright/test';

test('Leave Test', async ({ page }) => {
  // Recording...
  test.slow();
  let dateLeave = '2025-12-11';
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/auth/login');
  await page.getByRole('button', { name: 'Login as a Different Role' }).click();
  await page.getByRole('link', { name: 'ESS User' }).click();
    await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.getByRole('link', { name: 'Leave' }).click();
  await page.getByText('PTO').click();
  await page.getByRole('textbox', { name: 'From Date*' }).click();
  await page.getByRole('textbox', { name: 'From Date*' }).fill(dateLeave);
  await page.getByRole('textbox', { name: 'To Date*' }).click();
  await page.locator('.oxd-icon').click();
  await page.getByRole('option', { name: 'Full Day' }).click();
  
  await page.getByRole('textbox', { name: 'Total Duration' }).waitFor({ 
    state: 'visible',
    timeout: 10000
  });

  const btn = page.getByRole('button', { name: 'Apply' });
  await btn.waitFor({ state: 'visible' });
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  
await page.getByRole('button', { name: 'Save' }).waitFor({
    state: 'visible',
    timeout: 10000
});

  await expect(page.locator('#searchLeaveEntitlementDiv')).toContainText(dateLeave);

});

test('Approve Test', async ({ page }) => {
  // Recording...
   test.slow();
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/auth/login');

  await page.getByRole('button', { name: 'Login as a Different Role' }).click();
  await page.getByRole('link', { name: 'Administrator', exact: true }).click();
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.getByRole('link', { name: 'Leave',  exact: true }).click();
  await page.getByRole('cell', { name: 'Fiona Grace' }).first().click();


  await page.getByRole('cell', { name: '▼ Select Action' }).getByRole('textbox').waitFor({
    state: 'visible',
    timeout: 50000
  });


  await page.locator('.chatbot-bubble').click();

  const cell = page.getByRole('cell', { name: '▼ Select Action' });
  await cell.getByRole('textbox').click();

  const ul = cell.locator('ul.select-dropdown');

  await ul.waitFor();

  const dropdownId = await ul.getAttribute('id');
  console.log("ID del dropdown:", dropdownId);

  await cell.locator(`#${dropdownId} li span`, { hasText: 'Approve' }).click();


  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#toast-container .toast-success .toast-message')).toContainText('Successfully Updated');

});
