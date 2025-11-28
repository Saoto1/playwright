import { test, expect } from '@playwright/test';

test('Days discount', async ({ page }) => {
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/auth/login');
  await page.getByRole('button', { name: 'Login as a Different Role' }).click();
  await page.getByRole('link', { name: 'ESS User' }).click();
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.getByRole('link', { name: 'Leave' }).click();
  await page.getByRole('link', { name: 'My Leave Usage' }).click();


  await page.getByRole('cell', { name: 'Usage of Entitlements' }).waitFor({
    state: 'visible',
    timeout: 10000
  });

  const rows = await page.$$eval(
    'table.highlight.list-table.bordered.compact-table.report-results tbody tr',
    trs => {
      return trs.map(tr => {
        const cells = Array.from(tr.querySelectorAll('td'))
          .filter(td => td.offsetParent !== null)
          .map(td => td.innerText.trim());
        return cells;
      });
    }
  );

  for (const row of rows) {
      const entitlements = parseFloat(row[3]);
      const scheduled = parseFloat(row[5]);
      const netBalance = parseFloat(row[7]);

      const expectedBalance = entitlements - scheduled;

      console.log({
          entitlements,
          scheduled,
          netBalance,
          expectedBalance
      });

      expect(netBalance).toBeCloseTo(expectedBalance, 2);
  }

});
