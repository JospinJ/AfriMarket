"use client";

import { useState } from "react";
import { SimpleBarChart, SimpleLineChart } from "@/components/shared/Charts";
import { KpiCard } from "@/components/shared/KpiCard";
import { AfricaRegionFilter } from "@/components/shared/AfricaRegionFilter";
import { ProfileDashboard } from "@/components/dashboard/ProfileDashboard";
import { mockDashboardKpis } from "@/lib/mocks/dashboard";
import { mockAdsChartData } from "@/lib/mocks/ads";
import { AFRICA_REGIONS, type AfricaRegionId } from "@/lib/constants/design";
import { BarChart3, Globe2, Package, TrendingUp, Users } from "lucide-react";

const ICONS = [Globe2, Package, Users, TrendingUp];

export function AdminAnalyticsContent() {
  const [region, setRegion] = useState<AfricaRegionId>("global");
  const kpis = mockDashboardKpis.admin;
  const regionLabel = AFRICA_REGIONS.find((r) => r.id === region)?.label ?? region;

  return (
    <ProfileDashboard
      headerExtra={
        <div className="flex justify-end">
          <AfricaRegionFilter value={region} onChange={setRegion} />
        </div>
      }
    >
      <p className="-mt-2 mb-4 text-sm text-sand">Région : {regionLabel}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} icon={ICONS[i]} region={regionLabel} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SimpleBarChart data={mockAdsChartData} title={`GMV — ${regionLabel}`} />
        <SimpleLineChart data={mockAdsChartData} title="Croissance utilisateurs actifs" />
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-sand">
        <BarChart3 className="h-3.5 w-3.5" aria-hidden />
        {/* TODO API: GET /admin/analytics?region= → { kpis, charts } */}
        Données mockées — filtre régional prêt pour l&apos;API.
      </p>
    </ProfileDashboard>
  );
}
