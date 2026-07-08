"use client";

import { ComparisonTable } from "@/components/premium/ComparisonTable";
import { PlanCard } from "@/components/premium/PlanCard";
import { SubscriptionHeader } from "@/components/premium/SubscriptionHeader";
import { MobileMoneySelector } from "@/components/shared/MobileMoneySelector";
import { mockPremiumPlans } from "@/lib/mocks/dashboard";
import { useRole } from "@/hooks/useRole";

export default function PremiumPage() {
  const { tier } = useRole();
  const currentTier = tier ?? "basic";

  return (
    <div className="space-y-8">
      <SubscriptionHeader currentTier={currentTier} />
      <div className="grid gap-6 md:grid-cols-3">
        {mockPremiumPlans.map((plan) => (
          <PlanCard key={plan.tier} plan={plan} isCurrent={plan.tier === currentTier} />
        ))}
      </div>
      <ComparisonTable plans={mockPremiumPlans} />
      <section className="rounded-2xl border border-sand/20 bg-white p-6 max-w-lg">
        <h2 className="font-display text-lg font-semibold text-night mb-4">Paiement abonnement</h2>
        <MobileMoneySelector onSuccess={() => { /* TODO API: POST /premium/subscribe */ }} />
      </section>
    </div>
  );
}
