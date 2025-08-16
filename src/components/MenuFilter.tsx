'use client';

import type { Category } from '../types/menu';

type Props = {
  categories: Category[];
  active?: Category | '全部';
  onChange: (c: Category | '全部') => void;
};

export function MenuFilter({ categories, active = '全部', onChange }: Props) {
  const all: (Category | '全部')[] = ['全部', ...categories];
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {all.map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          data-testid={`tab-${c}`}
          className={`px-3 py-1 rounded-full border ${active === c ? 'bg-amber-100 border-amber-300' : 'hover:bg-slate-50'}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
