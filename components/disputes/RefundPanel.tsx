"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleGuard } from "@/components/shared/RoleGuard";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import type { Resolution } from "@/types/dispute";

export interface RefundPanelProps {
  disputeId: string;
  currentRefund?: number;
  resolution?: Resolution;
}

export function RefundPanel({ disputeId, currentRefund, resolution }: RefundPanelProps) {
  const [amount, setAmount] = useState(currentRefund?.toString() ?? "");

  const handleRefund = (type: Resolution) => {
    // TODO API: PATCH /disputes/:id/refund → { resolution, refundAmount } → { success }
    void disputeId;
    void type;
    void amount;
  };

  return (
    <RoleGuard allow={["admin"]}>
      <section className="rounded-lg border border-green-deep/20 bg-green-deep/5 p-4">
        <h3 className="text-sm font-semibold text-night mb-3">Résolution & remboursement</h3>
        {resolution && currentRefund !== undefined && (
          <p className="mb-3 text-sm text-green-deep">
            Résolu : {resolution.replace("_", " ")} — {formatFCFA(currentRefund)}
          </p>
        )}
        <div className="flex flex-wrap gap-2 items-end">
          <div>
            <label htmlFor="refund-amount" className="text-xs text-sand">Montant FCFA</label>
            <Input
              id="refund-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-40"
            />
          </div>
          <Button size="sm" onClick={() => handleRefund("full_refund")}>Remboursement total</Button>
          <Button size="sm" variant="outline" onClick={() => handleRefund("partial_refund")}>Partiel</Button>
          <Button size="sm" variant="outline" onClick={() => handleRefund("rejected")}>Rejeter</Button>
        </div>
      </section>
    </RoleGuard>
  );
}
