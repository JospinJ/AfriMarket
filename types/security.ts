import type { ISODate, UUID } from "./common";

export interface Device {
  id: UUID;
  type: "mobile" | "desktop" | "tablet";
  os: string;
  browser: string;
  ip: string;
  location?: string;
  lastActiveAt: ISODate;
  trusted: boolean;
}

export interface SecurityState {
  level: "strong" | "medium" | "weak";
  score: number;
  twoFA: { enabled: boolean; method?: "sms" | "email" | "app" };
  devices: Device[];
  sessions: { id: UUID; current: boolean; createdAt: ISODate }[];
  alerts: {
    at: ISODate;
    kind: string;
    risk: "normal" | "suspect" | "critical";
  }[];
}
