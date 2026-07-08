"use client";

import { KpiCard } from "@/components/shared/KpiCard";
import { SimpleBarChart } from "@/components/shared/Charts";
import { ProfileDashboard } from "@/components/dashboard/ProfileDashboard";
import { mockDashboardKpis } from "@/lib/mocks/dashboard";
import { mockAdsChartData } from "@/lib/mocks/ads";
import { MapPin, Star, TrendingUp, Truck } from "lucide-react";

const ICONS = [Truck, TrendingUp, MapPin, Star];

export default function DriverDashboardPage() {
  const kpis = mockDashboardKpis.driver;

  return (
    <ProfileDashboard>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} icon={ICONS[i]} />
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-sand/15 bg-white p-4 shadow-sm">
        <SimpleBarChart data={mockAdsChartData} title="Livraisons par jour" />
      </div>
      {/* TODO API: GET /driver/dashboard → { kpis, deliveries } */}
    </ProfileDashboard>
  );
}
