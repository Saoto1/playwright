import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/auth/seamlessLogin');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/client/#/pim/employees/38/profile');
  await page.getByRole('link', { name: 'HR Administration' }).click();
  await page.getByText('Job oxd_menu_down').click();
  await page.getByText('Organization oxd_menu_down').click();
  await page.getByRole('link', { name: 'Locations' }).click();
  await page.getByRole('link', { name: 'Employee Management' }).click();
  await page.getByRole('link', { name: 'Reports and Analytics' }).click();
  await page.getByRole('link', { name: 'RosterNew' }).click();
});