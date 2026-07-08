"use client";

import { DataTable } from "@/components/shared/DataTable";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import type { DeliveryZone } from "@/types/delivery";

const STATUS_LABELS: Record<DeliveryZone["status"], string> = {
  covered: "Couvert",
  partial: "Partiel",
  uncovered: "Non couvert",
};

export interface CityTableProps {
  zones: DeliveryZone[];
}

export function CityTable({ zones }: CityTableProps) {
  const rows = zones.map((z) => ({
    id: z.id,
    city: z.city,
    country: z.country,
    status: z.status,
    eta: `${z.etaDays[0]}–${z.etaDays[1]} j`,
    baseFee: formatFCFA(z.baseFee),
    active: z.active,
  }));

  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-night mb-4">Villes</h2>
      <DataTable
        columns={[
          { key: "city", header: "Ville" },
          { key: "country", header: "Pays" },
          {
            key: "status",
            header: "Statut",
            render: (r) => (
              <span className={r.status === "covered" ? "text-green-deep" : r.status === "partial" ? "text-gold" : "text-terracotta"}>
                {STATUS_LABELS[r.status as DeliveryZone["status"]]}
              </span>
            ),
          },
          { key: "eta", header: "Délai" },
          { key: "baseFee", header: "Frais base" },
          {
            key: "active",
            header: "Actif",
            render: (r) => (r.active ? "Oui" : "Non"),
          },
        ]}
        data={rows}
        keyExtractor={(r) => r.id}
      />
    </section>
  );
}
