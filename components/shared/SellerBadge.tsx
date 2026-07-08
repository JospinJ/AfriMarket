import { cn } from "@/lib/utils/cn";
import type { SellerTier } from "@/types/user";

interface SellerBadgeProps {
  tier?: SellerTier;
  verified?: boolean;
  storeName?: string;
  className?: string;
}

export function SellerBadge({ tier, verified, storeName, className }: SellerBadgeProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {storeName && (
        <span className="text-sm font-semibold text-night">{storeName}</span>
      )}
      {verified && (
        <span className="rounded-full bg-brand-green-muted px-2 py-0.5 text-xs font-medium text-secondary">
          ⭐ Vérifié
        </span>
      )}
      {tier === "gold" && (
        <span className="animate-shimmer rounded-full bg-gradient-to-r from-primary via-amber to-primary bg-[length:200%_100%] px-2 py-0.5 text-xs font-bold text-night shadow-sm">
          👑 Gold
        </span>
      )}
      {tier === "elite" && (
        <span className="relative overflow-hidden rounded-full bg-night px-2 py-0.5 text-xs font-bold text-primary">
          <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-primary/40 to-transparent bg-[length:200%_100%]" />
          <span className="relative">💎 Elite</span>
        </span>
      )}
      {tier === "basic" && (
        <span className="rounded-full border border-dash-border bg-dash-bg px-2 py-0.5 text-xs text-sand">
          Basic
        </span>
      )}
    </div>
  );
}
