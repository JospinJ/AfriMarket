"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface QuantityStepperProps {
  quantity: number;
  min?: number;
  max: number;
  moq?: number;
  onChange: (quantity: number) => void;
  className?: string;
}

export function QuantityStepper({
  quantity,
  min = 1,
  max,
  moq,
  onChange,
  className,
}: QuantityStepperProps) {
  const effectiveMin = moq && moq > min ? moq : min;
  const canDecrease = quantity > effectiveMin;
  const canIncrease = quantity < max;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="inline-flex items-center rounded-lg border border-sand/30 bg-white">
        <button
          type="button"
          aria-label="Diminuer la quantité"
          disabled={!canDecrease}
          onClick={() => onChange(quantity - 1)}
          className="flex h-11 w-11 items-center justify-center text-night disabled:opacity-40"
        >
          <Minus size={18} />
        </button>
        <span className="min-w-[2.5rem] text-center font-medium">{quantity}</span>
        <button
          type="button"
          aria-label="Augmenter la quantité"
          disabled={!canIncrease}
          onClick={() => onChange(quantity + 1)}
          className="flex h-11 w-11 items-center justify-center text-night disabled:opacity-40"
        >
          <Plus size={18} />
        </button>
      </div>
      {moq && quantity < moq && (
        <p className="text-xs text-terracotta">Quantité minimale : {moq}</p>
      )}
    </div>
  );
}
