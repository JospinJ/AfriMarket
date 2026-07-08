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
    <div className="flex gap-3 rounded-xl bg-white p-3 shadow-sm">
      <Link href={`/products/${product.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={item.image ?? product.images[0] ?? ""}
          alt={item.title ?? product.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div>
            <Link
              href={`/products/${product.slug}`}
              className="font-medium text-night hover:text-green-deep"
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
        <div className="flex items-end justify-between">
          <QuantityStepper
            quantity={item.quantity}
            max={offer.stock}
            moq={offer.moq}
            onChange={(q) => updateQuantity(item.productId, item.mode, q)}
          />
          <span className="font-bold text-night">{formatFCFA(lineTotal)}</span>
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
