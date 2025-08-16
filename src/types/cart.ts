export type CartItem = {
  id: string;
  nameCn: string;
  nameEn: string;
  price: number; // TWD
  img?: string;
  qty: number;   // >=1
};

export type CartState = { items: CartItem[] };

export type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'>; qty?: number }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };
