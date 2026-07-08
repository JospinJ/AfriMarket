import type { Product } from "@/types/product";
import type { Seller } from "@/types/seller";
import type { StoreProfile } from "@/lib/mocks/store-profiles";

let runtimeSellers: Seller[] = [];
let runtimeProducts: Product[] = [];
let runtimeProfiles: Record<string, StoreProfile> = {};

export function setRuntimeCatalog(data: {
  sellers: Seller[];
  products: Product[];
  profiles: Record<string, StoreProfile>;
}): void {
  runtimeSellers = data.sellers;
  runtimeProducts = data.products;
  runtimeProfiles = data.profiles;
}

export function getRuntimeSellers(): Seller[] {
  return runtimeSellers;
}

export function getRuntimeProducts(): Product[] {
  return runtimeProducts;
}

export function getRuntimeProfile(slug: string): StoreProfile | undefined {
  return runtimeProfiles[slug];
}

export function getRuntimeSellerBySlug(slug: string): Seller | undefined {
  return runtimeSellers.find((s) => s.storeSlug === slug);
}

export function getRuntimeSellerById(id: string): Seller | undefined {
  return runtimeSellers.find((s) => s.id === id);
}

export function getRuntimeProductBySlug(slug: string): Product | undefined {
  return runtimeProducts.find((p) => p.slug === slug);
}

export function getRuntimeProductById(id: string): Product | undefined {
  return runtimeProducts.find((p) => p.id === id);
}

export function getRuntimeProductsBySeller(sellerId: string): Product[] {
  return runtimeProducts.filter((p) => p.sellerId === sellerId);
}
