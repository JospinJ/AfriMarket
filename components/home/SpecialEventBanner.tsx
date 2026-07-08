"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

interface CountdownValues {
  d: number;
  h: number;
  m: number;
  s: number;
}

function useEventCountdown(endTimestamp: number): CountdownValues {
  const [remaining, setRemaining] = useState<CountdownValues>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, endTimestamp - Date.now());
      setRemaining({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTimestamp]);

  return remaining;
}

interface CountdownUnitProps {
  value: number;
  label: string;
  pad?: boolean;
  reducedMotion: boolean;
}

function CountdownUnit({ value, label, pad = true, reducedMotion }: CountdownUnitProps) {
  const display = pad ? String(value).padStart(2, "0") : String(value);

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative flex h-11 min-w-[2.75rem] items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-night/60 px-2 shadow-inner"
        aria-hidden
      >
        {reducedMotion ? (
          <span className="font-mono text-lg font-bold tabular-nums text-white">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={display}
              initial={{ y: -18, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 18, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-lg font-bold tabular-nums text-white"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{label}</span>
    </div>
  );
}

function EventCountdown({
  countdown,
  reducedMotion,
}: {
  countdown: CountdownValues;
  reducedMotion: boolean;
}) {
  return (
    <div
      className="flex items-end gap-1.5 sm:gap-2"
      aria-live="polite"
      aria-label={`Compte à rebours : ${countdown.d} jours, ${countdown.h} heures, ${countdown.m} minutes`}
    >
      <CountdownUnit value={countdown.d} label="jours" pad={false} reducedMotion={reducedMotion} />
      <span className="mb-6 font-mono text-lg font-bold text-primary/80" aria-hidden>
        :
      </span>
      <CountdownUnit value={countdown.h} label="heures" reducedMotion={reducedMotion} />
      <span className="mb-6 font-mono text-lg font-bold text-primary/80" aria-hidden>
        :
      </span>
      <CountdownUnit value={countdown.m} label="min" reducedMotion={reducedMotion} />
      <span className="mb-6 hidden font-mono text-lg font-bold text-primary/80 sm:inline" aria-hidden>
        :
      </span>
      <div className="hidden sm:block">
        <CountdownUnit value={countdown.s} label="sec" reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}

export function SpecialEventBanner() {
  const reducedMotion = useReducedMotion() ?? false;

  const endTimestamp = useMemo(() => {
    const end = new Date();
    const day = end.getDay();
    const daysUntilSunday = day === 0 ? 0 : 7 - day;
    end.setDate(end.getDate() + daysUntilSunday);
    end.setHours(23, 59, 59, 999);
    return end.getTime();
  }, []);

  const countdown = useEventCountdown(endTimestamp);

  return (
    <section aria-labelledby="special-event-heading" className="relative">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={cn("special-event-shell shadow-premium-lg", !reducedMotion && "special-event-beam")}
      >
        <div className="relative isolate overflow-hidden rounded-[14px] bg-night px-4 py-5 sm:px-6 md:px-8 md:py-6">
          <div className="pointer-events-none absolute inset-0 bg-motif-adinkra opacity-[0.07]" aria-hidden />
          <div
            className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/10 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8">
            {/* Contenu principal — aligné verticalement au centre */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={reducedMotion ? undefined : { rotate: [0, 4, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative shrink-0"
              >
                <span
                  className={cn(
                    "absolute -inset-1 rounded-2xl bg-primary/30",
                    !reducedMotion && "animate-glow-pulse",
                  )}
                  aria-hidden
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/20 text-primary shadow-glow-orange md:h-14 md:w-14">
                  <Sparkles className="h-6 w-6" aria-hidden />
                </span>
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/35 bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <Zap className="h-3 w-3" aria-hidden />
                    Événement spécial
                  </span>
                  <span
                    className={cn(
                      "rounded-full bg-terracotta/20 px-2 py-0.5 text-[10px] font-bold uppercase text-terracotta",
                      !reducedMotion && "special-event-discount-pulse",
                    )}
                  >
                    Live
                  </span>
                </div>

                <h2
                  id="special-event-heading"
                  className="mt-2 font-display text-xl font-bold leading-tight text-white md:text-2xl"
                >
                  Tech Week Cameroun — jusqu&apos;à{" "}
                  <span className="text-gradient-sunrise">-50%</span>
                </h2>
                <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-white/75 md:text-[15px]">
                  Smartphones, accessoires et électronique — stock local Express
                </p>
              </div>
            </div>

            {/* Actions — countdown + CTA alignés */}
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-end lg:flex-col lg:items-end xl:flex-row xl:items-center">
              <div className="flex justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:justify-end lg:justify-center xl:justify-end">
                <EventCountdown countdown={countdown} reducedMotion={reducedMotion} />
              </div>

              <Link
                href={ROUTES.flashSales}
                className="group relative inline-flex min-h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-bold text-night shadow-glow-orange transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                {!reducedMotion && (
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden
                  />
                )}
                Explorer les offres
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
