import { formatFCFA } from "@/lib/utils/format-fcfa";
import type { Offer, PurchaseMode } from "@/types/product";

export interface ModeComparison {
  /** Économie vs Express (si moins cher) */
  vsExpress: { amount: number; percent: number } | null;
  /** Express coûte plus mais livre plus vite */
  expressPremium: { amount: number } | null;
  label: string;
}

export function getExpressOffer(offers: Offer[]): Offer | undefined {
  return offers.find((o) => o.mode === "express");
}

/** Compare un mode au prix Express (référence rapidité). */
export function compareModeToExpress(
  offers: Offer[],
  mode: PurchaseMode
): ModeComparison {
  const express = getExpressOffer(offers);
  const current = offers.find((o) => o.mode === mode);

  if (!express || !current) {
    return { vsExpress: null, expressPremium: null, label: "" };
  }

  if (mode === "express") {
    return {
      vsExpress: null,
      expressPremium: null,
      label: "Stock local · livraison la plus rapide",
    };
  }

  if (current.price < express.price) {
    const amount = express.price - current.price;
    const percent = Math.round((amount / express.price) * 100);
    return {
      vsExpress: { amount, percent },
      expressPremium: null,
      label: `Économisez ${formatFCFA(amount)} vs Express (−${percent}%)`,
    };
  }

  if (current.price > express.price) {
    return {
      vsExpress: null,
      expressPremium: { amount: current.price - express.price },
      label: `+${formatFCFA(current.price - express.price)} vs Express · autre délai`,
    };
  }

  return { vsExpress: null, expressPremium: null, label: "Même prix · délai différent" };
}

export function getBestValueMode(offers: Offer[]): PurchaseMode {
  const express = getExpressOffer(offers);
  if (!express) return "express";
  let best: PurchaseMode = "express";
  let bestPrice = express.price;
  for (const o of offers) {
    if (o.price < bestPrice) {
      bestPrice = o.price;
      best = o.mode;
    }
  }
  return best;
}
