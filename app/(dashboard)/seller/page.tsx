"use client";

import Link from "next/link";
import { KpiCard } from "@/components/shared/KpiCard";
import { SimpleLineChart } from "@/components/shared/Charts";
import { RoleGuard } from "@/components/shared/RoleGuard";
import { ProfileDashboard } from "@/components/dashboard/ProfileDashboard";
import { mockDashboardKpis } from "@/lib/mocks/dashboard";
import { mockAdsChartData } from "@/lib/mocks/ads";
import { useRole } from "@/hooks/useRole";
import { useSellerStore } from "@/store/useSellerStore";
import { Package, ShoppingCart, Star, TrendingUp, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

const ICONS = [TrendingUp, ShoppingCart, Star, Package];

export default function SellerDashboardPage() {
  const { tier, can, isNewSeller } = useRole();
  const store = useSellerStore((s) => s.store);
  const isOnboardingComplete = useSellerStore((s) => s.isOnboardingComplete());
  const kpis = mockDashboardKpis.seller;

  return (
    <ProfileDashboard
      headerExtra={
        <>
          {isNewSeller && store && isOnboardingComplete && (
            <div className="mb-4 overflow-hidden rounded-lg border border-green-deep/30 bg-green-deep/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Store className="h-8 w-8 text-green-deep" aria-hidden />
                  <div>
                    <p className="font-semibold text-night">Boutique « {store.storeName} » créée !</p>
                    <p className="text-sm text-sand">
                      Votre vitrine est en ligne. Ajoutez des produits pour booster vos ventes.
                    </p>
                  </div>
                </div>
                <Button asChild size="sm" className="bg-green-deep text-white hover:bg-green-forest">
                  <Link href={ROUTES.store(store.storeSlug)}>Voir ma boutique</Link>
                </Button>
              </div>
            </div>
          )}
          {tier === "basic" && (
            <div className="flex justify-end">
              <Button asChild className="bg-dash-accent text-night hover:bg-dash-accent-hover" size="sm">
                <Link href={ROUTES.sellerPremium}>Passer Premium →</Link>
              </Button>
            </div>
          )}
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} icon={ICONS[i]} />
        ))}
      </div>
      <RoleGuard
        allow={["seller"]}
        minTier="gold"
        fallback={
          <div className="mt-6 overflow-hidden rounded-lg border border-dash-accent/50 bg-white shadow-sm">
            <div className="h-1 bg-dash-accent" aria-hidden />
            <div className="p-6 text-center">
              <p className="font-display font-bold text-night">Analytics complètes — Premium Gold</p>
              <p className="mt-2 text-sm text-sand">
                Débloquez les graphiques détaillés et boostez votre visibilité.
              </p>
              <Button asChild className="mt-4 bg-dash-accent text-night hover:bg-dash-accent-hover" size="sm">
                <Link href="/seller/premium">Voir les plans</Link>
              </Button>
            </div>
          </div>
        }
      >
        {can("viewFullAnalytics") && (
          <div className="mt-6">
            <SimpleLineChart data={mockAdsChartData} title="Ventes (7 jours)" />
          </div>
        )}
      </RoleGuard>
      {/* TODO API: GET /seller/dashboard → { kpis, analytics? } */}
    </ProfileDashboard>
  );
}
