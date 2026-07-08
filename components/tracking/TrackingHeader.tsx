import { formatFCFA } from "@/lib/utils/format-fcfa";
import type { Order } from "@/types/order";
import { getSellerById } from "@/lib/mocks/sellers";

const STATUS_LABELS: Record<Order["status"], string> = {
  confirmed: "Confirmée",
  prepared: "En préparation",
  shipped: "Expédiée",
  in_delivery: "En cours de livraison",
  delivered: "Livrée",
  cancelled: "Annulée",
  disputed: "En litige",
};

interface TrackingHeaderProps {
  order: Order;
}

export function TrackingHeader({ order }: TrackingHeaderProps) {
  const sellerIds = Array.from(new Set(order.items.map((i) => i.sellerId)));
  const sellers = sellerIds.map((id) => getSellerById(id)).filter(Boolean);

  return (
    <header className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm text-sand">Commande</p>
          <h1 className="font-display text-xl font-bold text-night md:text-2xl">
            #{order.id}
          </h1>
          <p className="mt-1 text-sm text-sand">
            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-sm font-medium text-gold">
            {STATUS_LABELS[order.status]}
          </span>
          <p className="mt-2 text-lg font-bold text-night">{formatFCFA(order.total)}</p>
          <p className="text-sm text-sand">{order.items.length} article(s)</p>
        </div>
      </div>
      <div className="mt-4 border-t border-sand/20 pt-4 text-sm">
        <p className="text-sand">
          Vendeur(s) :{" "}
          {sellers.map((s) => s?.storeName).filter(Boolean).join(", ")}
        </p>
        <p className="mt-1 text-night">
          {order.address.fullName} · {order.address.district}, {order.address.city}
        </p>
      </div>
    </header>
  );
}
