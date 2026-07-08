import { StatusTimeline } from "@/components/shared/StatusTimeline";
import { EvidenceUploader } from "@/components/disputes/EvidenceUploader";
import { RefundPanel } from "@/components/disputes/RefundPanel";
import type { Dispute } from "@/types/dispute";

export interface DisputeDetailProps {
  dispute: Dispute;
}

export function DisputeDetail({ dispute }: DisputeDetailProps) {
  const steps = dispute.timeline.map((t) => ({
    label: t.action,
    done: true,
    at: new Date(t.at).toLocaleString("fr-FR"),
    description: `Par ${t.actor}`,
  }));

  return (
    <div className="space-y-6 rounded-lg border border-sand/20 bg-white p-6">
      <header>
        <h2 className="font-display text-xl font-bold text-night">Litige #{dispute.id.replace("dispute-", "")}</h2>
        <p className="mt-1 text-sm text-sand">{dispute.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded bg-surface-light px-2 py-1 capitalize">{dispute.type.replace("_", " ")}</span>
          <span className="rounded bg-surface-light px-2 py-1 capitalize">{dispute.status}</span>
          <span className="rounded bg-surface-light px-2 py-1">Commande {dispute.orderId}</span>
        </div>
      </header>

      <section>
        <h3 className="text-sm font-semibold text-night mb-3">Historique</h3>
        <StatusTimeline steps={steps} />
      </section>

      {dispute.evidences.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-night mb-3">Preuves</h3>
          <div className="flex flex-wrap gap-2">
            {dispute.evidences.map((e, i) => (
              <div key={i} className="h-20 w-20 rounded-lg bg-sand/20 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.url} alt={`Preuve ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      <EvidenceUploader disputeId={dispute.id} />
      <RefundPanel
        disputeId={dispute.id}
        currentRefund={dispute.refundAmount}
        resolution={dispute.resolution}
      />
    </div>
  );
}
