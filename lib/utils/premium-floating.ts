import { mockProducts } from "@/lib/mocks/products";
import { getSellerById } from "@/lib/mocks/sellers";
import { ROUTES } from "@/lib/constants/routes";
import { IMAGES } from "@/lib/constants/images";
import type { SellerTier } from "@/types/user";

export interface PremiumFloatingItem {
  id: string;
  image: string;
  label: string;
  sublabel: string;
  href: string;
  tier: SellerTier;
  isPremium: true;
}

export type PremiumFloatingOrbItem = PremiumFloatingItem & {
  orbitAngle: number;
  orbitDelay: number;
};

/** Durée d'un tour complet (secondes) */
export const ORBIT_DURATION_S = 32;
/** Rayon du cercle — orbes bien espacés sur le hero */
export const ORBIT_RADIUS_PX = 210;

/** Angles répartis uniformément sur le cercle (4 orbes = 90° d'écart) */
const ORB_LAYOUT = [
  { orbitAngle: -20, orbitDelay: 0 },
  { orbitAngle: 70, orbitDelay: 0 },
  { orbitAngle: 160, orbitDelay: 0 },
  { orbitAngle: 250, orbitDelay: 0 },
] as const;

function modeLabel(mode: "express" | "import" | "gros"): string {
  if (mode === "express") return "Express 24h";
  if (mode === "import") return "Import";
  return "Gros MOQ";
}

/** Produits vendeurs Gold/Elite pour orbes flottants premium. */
export function getPremiumFloatingItems(limit = 4): PremiumFloatingOrbItem[] {
  const premiumProducts = mockProducts.filter((product) => {
    const seller = getSellerById(product.sellerId);
    return seller?.tier === "gold" || seller?.tier === "elite";
  });

  return premiumProducts.slice(0, limit).map((product, index) => {
    const seller = getSellerById(product.sellerId)!;
    const express = product.offers.find((o) => o.mode === "express");
    const layout = ORB_LAYOUT[index] ?? ORB_LAYOUT[0]!;

    return {
      id: product.id,
      image: product.images[0] ?? IMAGES.placeholder,
      label: product.title.length > 22 ? `${product.title.slice(0, 20)}…` : product.title,
      sublabel: express ? modeLabel("express") : modeLabel(product.offers[0]?.mode ?? "express"),
      href: ROUTES.product(product.slug),
      tier: seller.tier,
      isPremium: true as const,
      ...layout,
    };
  });
}

export function mergePremiumOrbLayout(
  items: PremiumFloatingItem[],
): PremiumFloatingOrbItem[] {
  return items.map((item, index) => {
    const layout = ORB_LAYOUT[index] ?? ORB_LAYOUT[0]!;
    return { ...item, ...layout };
  });
}

export function getPremiumFloatingIds(items: PremiumFloatingItem[]): string[] {
  return items.map((i) => i.id);
}
