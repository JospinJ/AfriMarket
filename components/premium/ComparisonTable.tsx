import { DataTable } from "@/components/shared/DataTable";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import type { Plan } from "@/types/ads";

export interface ComparisonTableProps {
  plans: Plan[];
}

export function ComparisonTable({ plans }: ComparisonTableProps) {
  const rows = plans.map((p) => ({
    tier: p.tier,
    monthly: p.monthlyPrice === 0 ? "Gratuit" : formatFCFA(p.monthlyPrice),
    commission: `${p.commissionPct}%`,
    boost: `x${p.visibilityBoost}`,
    features: p.features.length,
  }));

  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-night mb-4">Comparatif des plans</h2>
      <DataTable
        columns={[
          { key: "tier", header: "Plan", render: (r) => <span className="capitalize font-medium">{r.tier}</span> },
          { key: "monthly", header: "Mensuel" },
          { key: "commission", header: "Commission" },
          { key: "boost", header: "Visibilité" },
          { key: "features", header: "Fonctionnalités" },
        ]}
        data={rows}
        keyExtractor={(r) => r.tier}
      />
    </section>
  );
}
