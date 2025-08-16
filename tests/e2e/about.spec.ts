import { test, expect } from '@playwright/test';

test('about page shows key sections and team', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: /關於我們/i })).toBeVisible();
  await expect(page.getByText(/品牌故事/i)).toBeVisible();
  await expect(page.getByText(/Our Team|團隊介紹/i)).toBeVisible();
  await expect(page.getByText('Aiko')).toBeVisible();
});
