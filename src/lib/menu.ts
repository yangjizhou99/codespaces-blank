import data from '../data/menu.json';
import type { MenuItem, Category } from '../types/menu';

export function getAllCategories(): Category[] {
  // @ts-ignore - json type
  return (data.categories || []) as Category[];
}

export function getAllItems(): MenuItem[] {
  // @ts-ignore
  return (data.items || []) as MenuItem[];
}

export function getItemsByCategory(cat?: Category): MenuItem[] {
  const all = getAllItems();
  if (!cat) return all;
  return all.filter(i => i.category === cat);
}

export function getItemById(id: string): MenuItem | undefined {
  return getAllItems().find(i => i.id === id);
}

export function getPopular(limit = 4): MenuItem[] {
  return getAllItems().filter(i => i.popular).slice(0, limit);
}
