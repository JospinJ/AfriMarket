import type { Offer } from "@/types/product";

const NBSP = "\u00A0";

export function formatFCFA(amount: number): string {
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return `${formatted}${NBSP}FCFA`;
}

export function computeSaving(offer: Offer): { amount: number; percent: number } | null {
  if (!offer.originalPrice || offer.originalPrice <= offer.price) return null;
  const amount = offer.originalPrice - offer.price;
  const percent = Math.round((amount / offer.originalPrice) * 100);
  return { amount, percent };
}
