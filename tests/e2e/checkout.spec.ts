import { test, expect } from '@playwright/test';

test('checkout with pay-in-store clears cart and shows order success', async ({ page }) => {
  // 1) 從菜單加購
  await page.goto('http://localhost:3000/menu');
  await page.getByTestId('tab-飯類').click();
  await page.getByTestId('add-curry-rice').click();

  // 2) 進入購物車 → 結帳
  await page.goto('http://localhost:3000/cart');
  await page.getByRole('link', { name: /結帳|Checkout/ }).click();

  // 3) 填聯絡資訊 & 選擇到店付款
  await page.getByLabel('name').fill('Taro');
  await page.getByLabel('phone').fill('0900-000-000');
  await page.getByRole('button', { name: /到店付款/i }).click(); // 或預設為到店付款

  // 4) 下單
  await page.getByTestId('place-order').click();
  await expect(page.getByText(/下單成功|Order Placed/)).toBeVisible();

  // 5) 購物車應為空
  await page.goto('http://localhost:3000/cart');
  await expect(page.getByText(/購物車是空的/)).toBeVisible();
});
