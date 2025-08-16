'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../components/CartProvider';
import { OrderSummary } from '../../components/OrderSummary';
import { PaymentMethodRadio } from '../../components/PaymentMethod';
import { makeOrderDraft, saveLastOrder, calcSubtotal } from '../../lib/order';
import type { PaymentMethod } from '../../types/order';

export default function CheckoutPage() {
  const { state, clear } = useCart();
  const items = state.items;
  const subtotal = calcSubtotal(items);
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('instore');
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <main className="py-6">
        <h1 className="text-2xl font-bold mb-4">結帳 <span className="text-slate-500">Checkout</span></h1>
        <p className="text-slate-600">購物車為空，請先前往菜單加購。</p>
        <a className="underline" href="/menu">前往菜單 / Go to Menu →</a>
      </main>
    );
  }

  function valid() {
    if (name.trim().length < 2) return '請輸入姓名 / Please enter your name.';
    if (!/^[0-9+\-\s]{6,}$/.test(phone.trim())) return '請輸入有效電話 / Please enter a valid phone.';
    return null;
  }

  function placeOrder() {
    const v = valid();
    if (v) { setError(v); return; }
    const draft = makeOrderDraft(items, { name, phone, note }, method);
    saveLastOrder(draft);

    if (method === 'card') {
      // 信用卡未接：導向占位頁，不清空購物車
      router.push(`/checkout/card?orderId=${encodeURIComponent(draft.id)}`);
      return;
    }
    // 轉帳或到店：建立訂單 → 清空購物車 → 成功頁
    clear();
    const q = new URLSearchParams({ orderId: draft.id, method });
    router.push(`/checkout/success?${q.toString()}`);
  }

  return (
    <main className="py-6">
      <h1 className="text-2xl font-bold mb-4">結帳 <span className="text-slate-500">Checkout</span></h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-2">聯絡資訊 / Contact</h2>
            <div className="grid gap-3">
              <input
                aria-label="name"
                className="border rounded-lg px-3 py-2"
                placeholder="姓名 / Name"
                value={name} onChange={e => setName(e.target.value)}
              />
              <input
                aria-label="phone"
                className="border rounded-lg px-3 py-2"
                placeholder="電話 / Phone"
                value={phone} onChange={e => setPhone(e.target.value)}
              />
              <textarea
                aria-label="note"
                className="border rounded-lg px-3 py-2"
                placeholder="備註（可選） / Note (optional)"
                value={note} onChange={e => setNote(e.target.value)}
              />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">付款方式 / Payment</h2>
            <PaymentMethodRadio value={method} onChange={setMethod} />
          </section>

          {error && <div className="text-rose-700 text-sm">{error}</div>}

          <button
            data-testid="place-order"
            onClick={placeOrder}
            className="rounded-lg bg-slate-900 text-white px-5 py-2"
          >
            下單 / Place Order
          </button>
        </div>

        <OrderSummary items={items} subtotal={subtotal} />
      </div>
    </main>
  );
}
