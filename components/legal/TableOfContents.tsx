"use client";

import { cn } from "@/lib/utils/cn";

export interface TocSection {
  id: string;
  title: string;
}

export interface TableOfContentsProps {
  sections: TocSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-8 rounded-2xl border border-white/10 bg-night/80 p-4" aria-label="Table des matières">
      <h2 className="font-display text-sm font-semibold text-gold mb-3">Sommaire</h2>
      <ul className="space-y-1">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => handleClick(s.id)}
              className={cn(
                "w-full rounded px-2 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors min-h-[44px]"
              )}
            >
              {s.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
