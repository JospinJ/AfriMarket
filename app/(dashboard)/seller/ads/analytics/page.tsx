"use client";

import { AdsHeader } from "@/components/ads/AdsHeader";
import { AdsInsights } from "@/components/ads/AdsInsights";
import { RoleGuard } from "@/components/shared/RoleGuard";

export default function AdsAnalyticsPage() {
  return (
    <RoleGuard allow={["seller"]} minTier="gold" fallback={
      <div className="rounded-lg border border-gold/30 bg-gold/5 p-8 text-center">
        <p className="font-display text-lg font-semibold text-night">Analytics Ads — Premium Gold requis</p>
        <p className="mt-2 text-sm text-sand">Passez au plan Gold ou Elite pour accéder aux analytics complètes.</p>
      </div>
    }>
      <div className="space-y-6">
        <AdsHeader />
        <AdsInsights />
      </div>
    </RoleGuard>
  );
}
