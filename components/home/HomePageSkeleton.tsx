export function HomePageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-8 px-4 py-6">
      <div className="h-[420px] rounded-2xl bg-sand/20" />
      <div className="h-10 bg-sand/15" />
      <div className="h-48 rounded-2xl bg-sand/15" />
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-9 w-24 shrink-0 rounded-full bg-sand/15" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] rounded-2xl bg-sand/15" />
        ))}
      </div>
    </div>
  );
}
