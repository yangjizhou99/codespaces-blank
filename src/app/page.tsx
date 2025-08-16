import { Hero } from "../components/Hero";
import { QuickLinks } from "../components/QuickLinks";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <main className="py-6">
      <Hero
        titleCn="招牌餐點，溫暖上桌"
        titleEn="Signature Dishes • Fresh Daily"
        subtitle="最新優惠 / New Deals Every Week"
        ctaText="立即查看菜單 / View Menu"
        ctaHref="/menu"
      />
      {/* 最新消息 / Announcements (占位) */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">最新消息 / News & Events</h2>
        <ul className="list-disc pl-6 text-slate-700">
          <li>新菜上市：唐揚雞定食 / New item: Karaage Set</li>
          <li>節慶活動：雙人套餐 9 折 / Seasonal: 10% off for two</li>
        </ul>
      </section>

      {/* 快速入口 / Quick Entrances */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">快速入口 / Quick Access</h2>
        <QuickLinks />
      </section>

      <Footer />
    </main>
  );
}
