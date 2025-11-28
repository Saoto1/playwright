import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/auth/login');
  await page.getByRole('button', { name: 'Login as a Different Role' }).click();
  await page.getByRole('link', { name: 'Administrator', exact: true }).click();
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/client/#/dashboard');
  await page.getByRole('link', { name: 'oxd_home_menu' }).click();
  await page.getByText('Headcount by Location').click();
  await page.getByText('Time At Work').click();
  await page.getByText('Employees on Leave Today').click();
  await page.getByText('ohrm_thin_bolt Quick Access').click();
});