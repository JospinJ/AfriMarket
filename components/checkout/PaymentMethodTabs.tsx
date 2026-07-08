"use client";

import { cn } from "@/lib/utils/cn";
import type { PaymentMethod } from "@/types/order";

const METHODS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "mobile_money", label: "Mobile Money", icon: "🟢" },
  { id: "card", label: "Carte bancaire", icon: "💳" },
  { id: "cod", label: "Paiement à la livraison", icon: "💵" },
  { id: "wallet", label: "Wallet interne", icon: "🏦" },
];

interface PaymentMethodTabsProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentMethodTabs({ selected, onSelect }: PaymentMethodTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {METHODS.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method.id)}
          className={cn(
            "rounded-xl border p-3 text-center text-sm transition-colors",
            selected === method.id
              ? "border-primary bg-brand-orange-muted font-semibold text-primary"
              : "border-sand/30 bg-white hover:border-sand"
          )}
        >
          <span className="block text-xl">{method.icon}</span>
          {method.label}
        </button>
      ))}
    </div>
  );
}
