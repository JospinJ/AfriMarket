"use client";

import { cn } from "@/lib/utils/cn";
import { AFRICA_REGIONS, type AfricaRegionId } from "@/lib/constants/design";

export interface AfricaRegionFilterProps {
  value: AfricaRegionId;
  onChange: (region: AfricaRegionId) => void;
  className?: string;
}

/** Filtre régional pour analytics — Afrique globale et sous-régions. */
export function AfricaRegionFilter({ value, onChange, className }: AfricaRegionFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group" aria-label="Région">
      {AFRICA_REGIONS.map((region) => (
        <button
          key={region.id}
          type="button"
          onClick={() => onChange(region.id)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            value === region.id
              ? "border-dash-accent bg-dash-accent/15 text-[#c45500] font-semibold"
              : "border-dash-border bg-white text-sand hover:border-dash-accent/50 hover:text-night"
          )}
          aria-pressed={value === region.id}
        >
          {region.label}
        </button>
      ))}
    </div>
  );
}
