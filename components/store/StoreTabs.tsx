"use client";

import { cn } from "@/lib/utils/cn";

export type StoreTab = "products" | "promotions" | "bestsellers" | "new" | "about" | "reviews";

const TABS: { id: StoreTab; label: string; icon: string }[] = [
  { id: "products", label: "Produits", icon: "🛍" },
  { id: "promotions", label: "Promotions", icon: "🔥" },
  { id: "bestsellers", label: "Best Sellers", icon: "⭐" },
  { id: "new", label: "Nouveautés", icon: "🆕" },
  { id: "about", label: "À propos", icon: "ℹ️" },
  { id: "reviews", label: "Avis", icon: "💬" },
];

interface StoreTabsProps {
  active: StoreTab;
  onChange: (tab: StoreTab) => void;
}

export function StoreTabs({ active, onChange }: StoreTabsProps) {
  return (
    <div className="sticky top-14 z-30 border-b border-sand/20 bg-white">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              active === tab.id
                ? "border-green-deep text-green-deep"
                : "border-transparent text-sand hover:text-night"
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
