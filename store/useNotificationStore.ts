import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AppNotification, NotificationEventType } from "@/types/notification";
import type { Role } from "@/types/user";

interface NotificationState {
  notifications: AppNotification[];
  soundEnabled: boolean;
  seededRoles: Role[];
  unreadCount: () => number;
  addNotification: (
    notification: Omit<AppNotification, "id" | "read" | "createdAt">,
  ) => AppNotification;
  markRead: (id: string) => void;
  markUnread: (id: string) => void;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  seedForRole: (
    role: Role,
    templates: Omit<AppNotification, "id" | "read" | "createdAt">[],
  ) => void;
  hasType: (type: NotificationEventType) => boolean;
}

function createId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      soundEnabled: true,
      seededRoles: [],
      unreadCount: () => get().notifications.filter((n) => !n.read).length,
      addNotification: (notification) => {
        const item: AppNotification = {
          ...notification,
          id: createId(),
          read: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [item, ...state.notifications].slice(0, 100),
        }));
        return item;
      },
      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),
      markUnread: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: false } : n,
          ),
        })),
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearAll: () => set({ notifications: [] }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      seedForRole: (role, templates) => {
        if (get().seededRoles.includes(role)) return;
        const seeded: AppNotification[] = templates.map((t) => ({
          ...t,
          id: createId(),
          read: Math.random() > 0.4,
          createdAt: new Date(Date.now() - Math.random() * 3_600_000).toISOString(),
        }));
        set((state) => ({
          notifications: [...seeded, ...state.notifications].slice(0, 100),
          seededRoles: [...state.seededRoles, role],
        }));
      },
      hasType: (type) => get().notifications.some((n) => n.type === type),
    }),
    {
      name: "afrimarket-notifications",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notifications: state.notifications,
        soundEnabled: state.soundEnabled,
        seededRoles: state.seededRoles,
      }),
    },
  ),
);
