import { CartProvider } from '../components/CartProvider';

export const metadata = {
  title: 'Kodomo 2.0',
  description: 'Kodomo – Family Taste, Happy Moments'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="zh-Hant">
        <body className="min-h-screen bg-white text-slate-800">
          <CartProvider>
            <div className="max-w-6xl mx-auto px-4">{children}</div>
          </CartProvider>
        </body>
      </html>
  );
}
