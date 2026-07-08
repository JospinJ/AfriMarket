import type { ISODate, Money, UUID } from "./common";
import type { Role } from "./user";

export type DisputeType =
  | "not_delivered"
  | "damaged"
  | "wrong_item"
  | "refund"
  | "fraud";

export type DisputeStatus =
  | "open"
  | "mediation"
  | "awaiting_evidence"
  | "resolved"
  | "rejected"
  | "refunded";

export type Resolution =
  | "full_refund"
  | "partial_refund"
  | "replacement"
  | "store_credit"
  | "rejected";

export interface Dispute {
  id: UUID;
  type: DisputeType;
  status: DisputeStatus;
  priority: "low" | "medium" | "high" | "critical";
  orderId: UUID;
  buyerId: UUID;
  sellerId: UUID;
  driverId?: UUID;
  summary: string;
  evidences: {
    url: string;
    kind: "image" | "video" | "doc" | "voice";
    at: ISODate;
  }[];
  slaDeadline?: ISODate;
  timeline: { at: ISODate; actor: Role; action: string }[];
  resolution?: Resolution;
  refundAmount?: Money;
  createdAt: ISODate;
}
