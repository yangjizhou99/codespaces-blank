import { test, expect } from '@playwright/test';

test('add to cart from menu and edit in cart page', async ({ page }) => {
  // 從菜單加入
  await page.goto('http://localhost:3000/menu');
  await page.getByTestId('tab-飯類').click();
  // 點擊「咖哩飯」卡片上的加入購物車
  await page.getByTestId('add-curry-rice').click();

  // 前往購物車
  await page.goto('http://localhost:3000/cart');
  await expect(page.getByText(/咖哩飯/)).toBeVisible();
  await expect(page.locator('aside').getByText(/^NT\$ /)).toBeVisible();

  // 調整數量
  await page.getByRole('button', { name: 'inc' }).click();
  const qtyInput = page.locator('input').first();
  await expect(qtyInput).toHaveValue('2');

  // 刪除
  await page.getByText(/刪除/).click();
  await expect(page.getByText(/購物車是空的/)).toBeVisible();
});
