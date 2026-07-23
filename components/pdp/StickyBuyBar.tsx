"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { PurchaseModeChip } from "@/components/shared/PurchaseModeChip";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { Offer } from "@/types/product";

interface StickyBuyBarProps {
  offer: Offer;
  onAddToCart: () => void;
  onBuyNow: () => void;
  disabled?: boolean;
  pulse?: boolean;
}

export function StickyBuyBar({
  offer,
  onAddToCart,
  onBuyNow,
  disabled,
  pulse,
}: StickyBuyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-sand/20 bg-white/95 p-3 shadow-premium-lg backdrop-blur-md safe-pb md:hidden">
      <div className="mb-2 flex min-w-0 items-center justify-between gap-2">
        <div className="min-w-0 shrink">
          <PurchaseModeChip
            mode={offer.mode}
            etaDays={offer.deliveryEtaDays}
            moq={offer.moq}
            size="sm"
          />
        </div>
        <span className="shrink-0 font-display text-base font-bold tabular-nums text-night sm:text-lg">
          {formatFCFA(offer.price)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="icon" className="h-11 w-11 shrink-0">
          <Link href={ROUTES.cart} aria-label="Voir le panier">
            <ShoppingCart size={20} />
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={onAddToCart}
          className={cn(
            "flex-1 border-secondary text-secondary",
            pulse && "animate-pulse bg-brand-green-muted"
          )}
        >
          Panier
        </Button>
        <Button
          type="button"
          disabled={disabled}
          onClick={onBuyNow}
          className="flex-1 shadow-glow-orange"
        >
          Acheter
        </Button>
      </div>
    </div>
  );
}
