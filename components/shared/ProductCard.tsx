"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Eye, Gift, Heart, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { usePurchaseModeStore } from "@/store/usePurchaseModeStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useMounted } from "@/hooks/useMounted";
import { IMAGES } from "@/lib/constants/images";
import { useUiStore } from "@/store/useUiStore";
import { deriveBadges } from "@/lib/utils/derive-badges";
import { cn } from "@/lib/utils/cn";
import type { Product, PurchaseMode } from "@/types";
import type { Seller } from "@/types";
import { DynamicBadgeList } from "./Badge";
import { PriceBlock } from "./PriceBlock";
import { ProductCardImageCarousel } from "./ProductCardImageCarousel";
import { StarRating } from "./StarRating";

export interface ProductCardProps {
  product: Product;
  seller?: Seller;
  className?: string;
  /** Active l'effet « Cadeau Surprise » (piloté par la grille, rare et aléatoire) */
  isSurprise?: boolean;
}

/** Positions fixes des particules scintillantes (évite le recalcul par carte) */
const SPARKLES: Array<{
  size: number;
  delay: string;
  pos: React.CSSProperties;
}> = [
  { size: 12, delay: "0s", pos: { top: "8%", left: "12%" } },
  { size: 9, delay: "0.15s", pos: { top: "16%", right: "10%" } },
  { size: 10, delay: "0.3s", pos: { bottom: "34%", left: "8%" } },
  { size: 8, delay: "0.45s", pos: { top: "42%", right: "16%" } },
];

function ProductCardInner({ product, seller, className, isSurprise = false }: ProductCardProps) {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const addItem = useCartStore((s) => s.addItem);
  const getMode = usePurchaseModeStore((s) => s.getMode);
  const openQuickView = useUiStore((s) => s.openQuickView);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const favorited = useFavoritesStore((s) => s.ids.includes(product.id));
  const [justAdded, setJustAdded] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [heartKey, setHeartKey] = useState(0);

  const mode = (mounted ? getMode(product.id) : "express") as PurchaseMode;
  const offer = product.offers.find((o) => o.mode === mode) ?? product.offers[0];
  const badges = seller ? deriveBadges(product, seller) : (product.badges ?? []);
  const isPremium = seller?.tier === "gold" || seller?.tier === "elite";
  const isFavorite = mounted && favorited;
  const surpriseActive = isSurprise && isPremium && !prefersReducedMotion;

  if (!offer) return null;

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product.slug);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
    setHeartKey((k) => k + 1);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      sellerId: product.sellerId,
      mode: offer.mode,
      unitPrice: offer.price,
      quantity: offer.mode === "gros" && offer.moq ? offer.moq : 1,
      title: product.title,
      image: product.images[0],
    });
    setJustAdded(true);
    setBurstKey((k) => k + 1);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <motion.div
      className={cn("perspective-card relative h-full", className)}
      whileHover={{ y: -8 }}
      animate={
        surpriseActive
          ? { scale: [1, 1.045, 1.015, 1], y: [0, -6, -2, 0] }
          : { scale: 1, y: 0 }
      }
      transition={
        surpriseActive
          ? { duration: 0.75, ease: [0.34, 1.4, 0.64, 1] }
          : { type: "spring", stiffness: 380, damping: 24 }
      }
    >
      {/* Halo lumineux « surprise » — hors du conteneur clippé pour la lueur externe */}
      {surpriseActive && <span className="gift-surprise-halo" aria-hidden />}

      <Card
        className={cn(
          "card-shine group/card perspective-card-inner relative h-full overflow-hidden rounded-2xl border-0 bg-white shadow-premium-sm transition-all duration-500 hover:shadow-premium-lg",
          surpriseActive && "gift-surprise-sheen"
        )}
      >
        {/* Particules scintillantes */}
        {surpriseActive &&
          SPARKLES.map((s, i) => (
            <Sparkles
              key={`${burstKey}-sparkle-${i}`}
              className="gift-sparkle"
              style={{ ...s.pos, width: s.size, height: s.size, animationDelay: s.delay }}
              aria-hidden
            />
          ))}

        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-sand/10">
            <ProductCardImageCarousel images={product.images} alt={product.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-night/5 to-transparent opacity-60 transition-opacity duration-500 group-hover/card:opacity-90" />

            {badges.length > 0 && (
              <div className="absolute left-2.5 top-2.5 z-10">
                <DynamicBadgeList badges={badges} />
              </div>
            )}

            {/* Pastille « Offre surprise » */}
            {surpriseActive && (
              <div className="gift-surprise-pill absolute left-2.5 top-2.5 z-20 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-gold px-2.5 py-1 text-[10px] font-bold text-night shadow-glow-orange">
                <Gift className="h-3 w-3" aria-hidden />
                Offre surprise
              </div>
            )}

            {/* Bouton wishlist */}
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={cn(
                "absolute right-2.5 top-2.5 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full glass-panel text-night shadow-premium-sm transition-all hover:scale-110 hover:shadow-glow-orange",
                isFavorite && "text-terracotta"
              )}
              aria-label={
                isFavorite
                  ? `Retirer ${product.title} des favoris`
                  : `Ajouter ${product.title} aux favoris`
              }
              aria-pressed={isFavorite}
            >
              <Heart
                key={heartKey}
                className={cn("h-4 w-4 transition-colors", isFavorite && "fill-terracotta", heartKey > 0 && "heart-pop")}
                aria-hidden
              />
            </button>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex translate-y-3 items-center justify-between opacity-0 transition-all duration-400 group-hover/card:translate-y-0 group-hover/card:opacity-100">
              <button
                type="button"
                onClick={handleQuickView}
                className="inline-flex items-center gap-1 rounded-full glass-panel px-2.5 py-1 text-[10px] font-bold text-night transition hover:shadow-glow-orange"
                aria-label={`Aperçu rapide de ${product.title}`}
              >
                <Eye className="h-3 w-3" aria-hidden />
                Aperçu
              </button>
              <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-night shadow-glow-orange">
                Détails →
              </span>
            </div>
          </div>
        </Link>

        <CardContent className="flex min-w-0 flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
          <Link href={`/products/${product.slug}`} className="min-w-0">
            <h3 className="line-clamp-2 break-words text-sm font-semibold leading-snug text-night transition-colors group-hover/card:text-primary">
              {product.title}
            </h3>
          </Link>

          <StarRating rating={product.rating.average} count={product.rating.count} size="sm" />

          <PriceBlock offer={offer} size="sm" />
        </CardContent>

        <CardFooter className="p-3 pt-0 sm:p-4 sm:pt-0">
          <motion.div className="relative w-full min-w-0" whileTap={{ scale: 0.96 }}>
            {/* Éclat au clic */}
            {burstKey > 0 && !prefersReducedMotion && (
              <span
                key={burstKey}
                className="cart-burst pointer-events-none absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12 rounded-full bg-secondary/40"
                aria-hidden
              />
            )}
            <Button
              type="button"
              className={cn(
                "w-full min-w-0 whitespace-normal rounded-xl px-2 text-[11px] font-semibold shadow-premium-sm transition-all sm:px-3 sm:text-xs",
                justAdded
                  ? "bg-secondary hover:bg-secondary shadow-glow-green"
                  : "hover:shadow-glow-orange"
              )}
              size="sm"
              onClick={handleAddToCart}
              aria-label={`Ajouter ${product.title} au panier`}
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" aria-hidden />
                  Ajouté !
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" aria-hidden />
                  Ajouter
                </>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export const ProductCard = memo(ProductCardInner, (prev, next) => {
  return (
    prev.product.id === next.product.id &&
    prev.seller?.id === next.seller?.id &&
    prev.className === next.className &&
    prev.isSurprise === next.isSurprise
  );
});
