"use client";

import { useEffect } from "react";
import { useRoleStore } from "@/store/useRoleStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useToastStore } from "@/store/useToastStore";
import { useTranslation } from "@/hooks/useTranslation";
import { getSeedNotificationsForRole } from "@/lib/mocks/notification-templates";
import { pickLiveNotification } from "@/lib/notifications/simulator";
import { playNotificationSound } from "@/lib/notifications/sound";

const LIVE_INTERVAL_MS = 18_000;

/** // TODO API: WebSocket / SSE /notifications/stream pour notifications temps réel */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const role = useRoleStore((s) => s.role);
  const isAuthenticated = useRoleStore((s) => s.isAuthenticated);
  const seedForRole = useNotificationStore((s) => s.seedForRole);
  const addNotification = useNotificationStore((s) => s.addNotification);
  const soundEnabled = useNotificationStore((s) => s.soundEnabled);
  const pushToast = useToastStore((s) => s.push);
  const { t } = useTranslation();

  // Historique initial par rôle
  useEffect(() => {
    if (!isAuthenticated) return;
    seedForRole(role, getSeedNotificationsForRole(role));
  }, [isAuthenticated, role, seedForRole]);

  // Simulation temps réel (mock)
  useEffect(() => {
    if (!isAuthenticated) return;

    const timer = setInterval(() => {
      if (Math.random() > 0.55) return;
      const payload = pickLiveNotification(role);
      if (!payload) return;

      const item = addNotification(payload);
      const title = t(item.titleKey, item.params);
      const message = t(item.messageKey, item.params);
      pushToast({ title, message, href: item.href });
      if (soundEnabled) playNotificationSound();
    }, LIVE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isAuthenticated, role, addNotification, pushToast, soundEnabled, t]);

  return <>{children}</>;
}
