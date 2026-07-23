"use client";

import { cn } from "@/lib/utils/cn";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { getZoneByCity } from "@/lib/mocks/delivery-zones";
import type { CountryCode } from "@/types/common";

export type DeliveryMethod = "standard" | "express" | "moto" | "pickup_point" | "cod";

const METHODS: {
  id: DeliveryMethod;
  label: string;
  icon: string;
  extraFee: number;
}[] = [
  { id: "moto", label: "Livraison moto", icon: "🏍", extraFee: 0 },
  { id: "express", label: "Express", icon: "⚡", extraFee: 1000 },
  { id: "standard", label: "Standard", icon: "📦", extraFee: 0 },
  { id: "pickup_point", label: "Point relais", icon: "📍", extraFee: -500 },
  { id: "cod", label: "Paiement à la livraison", icon: "💵", extraFee: 500 },
];

interface DeliveryMethodPickerProps {
  country: CountryCode;
  city: string;
  selected: DeliveryMethod;
  onSelect: (method: DeliveryMethod) => void;
}

export function DeliveryMethodPicker({
  country,
  city,
  selected,
  onSelect,
}: DeliveryMethodPickerProps) {
  const zone = getZoneByCity(country, city);
  const baseFee = zone?.baseFee ?? 2500;

  return (
    <div className="space-y-3">
      <p className="text-sm text-sand">
        Zone : {zone ? `${city} (${zone.status})` : "Non couverte — vérifiez votre adresse"}
      </p>
      <div className="grid gap-2">
        {METHODS.map((method) => {
          const fee = Math.max(0, baseFee + method.extraFee);
          const available = !!zone;
          return (
            <button
              key={method.id}
              type="button"
              disabled={!available}
              onClick={() => onSelect(method.id)}
              className={cn(
                "flex min-w-0 items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors sm:p-4",
                selected === method.id
                  ? "border-green-deep bg-green-deep/5"
                  : "border-sand/30 bg-white hover:border-sand",
                !available && "opacity-50"
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 text-xl" aria-hidden>{method.icon}</span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-night">{method.label}</p>
                  {zone && (
                    <p className="text-xs text-sand">
                      {zone.etaDays[0]}–{zone.etaDays[1]} jours
                    </p>
                  )}
                </div>
              </div>
              <span className="shrink-0 tabular-nums font-semibold text-night">{formatFCFA(fee)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
