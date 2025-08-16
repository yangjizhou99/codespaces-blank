type LinkItem = { href: string; labelCn: string; labelEn: string; };
 const DEFAULTS: LinkItem[] = [
   { href: "/menu", labelCn: "線上購物", labelEn: "Online Shopping" },
   { href: "/qr",   labelCn: "掃碼點餐", labelEn: "Scan to Order" },
   { href: "/wallet", labelCn: "會員卡儲值", labelEn: "Member Top-up" },
   { href: "/about", labelCn: "關於我們", labelEn: "About Us" } // change: step-2
 ];

export function QuickLinks({ items = DEFAULTS }: { items?: LinkItem[] }) {
  return (
    <nav className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((it) => (
        <a key={it.href} href={it.href}
           className="rounded-xl border p-4 hover:shadow">
          <div className="font-medium">{it.labelCn}</div>
          <div className="text-sm text-slate-500">{it.labelEn}</div>
        </a>
      ))}
    </nav>
  );
}
