import Link from 'next/link';
import type { MenuItem } from '../types/menu';
import { AddToCartButton } from './AddToCartButton';

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
        <div className="p-4 pt-0" onClick={(e) => e.stopPropagation()}>
          <AddToCartButton
            id={item.id}
            nameCn={item.nameCn}
            nameEn={item.nameEn}
            price={item.price}
            img={item.img}
            variant="ghost"
          />
        </div>
    </div>
  );
}
