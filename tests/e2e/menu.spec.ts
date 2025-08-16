import { test, expect } from '@playwright/test';

test('menu list and filter work', async ({ page }) => {
  await page.goto('http://localhost:3001/menu');
  await expect(page.getByRole('heading', { name: /線上菜單/i })).toBeVisible();
  await expect(page.getByTestId('menu-grid')).toBeVisible();

  // Switch to "飯類" category
  await page.getByTestId('tab-飯類').click();
  await expect(page.getByRole('link', { name: /咖哩飯|牛丼/ })).toBeVisible();

  // Go to detail page
  await page.getByRole('link', { name: /咖哩飯/i }).first().click();
  await expect(page.getByRole('heading', { name: /咖哩飯/i })).toBeVisible();
});
