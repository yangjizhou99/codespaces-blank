'use client';
import Link from 'next/link';
import type { CartItem } from '../types/cart';

export function OrderSummary({ items, subtotal }: { items: CartItem[]; subtotal: number }) {
  return (
    <aside className="border rounded-xl p-4 h-fit">
      <div className="text-lg font-semibold mb-2">訂單摘要 / Order Summary</div>
      <div className="space-y-2 max-h-72 overflow-auto">
        {items.map(it => (
          <div key={it.id} className="flex items-center justify-between gap-3">
            <div className="text-sm">
              {it.nameCn} <span className="text-slate-500">{it.nameEn}</span>
              <span className="ml-2 text-xs text-slate-500">×{it.qty}</span>
            </div>
            <div className="text-sm">NT$ {it.price * it.qty}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t pt-3 flex items-center justify-between">
        <div className="font-medium">小計 / Subtotal</div>
        <div className="text-xl font-bold text-rose-700">NT$ {subtotal}</div>
      </div>
      <div className="text-xs text-slate-500 mt-1">* 稅費/折扣將於付款時顯示 / Tax & discounts at payment.</div>
      <Link className="block mt-3 text-sm underline text-slate-600" href="/cart">返回購物車 / Back to Cart</Link>
    </aside>
  );
}
