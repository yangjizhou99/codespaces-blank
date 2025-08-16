import { notFound } from 'next/navigation';
import { getAllItems, getItemById } from '../../../lib/menu';
import { AddToCartButton } from '../../../components/AddToCartButton';

export async function generateStaticParams() {
  return getAllItems().map(i => ({ id: i.id }));
}

export default function MenuDetail({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);
  if (!item) return notFound();

  return (
    <main className="py-6">
      <a href="/menu" className="text-sm text-slate-600 underline">← 返回菜單 Back to Menu</a>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img || '/img/placeholder.svg'} alt={item.nameEn} className="w-full h-auto rounded-xl border" />
        <div>
          <h1 className="text-2xl font-bold">{item.nameCn} <span className="text-slate-500 text-lg ml-2">{item.nameEn}</span></h1>
          <div className="text-rose-600 font-semibold mt-2">NT$ {item.price}</div>
          {item.descCn && <p className="mt-3 text-slate-700">{item.descCn}</p>}
          {item.descEn && <p className="mt-1 text-slate-500 text-sm">{item.descEn}</p>}

          <div className="mt-6">
            <AddToCartButton
              id={item.id}
              nameCn={item.nameCn}
              nameEn={item.nameEn}
              price={item.price}
              img={item.img}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
