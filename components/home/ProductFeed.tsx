"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { getSellerById } from "@/lib/mocks/sellers";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { usePremiumSurprise } from "@/hooks/usePremiumSurprise";
import { useOnScreen } from "@/hooks/useOnScreen";

const PAGE_SIZE = 6;

interface ProductFeedProps {
  products: Product[];
  title?: string;
}

export function ProductFeed({
  products,
  title = "Tous les produits",
}: ProductFeedProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  // « Cadeau Surprise » — uniquement sur les produits de vendeurs Premium,
  // et seulement lorsque la grille est visible (perf + UX).
  const premiumIds = useMemo(
    () =>
      products
        .slice(0, visibleCount)
        .filter((p) => {
          const tier = getSellerById(p.sellerId)?.tier;
          return tier === "gold" || tier === "elite";
        })
        .map((p) => p.id),
    [products, visibleCount]
  );
  const gridVisible = useOnScreen(gridRef, "0px 0px -20% 0px");
  const surpriseId = usePremiumSurprise({ ids: premiumIds, enabled: gridVisible });

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    setLoading(true);
    setError(false);
    // TODO API: GET /home/feed?page=&limit=
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, products.length));
    setLoading(false);
  }, [hasMore, loading, products.length]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [products]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  if (products.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white p-8 text-center shadow-sm"
      >
        <p className="text-night">Aucun produit pour ces filtres</p>
        <p className="mt-1 text-sm text-sand">Essayez d&apos;élargir vos critères</p>
      </motion.section>
    );
  }

  return (
    <section aria-labelledby="product-feed-heading">
      <SectionHeader
        titleId="product-feed-heading"
        title={title}
        subtitle={`${products.length} produits disponibles`}
        href={ROUTES.home}
      />

      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {visibleProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % PAGE_SIZE) * 0.04, duration: 0.45 }}
          >
            <ProductCard
              product={product}
              seller={getSellerById(product.sellerId)}
              isSurprise={product.id === surpriseId}
            />
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-2xl bg-gradient-to-br from-sand/10 via-sand/20 to-sand/10"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="mt-6 text-center">
          <p className="text-sm text-terracotta">Erreur de chargement</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={loadMore}>
            Réessayer
          </Button>
        </div>
      )}

      <div ref={sentinelRef} className="h-4" aria-hidden />

      {hasMore && !loading && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={loadMore} className="min-h-11">
            Charger plus
          </Button>
        </div>
      )}
    </section>
  );
}
