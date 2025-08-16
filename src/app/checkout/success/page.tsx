'use client';
import { useSearchParams } from 'next/navigation';
import { loadLastOrder } from '../../lib/order';

export default function SuccessPage() {
  const sp = useSearchParams();
  const orderId = sp.get('orderId') || '';
  const method = sp.get('method') || '';
  const last = loadLastOrder();

  return (
    <main className="py-6">
      <h1 className="text-2xl font-bold mb-3">下單成功 / Order Placed</h1>
      <div className="rounded-xl border p-4">
        <div className="text-sm text-slate-600">訂單編號 / Order ID</div>
        <div className="text-lg font-semibold">{orderId}</div>

        {method === 'transfer' && (
          <div className="mt-4">
            <div className="font-medium">付款說明（線上轉帳）/ Transfer Instructions</div>
            <ul className="list-disc pl-5 text-sm mt-1 text-slate-700">
              <li>銀行 Bank: 123 範例銀行 / Demo Bank</li>
              <li>帳號 Account: 001-234-5678</li>
              <li>戶名 Name: KODOMO CO.</li>
              <li>備註請填：訂單編號 {orderId}</li>
            </ul>
            <div className="text-xs text-slate-500 mt-2">完成轉帳後，請於到店出示轉帳證明。</div>
          </div>
        )}

        {method === 'instore' && (
          <div className="mt-4">
            <div className="font-medium">到店付款 / Pay in Store</div>
            <div className="text-sm text-slate-700 mt-1">請於櫃檯出示訂單編號完成結帳。</div>
          </div>
        )}

        <div className="mt-4">
          <a className="underline" href="/menu">繼續點餐 / Continue ordering →</a>
          <span className="mx-2">|</span>
          <a className="underline" href="/">{'返回首頁 / Home'}</a>
        </div>

        {last && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-slate-600">查看訂單摘要 / View Summary</summary>
            <ul className="mt-2 text-sm">
              {last.items.map(i => (
                <li key={i.id}>{i.nameCn} × {i.qty} — NT$ {i.price * i.qty}</li>
              ))}
            </ul>
            <div className="font-medium mt-2">小計 / Subtotal：NT$ {last.subtotal}</div>
          </details>
        )}
      </div>
    </main>
  );
}
