import { CATEGORIES } from "@/lib/constants/categories";

/** IDs de catégories feuilles à inclure quand on filtre par parent ou enfant. */
export function getDescendantCategoryIds(categoryId: string): string[] {
  for (const cat of CATEGORIES) {
    if (cat.id === categoryId) {
      return (cat.children ?? []).map((child) => child.id);
    }
    for (const child of cat.children ?? []) {
      if (child.id === categoryId) return [child.id];
    }
  }
  return [categoryId];
}

export function productMatchesCategory(
  productCategoryId: string,
  filterCategoryId: string,
): boolean {
  return getDescendantCategoryIds(filterCategoryId).includes(productCategoryId);
}

export function getCategoryIdBySlug(slug: string): string | undefined {
  for (const cat of CATEGORIES) {
    if (cat.slug === slug) return cat.id;
    for (const child of cat.children ?? []) {
      if (child.slug === slug) return child.id;
    }
  }
  return undefined;
}

export function getCategoryNameBySlug(slug: string): string {
  for (const cat of CATEGORIES) {
    if (cat.slug === slug) return cat.name;
    for (const child of cat.children ?? []) {
      if (child.slug === slug) return child.name;
    }
  }
  return slug;
}
