import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.slow();
  let horaPantallaA = '';
  await page.goto('https://orangehrm-demo-7x.orangehrmlive.com/auth/login');
  await page.getByRole('button', { name: 'Login as a Different Role' }).click();
  await page.getByRole('link', { name: 'ESS User' }).click();
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.getByRole('link', { name: 'Attendance' }).click();
  await page.getByRole('button', { name: 'In' }).click();

  // Esperar a que la hora aparezca
  await page.locator('#myPunchInOutTimeDiv .myPunchInOutDetailsValue')
    .waitFor({ state: 'visible' });

  await page.getByRole('button', { name: 'Out' }).click();

 horaPantallaA = await page
    .locator('#myPunchInOutTimeDiv .myPunchInOutDetailsValue')
    .evaluate(el => (el?.childNodes[0]?.textContent ?? '').trim());


  await page.getByRole('button', { name: 'In' }).waitFor({ 
    state: 'visible',
    timeout: 10000
  });

  // Ahora sí hacer clic en My Attendance Sheet
  const attendanceSheet = page.getByRole('link', { name: 'My Attendance Sheet' });

  await attendanceSheet.waitFor({ state: 'visible' });
  await attendanceSheet.scrollIntoViewIfNeeded();
  await attendanceSheet.click();

  // Obtener el texto de la pantalla B
  const textoPantallaB = await page.locator('.last-punched-out-time-time').innerText();

  const horaPantallaA_12h = to12h(horaPantallaA);
  expect(textoPantallaB).toContain(horaPantallaA_12h);

});

function to12h(time24: string) {
  const [hh, mm] = time24.split(':');
  let h = parseInt(hh, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${mm} ${ampm}`;
}