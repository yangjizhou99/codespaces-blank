import Link from 'next/link';
import type { MenuItem } from '../types/menu';

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-sm transition">
      <Link href={`/menu/${item.id}`} className="block">
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img || '/img/placeholder.svg'} alt={item.nameEn} className="w-full h-40 object-cover" />
        <div className="p-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base md:text-lg font-semibold">
              {item.nameCn}
              <span className="ml-2 text-xs text-slate-500">{item.nameEn}</span>
            </h3>
            <div className="text-rose-600 font-semibold">NT$ {item.price}</div>
          </div>
          {item.descCn && <p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.descCn}</p>}
        </div>
      </Link>
      {/* Cart placeholder (to be implemented in step 4) */}
      <div className="p-4 pt-0">
        <button
          aria-disabled
          onClick={(e) => { e.preventDefault(); alert('購物車功能將於下一步開啟 / Cart will be enabled in next step.'); }}
          className="w-full rounded-lg border py-2 text-sm hover:bg-white"
        >
          加入購物車（下一步開啟）
        </button>
      </div>
    </div>
  );
}
