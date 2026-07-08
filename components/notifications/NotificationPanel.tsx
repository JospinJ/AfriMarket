"use client";

import Link from "next/link";
import { BellOff, Check, CheckCheck, Trash2, Volume2, VolumeX, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useTranslation } from "@/hooks/useTranslation";
import { useNotificationStore } from "@/store/useNotificationStore";
import type { AppNotification } from "@/types/notification";
import { Button } from "@/components/ui/button";

function formatRelativeTime(iso: string, t: (k: string, p?: Record<string, string | number>) => string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return t("notifications.justNow");
  if (minutes < 60) return t("notifications.minutesAgo", { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t("notifications.hoursAgo", { n: hours });
  return t("notifications.daysAgo", { n: Math.floor(hours / 24) });
}

function NotificationItem({
  notification,
  onClose,
}: {
  notification: AppNotification;
  onClose?: () => void;
}) {
  const { t } = useTranslation();
  const markRead = useNotificationStore((s) => s.markRead);
  const markUnread = useNotificationStore((s) => s.markUnread);
  const removeNotification = useNotificationStore((s) => s.removeNotification);

  const title = t(notification.titleKey, notification.params);
  const message = t(notification.messageKey, notification.params);

  const content = (
    <div
      className={cn(
        "group relative flex gap-3 rounded-lg border p-3 transition-colors",
        notification.read
          ? "border-sand/10 bg-white/5"
          : "border-primary/25 bg-primary/5",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-white">{title}</p>
          {!notification.read && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
          )}
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-white/65">{message}</p>
        <p className="mt-1.5 text-[10px] text-white/40">
          {formatRelativeTime(notification.createdAt, t)}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            notification.read ? markUnread(notification.id) : markRead(notification.id);
          }}
          className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          aria-label={notification.read ? t("notifications.markUnread") : t("notifications.markRead")}
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeNotification(notification.id);
          }}
          className="rounded p-1 text-white/50 hover:bg-terracotta/20 hover:text-terracotta"
          aria-label={t("notifications.delete")}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );

  if (notification.href) {
    return (
      <Link
        href={notification.href}
        onClick={() => {
          markRead(notification.id);
          onClose?.();
        }}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {content}
      </Link>
    );
  }

  return content;
}

interface NotificationPanelProps {
  onClose?: () => void;
  className?: string;
}

export function NotificationPanel({ onClose, className }: NotificationPanelProps) {
  const { t } = useTranslation();
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount());
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const clearAll = useNotificationStore((s) => s.clearAll);
  const soundEnabled = useNotificationStore((s) => s.soundEnabled);
  const toggleSound = useNotificationStore((s) => s.toggleSound);

  return (
    <div
      className={cn(
        "flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-xl border border-white/10 bg-night shadow-2xl",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <h2 className="font-display text-sm font-bold text-white">{t("notifications.title")}</h2>
          {unreadCount > 0 && (
            <p className="text-xs text-primary">{t("notifications.unread", { count: unreadCount })}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white"
            onClick={toggleSound}
            aria-label={soundEnabled ? t("notifications.soundOn") : t("notifications.soundOff")}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          {onClose && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
              onClick={onClose}
              aria-label={t("common.close")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="flex gap-2 border-b border-white/8 px-4 py-2">
          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
          >
            <CheckCheck className="h-3 w-3" />
            {t("notifications.markAllRead")}
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-white/50 hover:text-white"
          >
            <Trash2 className="h-3 w-3" />
            {t("notifications.clearAll")}
          </button>
        </div>
      )}

      <div className="max-h-[min(70vh,420px)] overflow-y-auto p-3">
        <AnimatePresence mode="popLayout">
          {notifications.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-10 text-center"
            >
              <BellOff className="h-10 w-10 text-white/20" aria-hidden />
              <p className="mt-3 text-sm font-medium text-white/70">{t("notifications.empty")}</p>
              <p className="mt-1 text-xs text-white/40">{t("notifications.emptyHint")}</p>
            </motion.div>
          ) : (
            <ul className="space-y-2">
              {notifications.map((n) => (
                <motion.li
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <NotificationItem notification={n} onClose={onClose} />
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
