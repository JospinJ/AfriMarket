"use client";

import { useMemo, useEffect, Suspense, useDeferredValue } from "react";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useFiltersStore } from "@/store/useFiltersStore";
import { getAllProducts } from "@/services/products";
import { mockSellers, getSellerById } from "@/lib/mocks/sellers";
import {
  filterProducts,
  getFlashSaleProducts,
  getNewProducts,
} from "@/lib/utils/filter-products";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HomeHero } from "@/components/home/HomeHero";
import { AfricanIdentityBanner } from "@/components/home/AfricanIdentityBanner";
import { DiscoveryTicker } from "@/components/home/DiscoveryTicker";
import { LiveActivityToast } from "@/components/home/LiveActivityToast";
import { PromoWelcomeModal } from "@/components/home/PromoWelcomeModal";
import { PremiumStoresCarousel } from "@/components/home/PremiumStoresCarousel";
import { SectionHeader } from "@/components/home/SectionHeader";
import { EcosystemStory } from "@/components/home/EcosystemStory";
import { SpecialtyStoresShowcase } from "@/components/home/SpecialtyStoresShowcase";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { TriptyqueShowcase } from "@/components/home/TriptyqueShowcase";
import { FiltersBar } from "@/components/home/FiltersBar";
import { LocalSearchBlock } from "@/components/home/LocalSearchBlock";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { ProductFeed } from "@/components/home/ProductFeed";
import { ProductCard } from "@/components/shared/ProductCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { PremiumSection } from "@/components/motion/PremiumSection";
import { ROUTES } from "@/lib/constants/routes";
import { HomePageSkeleton } from "@/components/home/HomePageSkeleton";
import { TrendingStrip } from "@/components/home/TrendingStrip";
import { SpecialEventBanner } from "@/components/home/SpecialEventBanner";

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const setFilter = useFiltersStore((s) => s.setFilter);
  const filters = useFiltersStore(
    useShallow((s) => ({
      priceMin: s.priceMin,
      priceMax: s.priceMax,
      categoryId: s.categoryId,
      city: s.city,
      premiumOnly: s.premiumOnly,
      fastDelivery: s.fastDelivery,
      minRating: s.minRating,
      searchQuery: s.searchQuery,
    }))
  );
  const queryFromUrl = searchParams.get("q") ?? "";

  useEffect(() => {
    if (queryFromUrl) setFilter("searchQuery", queryFromUrl);
  }, [queryFromUrl, setFilter]);

  const filteredProducts = useMemo(
    () => filterProducts(getAllProducts(), filters),
    [filters]
  );

  const deferredProducts = useDeferredValue(filteredProducts);
  const isFiltering = deferredProducts !== filteredProducts;

  const flashProducts = useMemo(
    () => getFlashSaleProducts(deferredProducts).slice(0, 8),
    [deferredProducts]
  );

  const newProducts = useMemo(
    () => getNewProducts(deferredProducts).slice(0, 4),
    [deferredProducts]
  );

  const recommendedProducts = useMemo(
    () => deferredProducts.slice(0, 4),
    [deferredProducts]
  );

  const trendingProducts = useMemo(
    () =>
      [...deferredProducts].sort((a, b) => b.rating.count - a.rating.count).slice(0, 6),
    [deferredProducts]
  );

  const premiumSellers = mockSellers.filter(
    (s) => s.tier === "gold" || s.tier === "elite"
  );

  return (
    <>
      <LiveActivityToast />
      <PromoWelcomeModal />

      <div
        className={`transition-opacity duration-200 ${isFiltering ? "opacity-75" : ""}`}
      >
        {/* ── Acte I : Accroche cinématique ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomeHero />
        </div>
        <AfricanIdentityBanner />
        <DiscoveryTicker />

        {/* ── Acte II : Storytelling écosystème ── */}
        <PremiumSection variant="mesh" className="py-16 md:py-24">
          <EcosystemStory />
        </PremiumSection>

        <PremiumSection variant="elevated" className="py-12 md:py-16">
          <RevealOnScroll variant="fadeUpBlur">
            <SpecialtyStoresShowcase />
          </RevealOnScroll>
        </PremiumSection>

        {/* ── Acte III : Découverte commerciale ── */}
        <PremiumSection variant="default" className="py-12 md:py-16" animate={false}>
          <RevealOnScroll variant="fadeUp">
            <SpecialEventBanner />
          </RevealOnScroll>

          <RevealOnScroll variant="fadeUp" delay={0.06} className="mt-8 md:mt-10">
            <section aria-labelledby="promos-heading">
              <div className="mb-5 flex items-center gap-4 md:mb-6">
                <div
                  className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/35 to-transparent"
                  aria-hidden
                />
                <h2
                  id="promos-heading"
                  className="shrink-0 font-display text-xs font-bold uppercase tracking-[0.2em] text-sand md:text-sm"
                >
                  Offres du moment
                </h2>
                <div
                  className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/35 to-transparent"
                  aria-hidden
                />
              </div>
              <HeroCarousel />
            </section>
          </RevealOnScroll>
        </PremiumSection>

        <PremiumSection variant="warm" className="py-10 md:py-14">
          <TriptyqueShowcase />
        </PremiumSection>

        {/* ── Acte IV : Exploration & filtres ── */}
        <FiltersBar />

        <PremiumSection variant="ivory" className="py-12 md:py-16">
          <RevealOnScroll variant="slideLeft">
            <LocalSearchBlock />
          </RevealOnScroll>
          <RevealOnScroll variant="revealScale" delay={0.1} className="mt-14">
            <CategoryShowcase />
          </RevealOnScroll>
        </PremiumSection>

        {flashProducts.length > 0 && (
          <PremiumSection variant="default" className="py-12 md:py-16">
            <RevealOnScroll variant="scaleIn">
              <FlashSaleSection products={flashProducts} />
            </RevealOnScroll>
          </PremiumSection>
        )}

        {trendingProducts.length > 0 && (
          <PremiumSection variant="elevated" className="py-12 md:py-16">
            <RevealOnScroll variant="slideRight">
              <TrendingStrip products={trendingProducts} />
            </RevealOnScroll>
          </PremiumSection>
        )}

        {recommendedProducts.length > 0 && (
          <PremiumSection variant="mesh" className="py-12 md:py-16">
            <section aria-labelledby="recommended-heading">
              <SectionHeader
                index="04"
                titleId="recommended-heading"
                title="Sélectionné pour vous"
                subtitle="Intelligence locale — tendances Cameroun en temps réel"
                href={ROUTES.home}
              />
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
                {recommendedProducts.map((product, i) => (
                  <RevealOnScroll key={product.id} variant="revealScale" delay={0.06 * i}>
                    <ProductCard
                      product={product}
                      seller={getSellerById(product.sellerId)}
                    />
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          </PremiumSection>
        )}

        {newProducts.length > 0 && (
          <PremiumSection variant="default" className="py-12 md:py-16">
            <section aria-labelledby="new-heading">
              <SectionHeader
                index="05"
                titleId="new-heading"
                title="Nouveautés"
                subtitle="Fraîchement arrivés — soyez les premiers"
                href={ROUTES.newArrivals}
                badge={
                  <span className="animate-shimmer rounded-full bg-gradient-to-r from-secondary via-green-agri to-secondary bg-[length:200%_100%] px-3 py-1 text-xs font-bold text-white">
                    🆕 New
                  </span>
                }
              />
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
                {newProducts.map((product, i) => (
                  <RevealOnScroll key={product.id} variant="fadeUpBlur" delay={0.05 * i}>
                    <ProductCard
                      product={product}
                      seller={getSellerById(product.sellerId)}
                    />
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          </PremiumSection>
        )}

        {premiumSellers.length > 0 && (
          <PremiumSection variant="night" animate={false} className="py-14 md:py-20">
            <PremiumStoresCarousel sellers={premiumSellers} />
          </PremiumSection>
        )}

        <PremiumSection variant="ivory" className="py-12 md:py-16">
          <ProductFeed products={deferredProducts} />
        </PremiumSection>
      </div>
    </>
  );
}
