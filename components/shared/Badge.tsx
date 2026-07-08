import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import type { BadgeType } from "@/types";

export const BADGE_CONFIG: Record<
  BadgeType,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" | "gold"; className?: string }
> = {
  trending: { label: "Tendance", variant: "destructive" },
  flash_sale: { label: "Flash", variant: "destructive", className: "bg-terracotta" },
  new: { label: "Nouveau", variant: "default" },
  premium_seller: { label: "Premium", variant: "gold", className: "animate-shimmer bg-gradient-to-r from-primary via-amber to-primary bg-[length:200%_100%] text-night border-0" },
  verified: { label: "Vérifié", variant: "default" },
  fast_delivery: { label: "Livraison rapide", variant: "secondary", className: "text-green-deep" },
};

export interface DynamicBadgeProps {
  type: BadgeType;
  className?: string;
}

export function DynamicBadge({ type, className }: DynamicBadgeProps) {
  const config = BADGE_CONFIG[type];
  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

export interface DynamicBadgeListProps {
  badges: BadgeType[];
  className?: string;
}

export function DynamicBadgeList({ badges, className }: DynamicBadgeListProps) {
  if (badges.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {badges.map((type) => (
        <DynamicBadge key={type} type={type} />
      ))}
    </div>
  );
}
