import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/auth/seamlessLogin');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/client/#/pim/employees/38/profile');
  await page.locator('#sidebar-profile-picture a').filter({ hasText: 'ohrm_settings' }).click();
  await page.getByRole('link', { name: 'My Settings' }).click();
  await page.getByRole('textbox', { name: 'Enter Current Password' }).click();
  await page.locator('a').filter({ hasText: 'ohrm_settings' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByText('Ok').click();
});