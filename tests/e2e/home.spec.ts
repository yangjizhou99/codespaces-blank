import { test, expect } from '@playwright/test';

test('home shows hero and quick links', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('招牌餐點')).toBeVisible();
  await expect(page.getByText('快速入口')).toBeVisible();
  await expect(page.getByRole('link', { name: /線上購物/ })).toBeVisible();
});
