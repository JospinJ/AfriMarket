"use client";

import { useState } from "react";
import { DisputeQueue } from "@/components/disputes/DisputeQueue";
import { DisputeDetail } from "@/components/disputes/DisputeDetail";
import { mockDisputes } from "@/lib/mocks/disputes";
import { useRole } from "@/hooks/useRole";

export default function DisputesPage() {
  const { can } = useRole();
  const [selectedId, setSelectedId] = useState(mockDisputes[0]?.id ?? "");
  const selected = mockDisputes.find((d) => d.id === selectedId);

  if (!can("moderateDispute")) {
    return (
      <div className="rounded-lg border border-sand/20 bg-white p-8 text-center text-sand">
        Accès réservé au support
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-night">File des litiges</h1>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <DisputeQueue disputes={mockDisputes} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <div className="lg:col-span-3">
          {selected ? <DisputeDetail dispute={selected} /> : (
            <p className="text-sand">Sélectionnez un litige</p>
          )}
        </div>
      </div>
    </div>
  );
}
