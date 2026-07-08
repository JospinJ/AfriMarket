"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, Eye, ShoppingBag, TrendingUp, X } from "lucide-react";
import { LIVE_ACTIVITIES, type LiveActivity } from "@/lib/mocks/live-activity";
import { cn } from "@/lib/utils/cn";

const ICONS = {
  purchase: ShoppingBag,
  sale: TrendingUp,
  view: Eye,
  premium: Crown,
} as const;

const STYLES = {
  purchase: "border-primary/30 bg-white",
  sale: "border-secondary/30 bg-white",
  view: "border-sand/30 bg-white",
  premium: "border-primary/40 bg-brand-orange-muted",
} as const;

export function LiveActivityToast() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const activity = LIVE_ACTIVITIES[index % LIVE_ACTIVITIES.length]!;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % LIVE_ACTIVITIES.length);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [visible, next]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-20 left-4 z-50 md:bottom-6 md:left-6">
      <AnimatePresence mode="wait">
        <ActivityCard key={activity.id} activity={activity} onClose={() => setVisible(false)} />
      </AnimatePresence>
    </div>
  );
}

function ActivityCard({
  activity,
  onClose,
}: {
  activity: LiveActivity;
  onClose: () => void;
}) {
  const Icon = ICONS[activity.type];
  const timeLabel =
    activity.minutesAgo === 0
      ? "À l'instant"
      : `Il y a ${activity.minutesAgo} min`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -16, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={cn(
        "pointer-events-auto flex max-w-[min(320px,calc(100vw-2rem))] items-start gap-3 rounded-xl border p-3 shadow-lg backdrop-blur-sm",
        STYLES[activity.type]
      )}
      role="status"
      aria-live="polite"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dash-bg text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-night">
          {activity.type === "purchase" && "Achat récent"}
          {activity.type === "sale" && "Vente confirmée"}
          {activity.type === "view" && "Activité live"}
          {activity.type === "premium" && "Boutique Premium"}
        </p>
        <p className="truncate text-sm text-sand">{activity.message}</p>
        <p className="mt-0.5 text-[10px] text-sand">
          {activity.city} · {timeLabel}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded p-1 text-sand hover:bg-dash-bg hover:text-night"
        aria-label="Masquer les notifications"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
