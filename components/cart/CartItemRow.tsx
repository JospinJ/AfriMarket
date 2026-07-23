"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/types/order";
import { getProductById } from "@/lib/mocks/products";
import { getSellerById } from "@/lib/mocks/sellers";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { PriceBlock } from "@/components/shared/PriceBlock";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { SellerBadge } from "@/components/shared/SellerBadge";
import { useCartStore } from "@/store/useCartStore";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const product = getProductById(item.productId);
  const seller = getSellerById(item.sellerId);
  const offer = product?.offers.find((o) => o.mode === item.mode);

  if (!product || !offer) return null;

  const lineTotal = item.unitPrice * item.quantity;
  const moqError = item.mode === "gros" && offer.moq && item.quantity < offer.moq;

  return (
    <div className="flex min-w-0 gap-3 rounded-xl bg-white p-3 shadow-sm">
      <Link href={`/products/${product.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={item.image ?? product.images[0] ?? ""}
          alt={item.title ?? product.title}
          fill
          sizes="80px"
          className="object-contain bg-ivory p-1"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${product.slug}`}
              className="line-clamp-2 break-words font-medium text-night hover:text-green-deep"
            >
              {item.title ?? product.title}
            </Link>
            {seller && (
              <SellerBadge
                storeName={seller.storeName}
                tier={seller.tier}
                verified={seller.kycStatus === "verified"}
                className="mt-1"
              />
            )}
          </div>
          <button
            type="button"
            aria-label="Supprimer du panier"
            onClick={() => removeItem(item.productId, item.mode)}
            className="text-sand hover:text-terracotta"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <PriceBlock offer={offer} size="sm" />
        <div className="flex min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-end sm:justify-between">
          <QuantityStepper
            quantity={item.quantity}
            max={offer.stock}
            moq={offer.moq}
            onChange={(q) => updateQuantity(item.productId, item.mode, q)}
          />
          <span className="shrink-0 self-end font-bold tabular-nums text-night sm:self-auto">{formatFCFA(lineTotal)}</span>
        </div>
        {moqError && (
          <p className="text-xs text-terracotta">
            Quantité minimale (Gros) : {offer.moq}
          </p>
        )}
      </div>
    </div>
  );
}
