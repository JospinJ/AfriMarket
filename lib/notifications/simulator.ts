import type { AppNotification } from "@/types/notification";
import type { Role } from "@/types/user";
import { LIVE_EVENT_POOL } from "@/lib/mocks/notification-templates";

export function pickLiveNotification(
  role: Role,
): Omit<AppNotification, "id" | "read" | "createdAt"> | null {
  const pool = LIVE_EVENT_POOL[role];
  if (!pool || pool.length === 0) return null;
  const pick = pool[Math.floor(Math.random() * pool.length)]!;
  return { ...pick, targetRole: role };
}
