'use client';
import type { PaymentMethod } from '../types/order';

export function PaymentMethodRadio({
  value, onChange
}: { value: PaymentMethod; onChange: (m: PaymentMethod) => void }) {
  const opt: { key: PaymentMethod; cn: string; en: string; desc: string }[] = [
    { key: 'transfer', cn: '線上轉帳', en: 'Online Transfer', desc: '下單後顯示帳戶資訊，轉帳完成後到店取餐/用餐。' },
    { key: 'card', cn: '信用卡（即將開通）', en: 'Credit Card (coming soon)', desc: '下一步將前往信用卡付款占位頁（第6步接Stripe）。' },
    { key: 'instore', cn: '到店付款', en: 'Pay in Store', desc: '現金或刷卡於櫃檯結帳。' }
  ];

  return (
    <div className="space-y-3">
      {opt.map(o => (
        <label key={o.key} className={`block border rounded-xl p-3 cursor-pointer ${value === o.key ? 'border-amber-300 bg-amber-50' : 'hover:bg-slate-50'}`}>
          <input
            type="radio"
            name="pay"
            className="mr-2"
            checked={value === o.key}
            onChange={() => onChange(o.key)}
          />
          <span className="font-medium">{o.cn}</span>
          <span className="ml-2 text-sm text-slate-500">{o.en}</span>
          <div className="text-xs text-slate-500 mt-1">{o.desc}</div>
        </label>
      ))}
    </div>
  );
}
