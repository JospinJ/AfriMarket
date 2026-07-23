"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Loader2, Search, TrendingUp, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CATEGORIES } from "@/lib/constants/categories";
import { NAV_QUICK_CATEGORIES } from "@/lib/constants/nav";
import { mockProducts } from "@/lib/mocks/products";
import { mockSellers } from "@/lib/mocks/sellers";
import { ROUTES } from "@/lib/constants/routes";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { useSearchHistory } from "@/hooks/useSearchHistory";

const POPULAR_SEARCHES = [
  "Samsung Galaxy A15",
  "HP Laptop 15 Core i5",
  "Nike Air Max 90",
  "Riz parfumé 25kg",
  "Casque moto DOT",
  "Xiaomi Band 8",
];

type SuggestionState = "idle" | "loading" | "ready";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function SearchSuggestions({ query, onSelect, className }: SearchSuggestionsProps) {
  const [state, setState] = useState<SuggestionState>("idle");
  const { history, removeSearch, clearHistory } = useSearchHistory();

  useEffect(() => {
    setState("loading");
    const timer = setTimeout(() => setState("ready"), 220);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockProducts
      .filter((p) => (!q ? true : p.title.toLowerCase().includes(q)))
      .slice(0, 5);
  }, [query]);

  const filteredStores = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockSellers
      .filter((s) => (!q ? true : s.storeName.toLowerCase().includes(q)))
      .slice(0, 3);
  }, [query]);

  if (state === "loading") {
    return (
      <div className={cn("p-4", className)}>
        <div className="flex items-center gap-2 text-sm text-sand">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Suggestions en cours…
        </div>
        <div className="mt-3 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-11 animate-pulse rounded-lg bg-surface-light" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("max-h-[min(70vh,520px)] overflow-y-auto", className)}>
      {/* TODO API: GET /search/suggestions?q= */}
      {history.length > 0 && !query && (
        <section className="border-b border-sand/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-sand">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              Recherches récentes
            </h3>
            <button
              type="button"
              onClick={clearHistory}
              className="text-xs font-medium text-primary hover:underline"
            >
              Effacer
            </button>
          </div>
          <ul className="space-y-1">
            {history.map((term) => (
              <li key={term} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onSelect(term)}
                  className="flex min-h-10 flex-1 items-center gap-2 rounded-lg px-2 text-left text-sm text-night hover:bg-brand-orange-muted"
                >
                  <Search className="h-3.5 w-3.5 shrink-0 text-sand" aria-hidden />
                  {term}
                </button>
                <button
                  type="button"
                  onClick={() => removeSearch(term)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sand hover:bg-surface-light hover:text-night"
                  aria-label={`Supprimer ${term} de l'historique`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-b border-sand/10 p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-sand">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          Tendances
        </h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onSelect(term)}
              className="rounded-full border border-sand/20 bg-ivory px-3 py-1.5 text-xs font-medium text-night transition-colors hover:border-primary/40 hover:bg-brand-orange-muted hover:text-primary"
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      <section className="border-b border-sand/10 p-4">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-sand">
          Catégories rapides
        </h3>
        <div className="flex flex-wrap gap-2">
          {NAV_QUICK_CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="rounded-lg bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary hover:bg-secondary/20"
            >
              {cat.label}
            </Link>
          ))}
          {CATEGORIES.slice(0, 3).map((cat) => (
            <Link
              key={cat.id}
              href={ROUTES.category(cat.slug)}
              className="rounded-lg px-3 py-1.5 text-xs text-night hover:bg-surface-light hover:underline"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-b border-sand/10 p-4">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-sand">
          Produits suggérés
        </h3>
        {filteredProducts.length === 0 ? (
          <p className="text-sm text-sand">Aucun produit pour « {query} »</p>
        ) : (
          <ul className="space-y-1">
            {filteredProducts.map((product) => {
              const offer = product.offers.find((o) => o.mode === "express");
              if (!offer) return null;
              return (
                <li key={product.id}>
                  <Link
                    href={ROUTES.product(product.slug)}
                    onClick={() => onSelect(product.title)}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-brand-orange-muted/60"
                  >
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-sand/10 bg-ivory">
                      <Image
                        src={product.images[0] ?? ""}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-night">{product.title}</p>
                      <p className="text-xs font-medium text-primary">{formatFCFA(offer.price)}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="p-4">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-sand">
          Boutiques
        </h3>
        <ul className="space-y-1">
          {filteredStores.map((seller) => (
            <li key={seller.id}>
              <Link
                href={ROUTES.store(seller.storeSlug)}
                className="flex min-w-0 items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm text-night hover:bg-surface-light"
              >
                <span className="min-w-0 truncate font-medium">{seller.storeName}</span>
                <span className="text-xs text-sand">{seller.city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
