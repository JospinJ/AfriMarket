"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getProductBySlug } from "@/lib/mocks/products";
import { getSellerById } from "@/lib/mocks/sellers";
import { useUiStore } from "@/store/useUiStore";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductBuyPanel } from "@/components/pdp/ProductBuyPanel";
import { ROUTES } from "@/lib/constants/routes";
import { X } from "lucide-react";

export function QuickViewModal() {
  const slug = useUiStore((s) => s.quickViewSlug);
  const closeQuickView = useUiStore((s) => s.closeQuickView);

  const product = slug ? getProductBySlug(slug) : undefined;
  const seller = product ? getSellerById(product.sellerId) : undefined;

  if (!slug) return null;

  return (
    <AnimatePresence>
      {product && seller && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-night/65 backdrop-blur-sm"
            onClick={closeQuickView}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed inset-x-4 top-[5vh] z-[71] mx-auto max-h-[90vh] max-w-5xl overflow-y-auto rounded-2xl bg-ivory shadow-premium-xl scrollbar-hide sm:inset-x-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sand/15 bg-white/95 px-4 py-3 backdrop-blur-sm">
              <p id="quick-view-title" className="font-display text-sm font-bold text-night">
                Aperçu rapide
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href={ROUTES.product(product.slug)}
                  onClick={closeQuickView}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Voir tout →
                </Link>
                <button
                  type="button"
                  onClick={closeQuickView}
                  className="rounded-lg p-2 text-sand hover:bg-surface-light hover:text-night"
                  aria-label="Fermer l'aperçu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid gap-6 p-4 md:grid-cols-2 md:p-6">
              <ProductGallery
                images={product.images}
                title={product.title}
                badges={product.badges?.map(String)}
                sellerName={seller.storeName}
                sellerImage={seller.logoUrl}
                compact
              />
              <ProductBuyPanel
                product={product}
                seller={seller}
                compact
                showSellerCard={false}
                onAddedToCart={closeQuickView}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
