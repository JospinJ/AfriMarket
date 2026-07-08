"use client";

import { CampaignForm } from "@/components/ads/CampaignForm";
import { CampaignLivePanel } from "@/components/ads/CampaignLivePanel";
import { mockCampaigns } from "@/lib/mocks/ads";
import { RoleGuard } from "@/components/shared/RoleGuard";

export default function AdsPage() {
  return (
    <RoleGuard allow={["seller"]}>
      <div className="space-y-8">
        <header>
          <h1 className="font-display text-2xl font-bold text-night">Gestionnaire publicitaire</h1>
          <p className="mt-1 text-sm text-sand">Créez et gérez vos campagnes Ads</p>
        </header>
        <CampaignForm />
        <section>
          <h2 className="font-display text-lg font-semibold text-night mb-4">Campagnes actives</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockCampaigns.map((c) => (
              <CampaignLivePanel key={c.id} campaign={c} />
            ))}
          </div>
        </section>
      </div>
    </RoleGuard>
  );
}
