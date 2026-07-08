"use client";

import { KpiCard } from "@/components/shared/KpiCard";
import { SimpleLineChart } from "@/components/shared/Charts";
import { mockDashboardKpis } from "@/lib/mocks/dashboard";
import { mockAdsChartData } from "@/lib/mocks/ads";
import { AlertTriangle, Clock, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ICONS = [AlertTriangle, CheckCircle, Clock, TrendingUp];

export default function SupportDashboardPage() {
  const kpis = mockDashboardKpis.support;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-night">Support</h1>
          <p className="mt-1 text-sm text-sand">Modération et litiges</p>
        </div>
        <Button asChild size="sm">
          <Link href="/support/disputes">File des litiges</Link>
        </Button>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} icon={ICONS[i]} />
        ))}
      </div>
      <SimpleLineChart data={mockAdsChartData} title="Litiges résolus (7 jours)" />
      {/* TODO API: GET /support/dashboard → { kpis, disputes } */}
    </div>
  );
}
