import type { Product } from "@/types/product";
import { getSellerById } from "@/lib/mocks/sellers";
import { productMatchesCategory } from "@/lib/utils/category";
export interface ProductFilters {
  priceMin?: number;
  priceMax?: number;
  categoryId?: string;
  city?: string;
  premiumOnly: boolean;
  fastDelivery: boolean;
  minRating?: number;
  searchQuery: string;
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    const expressOffer = product.offers.find((o) => o.mode === "express");
    const price = expressOffer?.price ?? product.offers[0]?.price ?? 0;

    if (filters.priceMin !== undefined && price < filters.priceMin) return false;
    if (filters.priceMax !== undefined && price > filters.priceMax) return false;

    if (filters.categoryId) {
      const seller = getSellerById(product.sellerId);
      if (!productMatchesCategory(product.categoryId, filters.categoryId)) return false;
      if (filters.city && seller?.city !== filters.city) return false;
    } else if (filters.city) {
      const seller = getSellerById(product.sellerId);
      if (seller?.city !== filters.city) return false;
    }

    if (filters.premiumOnly) {
      const seller = getSellerById(product.sellerId);
      if (!seller || (seller.tier !== "gold" && seller.tier !== "elite")) return false;
    }

    if (filters.fastDelivery) {
      const express = product.offers.find((o) => o.mode === "express");
      if (!express || express.deliveryEtaDays[1] > 2) return false;
    }

    if (filters.minRating !== undefined && product.rating.average < filters.minRating) {
      return false;
    }

    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const haystack = `${product.title} ${product.brand ?? ""}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function getFlashSaleProducts(products: Product[]): Product[] {
  return products.filter((p) => {
    const express = p.offers.find((o) => o.mode === "express");
    return express?.originalPrice && express.price < express.originalPrice;
  });
}

export function getNewProducts(products: Product[]): Product[] {
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  return products.filter(
    (p) => Date.now() - new Date(p.createdAt).getTime() < thirtyDays
  );
}

