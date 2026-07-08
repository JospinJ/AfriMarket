import type { SecurityState } from "@/types/security";

export const mockSecurityState: SecurityState = {
  level: "medium",
  score: 65,
  twoFA: { enabled: false, method: "sms" },
  devices: [
    {
      id: "dev-1",
      type: "mobile",
      os: "Android 14",
      browser: "Chrome Mobile",
      ip: "197.**.***.42",
      location: "Douala, CM",
      lastActiveAt: "2026-07-05T08:00:00Z",
      trusted: true,
    },
    {
      id: "dev-2",
      type: "desktop",
      os: "Windows 11",
      browser: "Firefox",
      ip: "197.**.***.18",
      location: "Douala, CM",
      lastActiveAt: "2026-07-03T14:00:00Z",
      trusted: false,
    },
  ],
  sessions: [
    { id: "sess-1", current: true, createdAt: "2026-07-05T08:00:00Z" },
    { id: "sess-2", current: false, createdAt: "2026-07-03T14:00:00Z" },
  ],
  alerts: [
    { at: "2026-07-03T14:05:00Z", kind: "Nouvelle connexion", risk: "suspect" },
    { at: "2026-06-28T10:00:00Z", kind: "Mot de passe modifié", risk: "normal" },
  ],
};

// TODO API: GET /security/state → SecurityState
// TODO API: POST /security/2fa/enable → { method } → { success }
