"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TargetingPanel } from "@/components/ads/TargetingPanel";
import { MobileMoneySelector } from "@/components/shared/MobileMoneySelector";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import type { AdObjective, AdPlacement } from "@/types/ads";

export function CampaignForm() {
  const [name, setName] = useState("");
  const [objective, setObjective] = useState<AdObjective>("sales");
  const [budget, setBudget] = useState("100000");
  const [placements, setPlacements] = useState<AdPlacement[]>(["home"]);
  const [step, setStep] = useState<"form" | "payment">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleCreate = () => {
    // TODO API: POST /ads/campaigns → { name, objective, budget, placements, targeting } → AdCampaign
    setStep("form");
    setName("");
  };

  if (step === "payment") {
    return (
      <section className="rounded-2xl border border-sand/20 bg-white p-6 max-w-lg">
        <h2 className="font-display text-lg font-semibold text-night mb-2">Paiement campagne</h2>
        <p className="text-sm text-sand mb-4">Budget : {formatFCFA(Number(budget))}</p>
        <MobileMoneySelector onSuccess={handleCreate} />
        <Button variant="ghost" size="sm" className="mt-4" onClick={() => setStep("form")}>
          Retour
        </Button>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-sand/20 bg-white p-6 space-y-6">
      <h2 className="font-display text-lg font-semibold text-night">Nouvelle campagne</h2>
      <div>
        <label htmlFor="camp-name" className="text-sm font-medium text-night">Nom</label>
        <Input id="camp-name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
      </div>
      <div>
        <label htmlFor="camp-objective" className="text-sm font-medium text-night">Objectif</label>
        <select
          id="camp-objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value as AdObjective)}
          className="mt-1 w-full rounded-lg border border-sand/30 px-3 py-2 text-sm min-h-[44px]"
        >
          <option value="sales">Ventes</option>
          <option value="clicks">Clics</option>
          <option value="visibility">Visibilité</option>
          <option value="branding">Notoriété</option>
          <option value="add_to_cart">Ajouts panier</option>
        </select>
      </div>
      <div>
        <label htmlFor="camp-budget" className="text-sm font-medium text-night">Budget total (FCFA)</label>
        <Input id="camp-budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required className="mt-1" />
      </div>
      <TargetingPanel placements={placements} onPlacementsChange={setPlacements} />
      <Button type="submit">Continuer vers le paiement</Button>
    </form>
  );
}
