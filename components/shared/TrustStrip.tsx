import { BadgeCheck, Lock, Shield, Smartphone, Truck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type TrustVariant = "compact" | "full" | "checkout";

interface TrustStripProps {
  variant?: TrustVariant;
  className?: string;
}

const ITEMS = [
  { icon: Lock, label: "Paiement sécurisé", short: "Sécurisé" },
  { icon: Shield, label: "Protection acheteur", short: "Protégé" },
  { icon: BadgeCheck, label: "Vendeurs vérifiés KYC", short: "Vérifié" },
  { icon: Smartphone, label: "Mobile Money + SMS", short: "Mobile Money" },
  { icon: Truck, label: "Livraison garantie", short: "Livraison" },
] as const;

export function TrustStrip({ variant = "full", className }: TrustStripProps) {
  const items = variant === "compact" ? ITEMS.slice(0, 3) : ITEMS;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        variant === "checkout" && "justify-center rounded-xl border border-secondary/20 bg-brand-green-muted/60 px-4 py-3",
        variant === "full" && "rounded-xl border border-sand/20 bg-white px-4 py-3 shadow-premium-sm",
        variant === "compact" && "gap-2",
        className
      )}
      role="list"
      aria-label="Garanties de confiance"
    >
      {items.map(({ icon: Icon, label, short }) => (
        <span
          key={label}
          role="listitem"
          className={cn(
            "inline-flex items-center gap-1.5 text-secondary",
            variant === "compact" ? "text-[10px] font-medium" : "text-xs font-medium"
          )}
        >
          <Icon
            className={cn("shrink-0 text-secondary", variant === "compact" ? "h-3 w-3" : "h-3.5 w-3.5")}
            aria-hidden
          />
          {variant === "compact" ? short : label}
        </span>
      ))}
    </div>
  );
}
