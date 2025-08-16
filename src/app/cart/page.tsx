'use client';
import Link from 'next/link';
import { useCart } from '../../components/CartProvider';
import { clampQty } from '../../lib/cart';

export default function CartPage() {
  const { state, setQty, remove, clear, total } = useCart();
  const items = state.items;

  return (
    <main className="py-6">
      <h1 className="text-2xl font-bold mb-4">購物車 <span className="text-slate-500">Cart</span></h1>

      {items.length === 0 ? (
        <div className="text-slate-600">
          購物車是空的。<Link className="underline" href="/menu">去逛逛菜單 / Browse Menu →</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map(it => (
              <div key={it.id} className="border rounded-xl p-3 flex gap-3 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.img || '/img/placeholder.svg'} alt={it.nameEn} className="w-20 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{it.nameCn} <span className="text-slate-500 text-sm">{it.nameEn}</span></div>
                  <div className="text-rose-600 font-semibold">NT$ {it.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button aria-label="dec" className="px-2 border rounded" onClick={() => setQty(it.id, clampQty(it.qty - 1))}>-</button>
                  <input
                    className="w-12 border rounded text-center"
                    value={it.qty}
                    onChange={(e) => setQty(it.id, clampQty(Number(e.target.value) || 1))}
                  />
                  <button aria-label="inc" className="px-2 border rounded" onClick={() => setQty(it.id, clampQty(it.qty + 1))}>+</button>
                </div>
                <button className="ml-2 text-sm text-slate-600 underline" onClick={() => remove(it.id)}>刪除 / Remove</button>
              </div>
            ))}
            <button className="text-sm text-slate-600 underline" onClick={() => clear()}>清空購物車 / Clear</button>
          </div>

          <aside className="border rounded-xl p-4 h-fit">
            <div className="text-lg font-semibold mb-2">合計 / Total</div>
            <div className="text-2xl font-bold text-rose-700">NT$ {total}</div>
            <div className="text-xs text-slate-500 mt-1">* 僅為預估價格，稅費與折扣於結帳時顯示。</div>
<a href="/checkout" className="block mt-4 rounded-lg bg-slate-900 text-white text-center py-2">
  前往結帳 / Go to Checkout
</a>
          </aside>
        </div>
      )}
    </main>
  );
}
