"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { getProductById } from "@/lib/mocks/products";
import { MultiVendorGroup } from "@/components/cart/MultiVendorGroup";
import { CouponInput } from "@/components/cart/CouponInput";
import { CartSummarySticky } from "@/components/cart/CartSummarySticky";
import { CartUpsell } from "@/components/cart/CartUpsell";
import { TrustStrip } from "@/components/shared/TrustStrip";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ROUTES } from "@/lib/constants/routes";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

  const groupedBySeller = items.reduce<Record<string, typeof items>>((acc, item) => {
    const group = acc[item.sellerId] ?? [];
    group.push(item);
    acc[item.sellerId] = group;
    return acc;
  }, {});

  const sellerCount = Object.keys(groupedBySeller).length;
  const subtotal = getSubtotal();

  const hasMoqErrors = items.some((item) => {
    if (item.mode !== "gros") return false;
    const product = getProductById(item.productId);
    const offer = product?.offers.find((o) => o.mode === "gros");
    return offer?.moq !== undefined && item.quantity < offer.moq;
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
        <ShoppingBag size={64} className="text-sand/50" />
        <h1 className="mt-4 font-display text-2xl font-bold text-night">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-sand">Découvrez nos produits et commencez vos achats.</p>
        <Link
          href={ROUTES.home}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow-orange hover:bg-primary-hover"
        >
          Découvrir des produits
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-48 md:pb-6">
      <RevealOnScroll variant="fadeUpBlur">
        <h1 className="font-display text-2xl font-bold text-night md:text-3xl">Votre panier</h1>
        <p className="mt-1 text-sm text-sand">
          {getItemCount()} article{getItemCount() > 1 ? "s" : ""} · Paiement Mobile Money au checkout
        </p>
      </RevealOnScroll>

      <RevealOnScroll variant="fadeUp" delay={0.05} className="mt-4">
        <TrustStrip variant="full" />
      </RevealOnScroll>

      {sellerCount > 1 && (
        <p className="mt-4 rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-sm text-night">
          {sellerCount} vendeurs — livraisons séparées, un seul paiement sécurisé.
        </p>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {Object.entries(groupedBySeller).map(([sellerId, sellerItems], i) => (
            <RevealOnScroll key={sellerId} variant="fadeUp" delay={0.06 * i}>
              <MultiVendorGroup sellerId={sellerId} items={sellerItems} />
            </RevealOnScroll>
          ))}
          <CouponInput />
          <CartUpsell />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <CartSummarySticky
              subtotal={subtotal}
              itemCount={getItemCount()}
              hasMoqErrors={hasMoqErrors}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
