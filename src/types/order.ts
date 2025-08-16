import type { CartItem } from './cart';

export type PaymentMethod = 'transfer' | 'card' | 'instore';

export interface OrderDraft {
  id: string;
  items: CartItem[];
  subtotal: number;
  customer: {
    name: string;
    phone: string;
    note?: string;
  };
  method: PaymentMethod;
  createdAt: number; // epoch ms
}
