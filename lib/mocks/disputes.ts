import { IMAGES } from "@/lib/constants/images";
import type { Dispute } from "@/types/dispute";

export const mockDisputes: Dispute[] = [
  {
    id: "dispute-45",
    type: "damaged",
    status: "mediation",
    priority: "high",
    orderId: "order-88",
    buyerId: "user-buyer-1",
    sellerId: "user-seller-1",
    driverId: "user-driver-1",
    summary: "Produit reçu endommagé — écran fissuré",
    evidences: [
      { url: IMAGES.misc.evidence1, kind: "image", at: "2026-07-01T10:00:00Z" },
    ],
    slaDeadline: "2026-07-08T10:00:00Z",
    timeline: [
      { at: "2026-07-01T09:00:00Z", actor: "buyer", action: "Litige ouvert" },
      { at: "2026-07-01T11:00:00Z", actor: "seller", action: "Réponse vendeur" },
      { at: "2026-07-02T10:00:00Z", actor: "admin", action: "Médiation initiée" },
    ],
    createdAt: "2026-07-01T09:00:00Z",
  },
  {
    id: "dispute-46",
    type: "not_delivered",
    status: "open",
    priority: "critical",
    orderId: "order-92",
    buyerId: "user-buyer-2",
    sellerId: "user-seller-2",
    summary: "Commande non livrée après 15 jours",
    evidences: [],
    slaDeadline: "2026-07-06T10:00:00Z",
    timeline: [
      { at: "2026-07-04T08:00:00Z", actor: "buyer", action: "Litige ouvert" },
    ],
    createdAt: "2026-07-04T08:00:00Z",
  },
  {
    id: "dispute-47",
    type: "refund",
    status: "resolved",
    priority: "medium",
    orderId: "order-75",
    buyerId: "user-buyer-1",
    sellerId: "user-seller-1",
    summary: "Remboursement partiel accepté",
    evidences: [],
    resolution: "partial_refund",
    refundAmount: 15000,
    timeline: [
      { at: "2026-06-20T10:00:00Z", actor: "buyer", action: "Litige ouvert" },
      { at: "2026-06-22T14:00:00Z", actor: "admin", action: "Remboursement partiel accordé" },
    ],
    createdAt: "2026-06-20T10:00:00Z",
  },
];

// TODO API: GET /disputes → Dispute[]
// TODO API: PATCH /disputes/:id → { status, resolution, refundAmount }
