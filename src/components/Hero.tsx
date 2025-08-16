type Props = { titleCn: string; titleEn: string; subtitle?: string; ctaText?: string; ctaHref?: string; };
export function Hero({ titleCn, titleEn, subtitle, ctaText, ctaHref }: Props) {
  return (
    <section className="py-10 md:py-16">
      <div className="rounded-2xl bg-gradient-to-r from-rose-100 to-amber-100 p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          {titleCn} <span className="block text-lg md:text-2xl mt-2 text-slate-600">{titleEn}</span>
        </h1>
        {subtitle && <p className="mt-4 text-slate-700">{subtitle}</p>}
        {ctaText && ctaHref && (
          <a className="inline-block mt-6 px-5 py-2 rounded-xl border border-slate-300 hover:bg-white"
             href={ctaHref}>{ctaText}</a>
        )}
      </div>
    </section>
  );
}
