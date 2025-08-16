'use client';

import { useMemo, useState } from 'react';
import type { Category, MenuItem } from '../types/menu';
import { MenuFilter } from './MenuFilter';
import { MenuCard } from './MenuCard';

export function MenuBrowser({
  categories,
  items
}: { categories: Category[]; items: MenuItem[] }) {
  const [active, setActive] = useState<Category | '全部'>('全部');
  const view = useMemo(() => {
    return active === '全部' ? items : items.filter(i => i.category === active);
  }, [active, items]);

  return (
    <div>
      <MenuFilter categories={categories} active={active} onChange={setActive} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-testid="menu-grid">
        {view.map(i => <MenuCard key={i.id} item={i} />)}
      </div>
    </div>
  );
}
