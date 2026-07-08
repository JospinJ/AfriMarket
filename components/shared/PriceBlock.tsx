import { formatFCFA, computeSaving } from "@/lib/utils/format-fcfa";
import { cn } from "@/lib/utils/cn";
import type { Offer } from "@/types/product";
import { PurchaseModeChip } from "./PurchaseModeChip";

interface PriceBlockProps {
  offer: Offer;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceBlock({ offer, size = "md", className }: PriceBlockProps) {
  const saving = computeSaving(offer);
  const priceSize =
    size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-base";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <PurchaseModeChip
        mode={offer.mode}
        etaDays={offer.deliveryEtaDays}
        moq={offer.moq}
        size={size === "lg" ? "md" : "sm"}
      />
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={cn("font-bold text-night", priceSize)}>
          {formatFCFA(offer.price)}
        </span>
        {offer.originalPrice && offer.originalPrice > offer.price && (
          <>
            <span className="text-sm text-sand line-through">
              {formatFCFA(offer.originalPrice)}
            </span>
            {saving && (
              <span className="text-sm font-semibold text-terracotta">
                -{saving.percent}%
              </span>
            )}
          </>
        )}
      </div>
      {saving && (
        <span className="text-xs text-green-deep">
          Économie {formatFCFA(saving.amount)}
        </span>
      )}
    </div>
  );
}
