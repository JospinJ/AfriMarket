"use client";

import { cn } from "@/lib/utils/cn";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import {
  compareModeToExpress,
  getBestValueMode,
} from "@/lib/utils/triptyque-savings";
import type { Offer, PurchaseMode } from "@/types/product";

const MODE_META: Record<
  PurchaseMode,
  { icon: string; label: string; desc: string }
> = {
  express: { icon: "⚡", label: "Express", desc: "Stock local · 24–72 h" },
  import: { icon: "🌍", label: "Import", desc: "Prix réduit · 10–25 j" },
  gros: { icon: "🏭", label: "Gros", desc: "MOQ · prix usine" },
};

interface PurchaseModeSelectorProps {
  offers: Offer[];
  selected: PurchaseMode;
  onSelect: (mode: PurchaseMode) => void;
  compact?: boolean;
}

export function PurchaseModeSelector({
  offers,
  selected,
  onSelect,
  compact = false,
}: PurchaseModeSelectorProps) {
  const bestValue = getBestValueMode(offers);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-sm font-bold text-night md:text-base">
          Choisissez votre mode d&apos;achat
        </h2>
        <span className="rounded-full bg-brand-orange-muted px-2 py-0.5 text-[10px] font-bold text-brand-orange-dark">
          3 modes
        </span>
      </div>

      <div
        className={cn(
          "grid gap-2",
          compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
        )}
      >
        {offers.map((offer) => {
          const meta = MODE_META[offer.mode];
          const isSelected = selected === offer.mode;
          const comparison = compareModeToExpress(offers, offer.mode);
          const isBest = bestValue === offer.mode;

          return (
            <button
              key={offer.mode}
              type="button"
              onClick={() => onSelect(offer.mode)}
              className={cn(
                "relative rounded-xl border p-3 text-left transition-all duration-300",
                isSelected
                  ? "border-primary bg-brand-orange-muted/50 shadow-glow-orange ring-2 ring-primary/25"
                  : "border-sand/25 bg-white hover:border-primary/40 hover:shadow-premium-sm"
              )}
            >
              {isBest && (
                <span className="absolute -top-2 right-2 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                  Meilleur prix
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden>
                  {meta.icon}
                </span>
                <div>
                  <span className="font-semibold text-night">{meta.label}</span>
                  <p className="text-[10px] text-sand">{meta.desc}</p>
                </div>
              </div>
              <p className="mt-2 font-display text-lg font-bold text-night">
                {formatFCFA(offer.price)}
              </p>
              {comparison.vsExpress && (
                <p className="mt-1 text-xs font-semibold text-secondary">
                  −{formatFCFA(comparison.vsExpress.amount)} vs Express
                  <span className="ml-1 text-terracotta">(−{comparison.vsExpress.percent}%)</span>
                </p>
              )}
              {offer.mode === "gros" && offer.moq && (
                <p className="mt-0.5 text-xs text-sand">MOQ {offer.moq} unités</p>
              )}
              {offer.mode !== "gros" && (
                <p className="mt-0.5 text-xs text-sand">
                  Livraison {offer.deliveryEtaDays[0]}–{offer.deliveryEtaDays[1]} j
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
