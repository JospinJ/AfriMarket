"use client";

import { KpiCard } from "@/components/shared/KpiCard";
import { SimpleBarChart, SimpleLineChart } from "@/components/shared/Charts";
import { DataTable } from "@/components/shared/DataTable";
import { mockAdsChartData, mockCampaigns } from "@/lib/mocks/ads";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { Eye, MousePointer, ShoppingCart, TrendingUp } from "lucide-react";

export function AdsInsights() {
  const totals = mockCampaigns.reduce(
    (acc, c) => ({
      impressions: acc.impressions + (c.metrics?.impressions ?? 0),
      clicks: acc.clicks + (c.metrics?.clicks ?? 0),
      conversions: acc.conversions + (c.metrics?.conversions ?? 0),
      revenue: acc.revenue + (c.metrics?.revenue ?? 0),
    }),
    { impressions: 0, clicks: 0, conversions: 0, revenue: 0 }
  );

  const tableData = mockCampaigns.map((c) => ({
    id: c.id,
    name: c.name,
    spent: formatFCFA(c.spent),
    roi: c.metrics ? `${c.metrics.roi}x` : "—",
    status: c.status,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Impressions" value={totals.impressions.toLocaleString("fr-FR")} icon={Eye} />
        <KpiCard title="Clics" value={totals.clicks.toLocaleString("fr-FR")} icon={MousePointer} />
        <KpiCard title="Conversions" value={totals.conversions.toLocaleString("fr-FR")} icon={ShoppingCart} />
        <KpiCard title="Revenus" value={formatFCFA(totals.revenue)} icon={TrendingUp} trend="up" change="+18%" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleBarChart data={mockAdsChartData} title="Impressions (7 jours)" />
        <SimpleLineChart data={mockAdsChartData} title="Clics (7 jours)" />
      </div>
      <DataTable
        columns={[
          { key: "name", header: "Campagne" },
          { key: "spent", header: "Dépensé" },
          { key: "roi", header: "ROI" },
          { key: "status", header: "Statut", render: (r) => <span className="capitalize">{r.status}</span> },
        ]}
        data={tableData}
        keyExtractor={(r) => r.id}
      />
      {/* TODO API: GET /ads/analytics → { kpis, charts, campaigns } */}
    </div>
  );
}
