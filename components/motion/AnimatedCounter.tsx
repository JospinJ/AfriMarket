"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/** Espaces classiques + insécables (fr-FR). */
const SPACE_RE = /[\s\u00A0\u202F]/g;

/**
 * Parse uniquement les stats numériques pures : "48", "12 000+", "12000+".
 * Retourne null pour "3 modes", "24–72 h", etc.
 */
function parseAnimatedStat(raw: string): { target: number; suffix: string } | null {
  const compact = raw.trim().replace(SPACE_RE, "");
  const match = compact.match(/^(\d+)(\+)?$/);
  if (!match?.[1]) return null;

  const target = Number.parseInt(match[1], 10);
  if (Number.isNaN(target)) return null;

  return { target, suffix: match[2] ?? "" };
}

function formatFrNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

export function AnimatedCounter({ value, className, duration = 1.8 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const animated = useMemo(() => parseAnimatedStat(value), [value]);

  const [display, setDisplay] = useState(() =>
    animated ? `${formatFrNumber(0)}${animated.suffix}` : value,
  );

  useEffect(() => {
    if (!animated) {
      setDisplay(value);
      return;
    }

    if (!inView) return;

    const { target, suffix } = animated;
    let rafId = 0;
    const start = performance.now();
    const ms = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / ms, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(target * eased);
      setDisplay(`${formatFrNumber(current)}${suffix}`);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    setDisplay(`${formatFrNumber(0)}${suffix}`);
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [inView, animated?.target, animated?.suffix, duration, value, animated]);

  if (!animated) {
    return (
      <span ref={ref} className={cn("inline-block tabular-nums", className)}>
        {value}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block tabular-nums tracking-tight", className)}
      initial={{ opacity: 0, y: 6 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.85, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {display}
    </motion.span>
  );
}
