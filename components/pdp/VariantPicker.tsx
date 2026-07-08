"use client";

import { cn } from "@/lib/utils/cn";
import type { ProductVariant } from "@/types/product";

interface VariantPickerProps {
  variants: ProductVariant[];
  selectedId?: string;
  onSelect: (variantId: string) => void;
}

export function VariantPicker({ variants, selectedId, onSelect }: VariantPickerProps) {
  if (variants.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-night">Variante</h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            className={cn(
              "min-h-[44px] rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              selectedId === variant.id
                ? "border-green-deep bg-green-deep text-white"
                : "border-sand/30 bg-white text-night hover:border-sand"
            )}
          >
            {variant.label}
          </button>
        ))}
      </div>
    </div>
  );
}
