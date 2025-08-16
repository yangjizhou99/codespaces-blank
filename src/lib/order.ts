import type { CartItem } from '../types/cart';
import type { OrderDraft, PaymentMethod } from '../types/order';

export const ORDER_LS_KEY = 'kodomo.order.last.v1';

export function genOrderId() {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `K${t}-${r}`.toUpperCase();
}

export function calcSubtotal(items: CartItem[]) {
  return items.reduce((s, it) => s + it.price * it.qty, 0);
}

export function makeOrderDraft(items: CartItem[], customer: OrderDraft['customer'], method: PaymentMethod): OrderDraft {
  return {
    id: genOrderId(),
    items: structuredClone(items),
    subtotal: calcSubtotal(items),
    customer,
    method,
    createdAt: Date.now()
  };
}

export function saveLastOrder(order: OrderDraft) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORDER_LS_KEY, JSON.stringify(order));
}

export function loadLastOrder(): OrderDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ORDER_LS_KEY);
    return raw ? JSON.parse(raw) as OrderDraft : null;
  } catch { return null; }
}
