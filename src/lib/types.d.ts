import type { CartItem, CartState } from '../types/cart';

export const LS_KEY: string;
export const QTY_MIN: number;
export const QTY_MAX: number;

export function clampQty(q: number): number;
export function mergeItems(items: CartItem[]): CartItem[];
export function subtotal(items: CartItem[]): number;
export function loadFromStorage(): CartState;
export function saveToStorage(state: CartState): void;
