// TeamGrid.tsx：團隊卡片（無圖時用首字母頭像）
type Member = { name: string; role: string; bio?: string };
export function TeamGrid({ members }: { members: Member[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {members.map((m) => (
        <div key={m.name} className="border rounded-xl p-4 hover:shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-amber-200 grid place-items-center font-semibold">
              {m.name.slice(0, 1)}
            </div>
            <div>
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-slate-600">{m.role}</div>
            </div>
          </div>
          {m.bio && <p className="text-sm text-slate-700 mt-3">{m.bio}</p>}
        </div>
      ))}
    </div>
  );
}
