import { mockSellers } from "@/lib/mocks/sellers";
import { getRuntimeSellers } from "@/lib/catalog/runtime";

/** Génère un slug URL à partir d'un nom de boutique. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function isSlugAvailable(slug: string, excludeSellerId?: string): boolean {
  if (!slug || slug.length < 3) return false;
  const taken = [...mockSellers, ...getRuntimeSellers()].some(
    (s) => s.storeSlug === slug && s.id !== excludeSellerId,
  );
  return !taken;
}

export function suggestSlug(storeName: string): string {
  const base = slugify(storeName);
  if (!base) return "";
  if (isSlugAvailable(base)) return base;
  for (let i = 2; i < 100; i++) {
    const candidate = `${base}-${i}`;
    if (isSlugAvailable(candidate)) return candidate;
  }
  return `${base}-${Date.now().toString(36).slice(-4)}`;
}
