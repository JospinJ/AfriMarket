"use client";

import { KpiCard } from "@/components/shared/KpiCard";
import { SimpleBarChart } from "@/components/shared/Charts";
import { ProfileDashboard } from "@/components/dashboard/ProfileDashboard";
import { mockDashboardKpis } from "@/lib/mocks/dashboard";
import { mockAdsChartData } from "@/lib/mocks/ads";
import { BarChart3, Package, Shield, Users } from "lucide-react";

const ICONS = [BarChart3, Package, Shield, Users];

export default function AdminDashboardPage() {
  const kpis = mockDashboardKpis.admin;

  return (
    <ProfileDashboard>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} icon={ICONS[i]} />
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-sand/15 bg-white p-4 shadow-sm">
        <SimpleBarChart data={mockAdsChartData} title="GMV hebdomadaire" />
      </div>
      {/* TODO API: GET /admin/dashboard → { kpis, charts } */}
    </ProfileDashboard>
  );
}
