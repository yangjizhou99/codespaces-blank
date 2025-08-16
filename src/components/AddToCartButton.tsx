'use client';
import { useCart } from './CartProvider';

type Props = {
  id: string;
  nameCn: string;
  nameEn: string;
  price: number;
  img?: string;
  qty?: number;
  variant?: 'primary' | 'ghost';
};

export function AddToCartButton({ id, nameCn, nameEn, price, img, qty = 1, variant = 'primary' }: Props) {
  const { add } = useCart();
  return (
    <button
      data-testid={`add-${id}`}
      onClick={(e) => { e.preventDefault(); add({ id, nameCn, nameEn, price, img }, qty); }}
      className={`rounded-lg border px-4 py-2 text-sm ${variant === 'primary' ? 'bg-amber-100 hover:bg-amber-200' : 'hover:bg-white'}`}
    >
      加入購物車 / Add to Cart
    </button>
  );
}
