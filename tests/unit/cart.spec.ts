import { describe, it, expect } from 'vitest';
import { clampQty, mergeItems, subtotal } from '../../src/lib/cart';

describe('cart utils', () => {
  it('clamps qty to [1,99]', () => {
    expect(clampQty(0)).toBe(1);
    expect(clampQty(1)).toBe(1);
    expect(clampQty(150)).toBe(99);
  });

  it('merges same id items by summing qty', () => {
    const merged = mergeItems([
      { id: 'a', nameCn: 'A', nameEn: 'A', price: 10, qty: 1 },
      { id: 'a', nameCn: 'A', nameEn: 'A', price: 10, qty: 2 },
      { id: 'b', nameCn: 'B', nameEn: 'B', price: 5, qty: 1 }
    ]);
    expect(merged.find(i => i.id === 'a')?.qty).toBe(3);
    expect(merged.length).toBe(2);
  });

  it('subtotal sums price*qty', () => {
    const sum = subtotal([
      { id: 'a', nameCn: 'A', nameEn: 'A', price: 10, qty: 3 },
      { id: 'b', nameCn: 'B', nameEn: 'B', price: 5, qty: 1 }
    ]);
    expect(sum).toBe(35);
  });
});
