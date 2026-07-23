"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";
import { useNotificationStore } from "@/store/useNotificationStore";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { NavbarIconAction } from "@/components/navbar/NavbarIconAction";

interface NotificationBellProps {
  className?: string;
  variant?: "navbar" | "dashboard";
}

function NotificationBellInner({ className, variant = "navbar" }: NotificationBellProps) {
  const mounted = useMounted();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const unreadCount = useNotificationStore((s) => s.unreadCount());
  const displayCount = mounted ? unreadCount : 0;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (variant === "dashboard") {
    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-night transition-colors hover:bg-dash-bg"
          aria-label={t("nav.notifications")}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <Bell className="h-5 w-5" />
          {displayCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-night">
              {displayCount > 9 ? "9+" : displayCount}
            </span>
          )}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full z-50 mt-2 max-sm:fixed max-sm:inset-x-4 max-sm:right-4 max-sm:top-16 max-sm:mt-0"
              role="dialog"
              aria-label={t("notifications.title")}
            >
              <NotificationPanel onClose={close} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <NavbarIconAction
        label={t("nav.notifications")}
        badge={displayCount}
        badgeTone="primary"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Bell className="h-5 w-5" aria-hidden />
      </NavbarIconAction>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 mt-2 max-sm:fixed max-sm:inset-x-4 max-sm:right-4 max-sm:top-16 max-sm:mt-0"
            role="dialog"
            aria-label={t("notifications.title")}
          >
            <NotificationPanel onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const NotificationBell = memo(NotificationBellInner);
