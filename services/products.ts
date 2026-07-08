import { getRuntimeProducts } from "@/lib/catalog/runtime";
import { mockProducts } from "@/lib/mocks/products";
import type { Product } from "@/types/product";

/**
 * Catalogue marketplace complet (mocks + produits créés en onboarding vendeur).
 * // TODO API: GET /products → Product[]
 */
export function getAllProducts(): Product[] {
  const runtime = getRuntimeProducts();
  const runtimeIds = new Set(runtime.map((p) => p.id));
  return [...runtime, ...mockProducts.filter((p) => !runtimeIds.has(p.id))];
}
