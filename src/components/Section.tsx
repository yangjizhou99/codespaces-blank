// Section.tsx：雙語區塊標題 + 內容包裹
type Props = { titleCn: string; titleEn: string; children?: React.ReactNode };
export function Section({ titleCn, titleEn, children }: Props) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-semibold">
        {titleCn} <span className="ml-2 text-sm md:text-base text-slate-500">{titleEn}</span>
      </h2>
      <div className="mt-3 prose prose-slate max-w-none">{children}</div>
    </section>
  );
}
