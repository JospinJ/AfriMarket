"use client";

import { cn } from "@/lib/utils/cn";
import type { Dispute } from "@/types/dispute";

const PRIORITY_COLORS = {
  low: "bg-sand/20 text-sand",
  medium: "bg-gold/20 text-gold",
  high: "bg-terracotta/20 text-terracotta",
  critical: "bg-terracotta text-white",
};

export interface DisputeQueueProps {
  disputes: Dispute[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function DisputeQueue({ disputes, selectedId, onSelect }: DisputeQueueProps) {
  return (
    <div className="rounded-lg border border-sand/20 bg-white overflow-hidden">
      <div className="border-b border-sand/20 p-4">
        <h2 className="font-display font-semibold text-night">{disputes.length} litiges</h2>
      </div>
      <ul className="divide-y divide-sand/10 max-h-[600px] overflow-y-auto">
        {disputes.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              onClick={() => onSelect(d.id)}
              className={cn(
                "w-full p-4 text-left hover:bg-surface-light transition-colors min-h-[44px]",
                selectedId === d.id && "bg-green-deep/5"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-night">#{d.id.replace("dispute-", "")}</span>
                <span className={cn("rounded px-2 py-0.5 text-[10px] font-medium uppercase", PRIORITY_COLORS[d.priority])}>
                  {d.priority}
                </span>
              </div>
              <p className="mt-1 truncate text-xs text-sand">{d.summary}</p>
              <p className="mt-1 text-xs text-night/60 capitalize">{d.status.replace("_", " ")}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
