import { getAllCategories, getAllItems, getPopular } from '../../lib/menu';
import { MenuBrowser } from '../../components/MenuBrowser';

export const metadata = {
  title: '線上菜單 Menu | Kodomo 2.0',
  description: '飯類、麵類、小吃、飲品、套餐'
};

export default function MenuPage() {
  const cats = getAllCategories();
  const items = getAllItems();
  const popular = getPopular(4);

  return (
    <main className="py-6">
      <h1 className="text-2xl font-bold mb-2">線上菜單 <span className="text-slate-500">Menu</span></h1>

      {/* Popular section (optional) */}
      {popular.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">人氣推薦 / Popular</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popular.map(p => (
              <div key={p.id} className="border rounded-lg p-3">
                <div className="text-sm font-medium">{p.nameCn}</div>
                <div className="text-xs text-slate-500">{p.nameEn}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <MenuBrowser categories={cats} items={items} />
    </main>
  );
}
