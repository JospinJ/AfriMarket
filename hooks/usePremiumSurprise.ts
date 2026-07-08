"use client";

import { useEffect, useState } from "react";

interface UsePremiumSurpriseOptions {
  ids: string[];
  /** Mettre à false quand les orbes ne sont pas visibles (perf + UX) */
  enabled?: boolean;
  minIntervalMs?: number;
  maxIntervalMs?: number;
  surpriseDurationMs?: number;
}

/**
 * Déclenche périodiquement une animation « surprise » sur un produit Premium aléatoire.
 */
export function usePremiumSurprise({
  ids,
  enabled = true,
  minIntervalMs = 4500,
  maxIntervalMs = 9500,
  surpriseDurationMs = 900,
}: UsePremiumSurpriseOptions): string | null {
  const [surpriseId, setSurpriseId] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0 || !enabled) {
      setSurpriseId(null);
      return;
    }

    let intervalTimer: ReturnType<typeof setTimeout>;
    let clearSurpriseTimer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const wait = minIntervalMs + Math.random() * (maxIntervalMs - minIntervalMs);
      intervalTimer = setTimeout(() => {
        const pick = ids[Math.floor(Math.random() * ids.length)];
        if (pick) {
          setSurpriseId(pick);
          clearSurpriseTimer = setTimeout(() => setSurpriseId(null), surpriseDurationMs);
        }
        scheduleNext();
      }, wait);
    };

    scheduleNext();

    return () => {
      clearTimeout(intervalTimer);
      clearTimeout(clearSurpriseTimer);
    };
  }, [ids, enabled, minIntervalMs, maxIntervalMs, surpriseDurationMs]);

  return surpriseId;
}
