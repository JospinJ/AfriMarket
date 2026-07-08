"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils/cn";
import { useFiltersStore } from "@/store/useFiltersStore";
import { CATEGORIES } from "@/lib/constants/categories";

const CITIES = ["Douala", "Yaoundé", "Bafoussam", "Garoua"];

export function FiltersBar() {
  const filters = useFiltersStore(
    useShallow((s) => ({
      priceMin: s.priceMin,
      priceMax: s.priceMax,
      categoryId: s.categoryId,
      city: s.city,
      premiumOnly: s.premiumOnly,
      fastDelivery: s.fastDelivery,
      minRating: s.minRating,
    }))
  );
  const setFilter = useFiltersStore((s) => s.setFilter);
  const resetFilters = useFiltersStore((s) => s.resetFilters);

  const hasActiveFilters =
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.categoryId !== undefined ||
    filters.city !== undefined ||
    filters.premiumOnly ||
    filters.fastDelivery ||
    filters.minRating !== undefined;

  return (
    <section
      className="sticky top-[72px] z-30 border-b border-sand/15 glass-panel lg:top-[120px]"
      aria-label="Filtres"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide sm:px-6">
        <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-sand">
          <SlidersHorizontal size={14} aria-hidden />
          Filtres
        </span>

        <select
          value={filters.categoryId ?? ""}
          onChange={(e) => setFilter("categoryId", e.target.value || undefined)}
          className="shrink-0 rounded-full border border-sand/30 bg-surface-light px-3 py-1.5 text-xs"
          aria-label="Catégorie"
        >
          <option value="">Catégorie</option>
          {CATEGORIES.flatMap((c) =>
            (c.children ?? []).map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))
          )}
        </select>

        <select
          value={filters.city ?? ""}
          onChange={(e) => setFilter("city", e.target.value || undefined)}
          className="shrink-0 rounded-full border border-sand/30 bg-surface-light px-3 py-1.5 text-xs"
          aria-label="Ville"
        >
          <option value="">Ville</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Prix min"
          value={filters.priceMin ?? ""}
          onChange={(e) =>
            setFilter("priceMin", e.target.value ? Number(e.target.value) : undefined)
          }
          className="w-24 shrink-0 rounded-full border border-sand/30 bg-surface-light px-3 py-1.5 text-xs"
          aria-label="Prix minimum"
        />
        <input
          type="number"
          placeholder="Prix max"
          value={filters.priceMax ?? ""}
          onChange={(e) =>
            setFilter("priceMax", e.target.value ? Number(e.target.value) : undefined)
          }
          className="w-24 shrink-0 rounded-full border border-sand/30 bg-surface-light px-3 py-1.5 text-xs"
          aria-label="Prix maximum"
        />

        <motion.button
          type="button"
          onClick={() => setFilter("premiumOnly", !filters.premiumOnly)}
          whileTap={{ scale: 0.96 }}
          className={cn(
            "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            filters.premiumOnly
              ? "border-gold bg-gold/15 text-gold shadow-glow-orange"
              : "border-sand/30 bg-surface-light text-night hover:border-gold/40"
          )}
        >
          👑 Premium
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setFilter("fastDelivery", !filters.fastDelivery)}
          whileTap={{ scale: 0.96 }}
          className={cn(
            "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            filters.fastDelivery
              ? "border-secondary bg-brand-green-muted text-secondary shadow-glow-green"
              : "border-sand/30 bg-surface-light text-night hover:border-secondary/40"
          )}
        >
          ⚡ Livraison rapide
        </motion.button>

        <select
          value={filters.minRating ?? ""}
          onChange={(e) =>
            setFilter("minRating", e.target.value ? Number(e.target.value) : undefined)
          }
          className="shrink-0 rounded-full border border-sand/30 bg-surface-light px-3 py-1.5 text-xs"
          aria-label="Note minimum"
        >
          <option value="">Note min</option>
          <option value="4">4+ ★</option>
          <option value="4.5">4.5+ ★</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex shrink-0 items-center gap-1 rounded-full border border-terracotta/30 px-3 py-1.5 text-xs text-terracotta"
          >
            <X size={12} aria-hidden />
            Réinitialiser
          </button>
        )}
      </div>
    </section>
  );
}
