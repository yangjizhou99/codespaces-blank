'use client';
import { useSearchParams } from 'next/navigation';

export default function CardPlaceholderPage() {
  const sp = useSearchParams();
  const orderId = sp.get('orderId') || '';
  return (
    <main className="py-6">
      <h1 className="text-2xl font-bold mb-3">信用卡付款（占位）/ Card Payment (Placeholder)</h1>
      <p className="text-slate-700">
        訂單編號 / Order ID：<span className="font-semibold">{orderId}</span>
      </p>
      <p className="text-slate-600 mt-2">
        目前尚未開通信用卡支付。第 6 步將接入 Stripe 測試環境。
      </p>
      <a className="underline mt-4 inline-block" href="/checkout">返回結帳 / Back to Checkout</a>
    </main>
  );
}
