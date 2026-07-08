import type { BadgeType, Product } from "@/types/product";
import type { Seller } from "@/types/seller";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function deriveBadges(product: Product, seller: Seller): BadgeType[] {
  const badges: BadgeType[] = [];
  const express = product.offers.find((o) => o.mode === "express");
  const importOffer = product.offers.find((o) => o.mode === "import");

  if (
    express?.originalPrice &&
    express.price < express.originalPrice
  ) {
    badges.push("flash_sale");
  }
  if (importOffer?.originalPrice && importOffer.price < importOffer.originalPrice) {
    if (!badges.includes("flash_sale")) badges.push("flash_sale");
  }

  const created = new Date(product.createdAt).getTime();
  if (Date.now() - created < THIRTY_DAYS_MS) badges.push("new");

  if (express && express.deliveryEtaDays[1] <= 2) badges.push("fast_delivery");

  if (seller.tier === "gold" || seller.tier === "elite") badges.push("premium_seller");
  if (seller.kycStatus === "verified") badges.push("verified");

  if (
    product.soldCount &&
    product.viewsCount &&
    product.soldCount / product.viewsCount > 0.1
  ) {
    badges.push("trending");
  }

  return badges;
}
