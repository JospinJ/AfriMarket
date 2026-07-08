"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { cn } from "@/lib/utils/cn";
import type { Plan } from "@/types/ads";

export interface PlanCardProps {
  plan: Plan;
  isCurrent?: boolean;
}

export function PlanCard({ plan, isCurrent }: PlanCardProps) {
  const handleSubscribe = () => {
    // TODO API: POST /premium/subscribe → { tier, paymentMethod } → { success }
  };

  return (
    <Card className={cn(isCurrent && "ring-2 ring-gold")}>
      <CardHeader>
        <CardTitle className="capitalize">{plan.tier}</CardTitle>
        <p className="text-2xl font-bold text-night">
          {plan.monthlyPrice === 0 ? "Gratuit" : formatFCFA(plan.monthlyPrice)}
          {plan.monthlyPrice > 0 && <span className="text-sm font-normal text-sand">/mois</span>}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm text-night/80">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="text-green-deep">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <p className="text-xs text-sand">Commission : {plan.commissionPct}%</p>
        <Button
          className="w-full"
          variant={isCurrent ? "outline" : "default"}
          disabled={isCurrent}
          onClick={handleSubscribe}
        >
          {isCurrent ? "Plan actuel" : "Choisir"}
        </Button>
      </CardContent>
    </Card>
  );
}
