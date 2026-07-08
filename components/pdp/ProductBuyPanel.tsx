"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, Share2, ExternalLink } from "lucide-react";
import type { Product, PurchaseMode } from "@/types/product";
import type { Seller } from "@/types/seller";
import { usePurchaseModeStore } from "@/store/usePurchaseModeStore";
import { useCartStore } from "@/store/useCartStore";
import { PurchaseModeSelector } from "@/components/pdp/PurchaseModeSelector";
import { VariantPicker } from "@/components/pdp/VariantPicker";
import { SellerMiniCard } from "@/components/pdp/SellerMiniCard";
import { PriceBlock } from "@/components/shared/PriceBlock";
import { StarRating } from "@/components/shared/StarRating";
import { TrustStrip } from "@/components/shared/TrustStrip";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { Button } from "@/components/ui/button";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { ROUTES } from "@/lib/constants/routes";
import {
  buildProductWhatsAppMessage,
  buildProductWhatsAppMessageClient,
  buildWhatsAppUrl,
  openWhatsAppShare,
} from "@/lib/utils/whatsapp-share";

interface ProductBuyPanelProps {
  product: Product;
  seller: Seller;
  compact?: boolean;
  showSellerCard?: boolean;
  onAddedToCart?: () => void;
}

export function ProductBuyPanel({
  product,
  seller,
  compact = false,
  showSellerCard = true,
  onAddedToCart,
}: ProductBuyPanelProps) {
  const router = useRouter();
  const { getMode, setMode } = usePurchaseModeStore();
  const addItem = useCartStore((s) => s.addItem);
  const selectedMode = getMode(product.id);
  const selectedOffer =
    product.offers.find((o) => o.mode === selectedMode) ?? product.offers[0];
  const [variantId, setVariantId] = useState<string | undefined>(
    product.variants?.[0]?.id
  );
  const [quantity, setQuantity] = useState(
    selectedOffer?.mode === "gros" && selectedOffer.moq ? selectedOffer.moq : 1
  );

  if (!selectedOffer) return null;

  const outOfStock = selectedOffer.stock <= 0;
  const moq = selectedOffer.mode === "gros" ? selectedOffer.moq : undefined;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      sellerId: product.sellerId,
      variantId,
      mode: selectedMode,
      unitPrice: selectedOffer.price,
      quantity,
      title: product.title,
      image: product.images[0],
    });
    onAddedToCart?.();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(ROUTES.checkout);
  };

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${ROUTES.product(product.slug)}`
        : ROUTES.product(product.slug);
    if (navigator.share) {
      await navigator.share({ title: product.title, url });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  };

  const priceLabel = formatFCFA(selectedOffer.price);
  const whatsappMessage = buildProductWhatsAppMessage(
    product.title,
    priceLabel,
    product.slug
  );
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  const handleWhatsAppShare = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const message = buildProductWhatsAppMessageClient(
      product.title,
      priceLabel,
      product.slug
    );
    openWhatsAppShare(message);
  };

  return (
    <div className="space-y-5">
      <div>
        {product.brand && (
          <p className="text-sm font-medium text-sand">{product.brand}</p>
        )}
        <h1
          className={
            compact
              ? "font-display text-xl font-bold text-night"
              : "font-display text-2xl font-bold text-night md:text-3xl"
          }
        >
          {product.title}
        </h1>
        <StarRating
          rating={product.rating.average}
          count={product.rating.count}
          className="mt-2"
        />
        {product.soldCount && (
          <p className="mt-1 text-sm text-sand">{product.soldCount} vendus</p>
        )}
      </div>

      <PurchaseModeSelector
        offers={product.offers}
        selected={selectedMode}
        onSelect={(mode: PurchaseMode) => {
          setMode(product.id, mode);
          const offer = product.offers.find((o) => o.mode === mode);
          if (offer?.mode === "gros" && offer.moq) setQuantity(offer.moq);
        }}
        compact={compact}
      />

      <PriceBlock offer={selectedOffer} size={compact ? "md" : "lg"} />

      <p className="text-sm text-night">
        {outOfStock ? (
          <span className="font-medium text-terracotta">Rupture de stock</span>
        ) : selectedOffer.stock <= 5 ? (
          <span className="font-medium text-terracotta">
            🔥 Plus que {selectedOffer.stock} en {selectedMode}
          </span>
        ) : (
          <span className="text-secondary">✓ En stock — prêt à expédier</span>
        )}
      </p>

      {product.variants && product.variants.length > 0 && (
        <VariantPicker
          variants={product.variants}
          selectedId={variantId}
          onSelect={setVariantId}
        />
      )}

      <div>
        <p className="mb-2 text-sm font-semibold text-night">Quantité</p>
        <QuantityStepper
          quantity={quantity}
          min={1}
          max={selectedOffer.stock}
          moq={moq}
          onChange={setQuantity}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          disabled={outOfStock}
          onClick={handleBuyNow}
          className="flex-1 shadow-glow-orange"
        >
          Acheter maintenant
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={outOfStock}
          onClick={handleAddToCart}
          className="flex-1 border-secondary text-secondary hover:bg-brand-green-muted"
        >
          Ajouter au panier
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={whatsappUrl}
          onClick={handleWhatsAppShare}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white sm:flex-none"
        >
          <MessageCircle size={18} aria-hidden />
          WhatsApp
        </a>
        <Button type="button" variant="outline" size="sm" onClick={handleShare} className="gap-2">
          <Share2 size={16} aria-hidden />
          Partager
        </Button>
        {compact && (
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href={ROUTES.product(product.slug)}>
              <ExternalLink size={16} aria-hidden />
              Fiche complète
            </Link>
          </Button>
        )}
      </div>

      <TrustStrip variant={compact ? "compact" : "full"} />

      {showSellerCard && <SellerMiniCard seller={seller} />}
    </div>
  );
}
