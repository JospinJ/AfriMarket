"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import type { Seller } from "@/types/seller";
import { usePurchaseModeStore } from "@/store/usePurchaseModeStore";
import { useCartStore } from "@/store/useCartStore";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductBuyPanel } from "@/components/pdp/ProductBuyPanel";
import { StickyBuyBar } from "@/components/pdp/StickyBuyBar";
import { QnASection } from "@/components/pdp/QnASection";
import { ReviewTabs } from "@/components/reviews/ReviewTabs";
import { ProductCard } from "@/components/shared/ProductCard";
import { TrustStrip } from "@/components/shared/TrustStrip";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { getProductsBySeller } from "@/lib/mocks/products";
import { ROUTES } from "@/lib/constants/routes";

interface PdpContentProps {
  product: Product;
  seller: Seller;
}

export function PdpContent({ product, seller }: PdpContentProps) {
  const router = useRouter();
  const getMode = usePurchaseModeStore((s) => s.getMode);
  const addItem = useCartStore((s) => s.addItem);
  const selectedMode = getMode(product.id);
  const selectedOffer =
    product.offers.find((o) => o.mode === selectedMode) ?? product.offers[0];
  const [cartPulse, setCartPulse] = useState(false);

  if (!selectedOffer) return null;

  const outOfStock = selectedOffer.stock <= 0;
  const sellerProducts = getProductsBySeller(product.sellerId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      sellerId: product.sellerId,
      mode: selectedMode,
      unitPrice: selectedOffer.price,
      quantity: selectedOffer.mode === "gros" && selectedOffer.moq ? selectedOffer.moq : 1,
      title: product.title,
      image: product.images[0],
    });
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 1200);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(ROUTES.checkout);
  };

  return (
    <div className="pb-28 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 flex min-w-0 flex-wrap items-center gap-x-2 text-sm text-sand" aria-label="Fil d'Ariane">
          <Link href={ROUTES.home} className="hover:text-primary">
            Accueil
          </Link>
          <span aria-hidden>/</span>
          <span className="min-w-0 truncate text-night">{product.title}</span>
        </nav>

        <TrustStrip variant="checkout" className="mb-6" />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <RevealOnScroll variant="slideLeft">
            <ProductGallery
              images={product.images}
              title={product.title}
              badges={product.badges?.map(String)}
              sellerName={seller.storeName}
              sellerImage={seller.logoUrl}
            />
          </RevealOnScroll>

          <RevealOnScroll variant="slideRight" delay={0.08}>
            <div className="lg:sticky lg:top-20 lg:self-start">
              <ProductBuyPanel
                product={product}
                seller={seller}
                onAddedToCart={handleAddToCart}
              />
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll variant="fadeUpBlur" delay={0.1} className="mt-12">
          <section aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="font-display text-xl font-bold text-night md:text-2xl">
              Avis & confiance
            </h2>
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-premium-sm md:p-6">
              <ReviewTabs productId={product.id} sellerId={seller.id} />
            </div>
          </section>
        </RevealOnScroll>

        {product.specs && (
          <RevealOnScroll variant="fadeUp" className="mt-10">
            <section>
              <h2 className="font-display text-xl font-bold text-night">Spécifications</h2>
              <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="rounded-xl bg-white p-4 shadow-premium-sm">
                    <dt className="text-xs uppercase tracking-wide text-sand">{key}</dt>
                    <dd className="mt-1 font-medium text-night">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </RevealOnScroll>
        )}

        <div className="mt-10">
          <QnASection />
        </div>

        {sellerProducts.length > 0 && (
          <RevealOnScroll variant="fadeUp" className="mt-12">
            <section>
              <h2 className="font-display text-xl font-bold text-night">
                Autres produits de {seller.storeName}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {sellerProducts.map((p) => (
                  <ProductCard key={p.id} product={p} seller={seller} />
                ))}
              </div>
            </section>
          </RevealOnScroll>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Question sur ${product.title} sur AfriMarket Hub`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-2.5 text-sm font-semibold text-[#128C7E] transition hover:bg-[#25D366]/20"
          >
            <MessageCircle size={18} aria-hidden />
            Poser une question au vendeur via WhatsApp
          </a>
        </div>
      </div>

      <StickyBuyBar
        offer={selectedOffer}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        disabled={outOfStock}
        pulse={cartPulse}
      />
    </div>
  );
}
