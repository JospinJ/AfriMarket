"use client";

import { Crown } from "lucide-react";
import type { SellerTier } from "@/types/user";

export interface SubscriptionHeaderProps {
  currentTier: SellerTier;
}

const TIER_LABELS: Record<SellerTier, string> = {
  basic: "Basic",
  gold: "Gold",
  elite: "Elite",
};

export function SubscriptionHeader({ currentTier }: SubscriptionHeaderProps) {
  return (
    <header className="rounded-2xl bg-night bg-motif-wax p-6 text-white">
      <div className="flex items-center gap-3">
        <Crown className="h-8 w-8 text-gold" aria-hidden />
        <div>
          <h1 className="font-display text-2xl font-bold">AfriMarket Premium</h1>
          <p className="mt-1 text-white/70">
            Plan actuel : <span className="font-semibold text-gold">{TIER_LABELS[currentTier]}</span>
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-white/60">
        Boostez votre visibilité, réduisez vos commissions et accédez aux analytics complètes.
      </p>
    </header>
  );
}
