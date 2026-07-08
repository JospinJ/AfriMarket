import Link from "next/link";
import { Package, MessageCircle } from "lucide-react";
import { buildSupportWhatsAppUrl } from "@/lib/constants/contact";
import { ROUTES } from "@/lib/constants/routes";
import { Button } from "@/components/ui/button";
import type { Conversation } from "@/types/chat";

export interface ContextPanelProps {
  conversation: Conversation;
}

export function ContextPanel({ conversation }: ContextPanelProps) {
  return (
    <aside className="hidden w-64 shrink-0 border-l border-sand/20 bg-surface-light p-4 xl:block">
      <h4 className="font-display text-sm font-semibold text-night">Contexte</h4>
      {conversation.orderId && (
        <div className="mt-4 rounded-lg border border-sand/20 bg-white p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-night">
            <Package className="h-4 w-4 text-green-deep" aria-hidden />
            Commande #{conversation.orderId.replace("order-", "")}
          </div>
          <Link
            href={ROUTES.tracking(conversation.orderId)}
            className="mt-2 block text-xs text-green-deep hover:underline"
          >
            Voir le suivi
          </Link>
        </div>
      )}
      <div className="mt-4">
        <p className="text-xs text-sand mb-2">Contact rapide</p>
        <Button variant="outline" size="sm" className="w-full gap-2" asChild>
          <a
            href={buildSupportWhatsAppUrl(
              `Bonjour, concernant ${conversation.contextLabel ?? "ma commande"}`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
        </Button>
      </div>
      {/* TODO API: GET /conversations/:id/context → { order, product, dispute } */}
    </aside>
  );
}
