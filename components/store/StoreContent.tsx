"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import type { Seller } from "@/types/seller";
import { ProductCard } from "@/components/shared/ProductCard";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreTabs, type StoreTab } from "@/components/store/StoreTabs";
import { StoreFilters } from "@/components/store/StoreFilters";
import { StoreReviews } from "@/components/store/StoreReviews";
import { getStoreProfile } from "@/lib/mocks/store-profiles";
import { useFiltersStore } from "@/store/useFiltersStore";

interface StoreContentProps {
  seller: Seller;
  products: Product[];
}

export function StoreContent({ seller, products }: StoreContentProps) {
  const [activeTab, setActiveTab] = useState<StoreTab>("products");
  const [sortBy, setSortBy] = useState("relevance");
  const searchQuery = useFiltersStore((s) => s.searchQuery);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price_asc") {
      result.sort((a, b) => (a.offers[0]?.price ?? 0) - (b.offers[0]?.price ?? 0));
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => (b.offers[0]?.price ?? 0) - (a.offers[0]?.price ?? 0));
    } else if (sortBy === "newest") {
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return result;
  }, [products, searchQuery, sortBy]);

  const bestsellers = [...products]
    .sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0))
    .slice(0, 8);
  const newest = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const profile = getStoreProfile(seller.storeSlug);

  return (
    <div>
      <StoreHeader seller={seller} />
      <StoreTabs active={activeTab} onChange={setActiveTab} />

      <div className="mx-auto max-w-6xl px-4 py-6">
        {activeTab === "products" && (
          <div className="space-y-6">
            <StoreFilters sortBy={sortBy} onSortChange={setSortBy} />
            {filteredProducts.length === 0 ? (
              <p className="py-12 text-center text-sand">
                Aucun produit trouvé
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "promotions" && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {products
              .filter((p) => p.offers.some((o) => o.originalPrice))
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        )}

        {activeTab === "bestsellers" && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {activeTab === "new" && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {newest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm">
            <div>
              <h2 className="font-display text-xl font-semibold text-night">À propos</h2>
              {profile?.tagline && (
                <p className="mt-1 text-sm font-medium text-primary">{profile.tagline}</p>
              )}
            </div>
            <p className="leading-relaxed text-night/80">
              {profile?.description ??
                `${seller.storeName} est une boutique basée à ${seller.city}, ${seller.country}. Spécialisée dans la vente en Express, Import et Gros avec livraison moto.`}
            </p>
            {profile && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {profile.highlights.map((h) => (
                  <li key={h} className="rounded-lg bg-surface-light px-3 py-2 text-sm text-night/80">
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="space-y-2 border-t border-sand/15 pt-4 text-sm text-sand">
              {profile?.specialty && <p>Spécialité : {profile.specialty}</p>}
              {profile?.foundedYear && <p>Fondée en {profile.foundedYear}</p>}
              {profile?.deliveryZones && (
                <p>Zones livrées : {profile.deliveryZones.join(", ")}</p>
              )}
              {profile?.avgDeliveryDays && <p>Délais : {profile.avgDeliveryDays}</p>}
              <p>
                Politique retour :{" "}
                {profile?.returnPolicy ?? "7–30 jours selon le produit"}
              </p>
              <p>Livraison : moto, express, point relais</p>
              {profile?.languages && (
                <p>Langues : {profile.languages.join(" · ")}</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <StoreReviews
            sellerId={seller.id}
            averageRating={seller.rating.average}
            reviewCount={seller.rating.count}
          />
        )}
      </div>
    </div>
  );
}
