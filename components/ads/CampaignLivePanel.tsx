import { formatFCFA } from "@/lib/utils/format-fcfa";
import { cn } from "@/lib/utils/cn";
import type { AdCampaign } from "@/types/ads";

export interface CampaignLivePanelProps {
  campaign: AdCampaign;
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-deep/10 text-green-deep",
  paused: "bg-gold/10 text-gold",
  ended: "bg-sand/20 text-sand",
  rejected: "bg-terracotta/10 text-terracotta",
  in_review: "bg-sand/20 text-sand",
};

export function CampaignLivePanel({ campaign }: CampaignLivePanelProps) {
  const progress = campaign.budgetTotal > 0 ? (campaign.spent / campaign.budgetTotal) * 100 : 0;

  return (
    <article className="rounded-lg border border-sand/20 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-night">{campaign.name}</h3>
        <span className={cn("rounded px-2 py-0.5 text-xs capitalize", STATUS_STYLES[campaign.status])}>
          {campaign.status}
        </span>
      </div>
      <p className="mt-1 text-xs text-sand capitalize">{campaign.objective}</p>
      <div className="mt-3">
        <div className="flex justify-between text-xs text-sand mb-1">
          <span>{formatFCFA(campaign.spent)} dépensés</span>
          <span>{formatFCFA(campaign.budgetTotal)}</span>
        </div>
        <div className="h-2 rounded-full bg-sand/20 overflow-hidden">
          <div className="h-full bg-green-deep rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
      </div>
      {campaign.metrics && (
        <div className="mt-3 grid grid-cols-1 gap-2 text-center text-xs min-[380px]:grid-cols-3">
          <div className="min-w-0">
            <p className="truncate font-semibold tabular-nums text-night">{campaign.metrics.impressions.toLocaleString("fr-FR")}</p>
            <p className="text-sand">Impressions</p>
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold tabular-nums text-night">{campaign.metrics.clicks.toLocaleString("fr-FR")}</p>
            <p className="text-sand">Clics</p>
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold tabular-nums text-night">{campaign.metrics.ctr}%</p>
            <p className="text-sand">CTR</p>
          </div>
        </div>
      )}
    </article>
  );
}
