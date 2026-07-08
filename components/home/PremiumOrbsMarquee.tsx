"use client";

import { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  getPremiumFloatingItems,
  getPremiumFloatingIds,
  type PremiumFloatingItem,
} from "@/lib/utils/premium-floating";
import { usePremiumSurprise } from "@/hooks/usePremiumSurprise";
import { PremiumOrbCard } from "@/components/home/PremiumOrbCard";

interface PremiumOrbsMarqueeProps {
  items?: PremiumFloatingItem[];
  className?: string;
  /** Fond sombre (section night) ou clair */
  tone?: "light" | "dark";
  title?: string;
}

export function PremiumOrbsMarquee({
  items: itemsProp,
  className,
  tone = "light",
  title = "Produits Premium en rotation",
}: PremiumOrbsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });

  const items = useMemo(() => itemsProp ?? getPremiumFloatingItems(6), [itemsProp]);
  const premiumIds = useMemo(() => getPremiumFloatingIds(items), [items]);
  const surpriseId = usePremiumSurprise({ ids: premiumIds, enabled: isInView });

  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      aria-label={title}
      role="region"
    >
      <div className="mb-3 flex items-center gap-2 px-1">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            tone === "dark"
              ? "bg-primary/25 text-primary border border-primary/40"
              : "bg-primary/10 text-primary",
          )}
        >
          <Crown className="h-3 w-3" aria-hidden />
          Gold & Elite
        </span>
        <p
          className={cn(
            "text-xs font-medium",
            tone === "dark" ? "text-white/90" : "text-sand",
          )}
        >
          Défilement exclusif Premium
        </p>
      </div>

      <div
        className={cn(
          "premium-marquee-mask relative rounded-2xl py-3",
          tone === "dark" ? "bg-white/5" : "bg-surface-light/80",
        )}
      >
        <div className="premium-marquee-track flex w-max gap-6 px-4 md:gap-8">
          {loop.map((item, i) => (
            <PremiumOrbCard
              key={`${item.id}-${i}`}
              item={item}
              size="md"
              isSurprise={surpriseId === item.id && i < items.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
