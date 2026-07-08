"use client";

import { DISCOVERY_ITEMS } from "@/lib/mocks/live-activity";
import { Sparkles } from "lucide-react";

export function DiscoveryTicker() {
  const items = [...DISCOVERY_ITEMS, ...DISCOVERY_ITEMS];

  return (
    <div
      className="relative -mx-4 overflow-hidden border-y border-primary/25 bg-night sm:-mx-6 lg:-mx-[max(1rem,calc((100vw-80rem)/2+1rem))]"
      aria-label="Tendances et promotions"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" aria-hidden />
      <div className="absolute inset-0 bg-motif-kente opacity-30" aria-hidden />

      <div className="relative flex items-center gap-4 py-3">
        <div className="z-20 flex shrink-0 items-center gap-2 border-r border-white/10 bg-night px-4 py-1">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" aria-hidden />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Live</span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-night to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-night to-transparent" />
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
            {items.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex items-center gap-2.5 text-sm font-medium text-white/90"
              >
                <span className="h-2 w-2 rounded-full bg-primary shadow-glow-orange" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
