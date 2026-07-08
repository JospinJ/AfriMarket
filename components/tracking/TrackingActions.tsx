"use client";

import { useState } from "react";
import { MessageCircle, Phone, XCircle } from "lucide-react";
import { CONTACT, buildSupportWhatsAppUrl } from "@/lib/constants/contact";
import type { OrderStatus } from "@/types/order";

interface TrackingActionsProps {
  orderId: string;
  status: OrderStatus;
  onCancel?: () => void;
}

export function TrackingActions({ orderId, status, onCancel }: TrackingActionsProps) {
  const [cancelling, setCancelling] = useState(false);
  const canCancel = status === "confirmed" || status === "prepared";

  const handleCancel = async () => {
    if (!canCancel) return;
    setCancelling(true);
    try {
      // TODO API: POST /orders/:id/cancel → { status: "cancelled" }
      await new Promise((r) => setTimeout(r, 800));
      onCancel?.();
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <a
          href={buildSupportWhatsAppUrl(`Support commande ${orderId}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-sand/30 px-4 text-sm font-medium"
        >
          <MessageCircle size={18} />
          Support WhatsApp
        </a>
        <a
          href={`tel:${CONTACT.phoneTel}`}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-sand/30 px-4 text-sm font-medium"
        >
          <Phone size={18} />
          Appeler support
        </a>
      </div>

      {canCancel ? (
        <button
          type="button"
          disabled={cancelling}
          onClick={handleCancel}
          className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-lg border border-terracotta/30 text-sm font-medium text-terracotta hover:bg-terracotta/5 disabled:opacity-50"
        >
          <XCircle size={18} />
          {cancelling ? "Annulation..." : "Annuler la commande"}
        </button>
      ) : (
        <p className="text-center text-xs text-sand">
          Annulation impossible après expédition
        </p>
      )}

      <div className="fixed bottom-0 left-0 right-0 flex gap-2 border-t border-sand/20 bg-white p-3 md:hidden">
        <a
          href={`tel:${CONTACT.phoneTel}`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-night py-3 text-sm font-medium text-white"
        >
          <Phone size={16} />
          Support
        </a>
        <a
          href={buildSupportWhatsAppUrl("Contact livreur AfriMarket Hub")}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#25D366] py-3 text-sm font-medium text-white"
        >
          <MessageCircle size={16} />
          Livreur
        </a>
      </div>
    </div>
  );
}
