'use client';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { CartAction, CartItem, CartState } from '../types/cart';
import { clampQty, loadFromStorage, mergeItems, saveToStorage, subtotal } from '@/lib';

type Ctx = {
  state: CartState;
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
};

const CartCtx = createContext<Ctx | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const qty = clampQty(action.qty ?? 1);
      return { items: mergeItems([...state.items, { ...action.item, qty }]) };
    }
    case 'SET_QTY': {
      const qty = clampQty(action.qty);
      return { items: state.items.map(i => i.id === action.id ? { ...i, qty } : i) };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadFromStorage());

  useEffect(() => { saveToStorage(state); }, [state]);

  const api: Ctx = useMemo(() => ({
    state,
    add: (item, qty) => dispatch({ type: 'ADD', item, qty }),
    setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    total: subtotal(state.items)
  }), [state]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
