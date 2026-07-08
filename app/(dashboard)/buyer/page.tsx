"use client";

import { KpiCard } from "@/components/shared/KpiCard";
import { ProfileDashboard } from "@/components/dashboard/ProfileDashboard";
import { mockDashboardKpis } from "@/lib/mocks/dashboard";
import { Gift, Package, Shield, Star } from "lucide-react";

const ICONS = [Package, Gift, Shield, Star];

export default function BuyerDashboardPage() {
  const kpis = mockDashboardKpis.buyer;

  return (
    <ProfileDashboard>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} icon={ICONS[i]} />
        ))}
      </div>
      {/* TODO API: GET /buyer/dashboard → { kpis, orders } */}
    </ProfileDashboard>
  );
}
