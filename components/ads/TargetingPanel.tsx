"use client";

import type { AdPlacement } from "@/types/ads";

const PLACEMENT_OPTIONS: { value: AdPlacement; label: string }[] = [
  { value: "home", label: "Page d'accueil" },
  { value: "search", label: "Résultats recherche" },
  { value: "category", label: "Pages catégorie" },
  { value: "recommendations", label: "Recommandations" },
  { value: "store", label: "Boutique vendeur" },
];

export interface TargetingPanelProps {
  placements: AdPlacement[];
  onPlacementsChange: (placements: AdPlacement[]) => void;
}

export function TargetingPanel({ placements, onPlacementsChange }: TargetingPanelProps) {
  const toggle = (p: AdPlacement) => {
    if (placements.includes(p)) {
      onPlacementsChange(placements.filter((x) => x !== p));
    } else {
      onPlacementsChange([...placements, p]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-night mb-2">Emplacements</p>
        <div className="flex flex-wrap gap-2">
          {PLACEMENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`rounded-lg border px-3 py-2 text-xs min-h-[44px] ${
                placements.includes(opt.value)
                  ? "border-green-deep bg-green-deep/10 text-green-deep"
                  : "border-sand/30 text-night"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-night mb-2">Ciblage géographique</p>
        <p className="text-xs text-sand">Cameroun — Douala, Yaoundé (mock)</p>
      </div>
      {/* TODO API: chargement ciblage avancé (âge, intérêts, comportement) */}
    </div>
  );
}
