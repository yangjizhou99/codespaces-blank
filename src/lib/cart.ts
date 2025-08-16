import type { CartItem, CartState } from '../types/cart';

export const LS_KEY = 'kodomo.cart.v1';
export const QTY_MIN = 1;
export const QTY_MAX = 99;

export function clampQty(q: number) {
  return Math.max(QTY_MIN, Math.min(QTY_MAX, Math.floor(q)));
}

export function mergeItems(items: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  for (const it of items) {
    const prev = map.get(it.id);
    if (!prev) map.set(it.id, { ...it, qty: clampQty(it.qty) });
    else map.set(it.id, { ...prev, qty: clampQty(prev.qty + it.qty) });
  }
  return Array.from(map.values());
}

export function subtotal(items: CartItem[]) {
  return items.reduce((acc, it) => acc + it.price * it.qty, 0);
}

export function loadFromStorage(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { items: [] };
    const data = JSON.parse(raw);
    if (!Array.isArray(data.items)) return { items: [] };
    const items: CartItem[] = data.items
      .map((x: any) => ({
        id: String(x.id),
        nameCn: String(x.nameCn),
        nameEn: String(x.nameEn ?? ''),
        price: Number(x.price),
        img: typeof x.img === 'string' ? x.img : undefined,
        qty: clampQty(Number(x.qty) || 1)
      }))
      .filter((x: CartItem) => Number.isFinite(x.price) && x.qty >= 1);
    return { items };
  } catch {
    return { items: [] };
  }
}

export function saveToStorage(state: CartState) {
  if (typeof window === 'undefined') return;
  const safe = { items: state.items.map(i => ({ ...i, qty: clampQty(i.qty) })) };
  localStorage.setItem(LS_KEY, JSON.stringify(safe));
}
