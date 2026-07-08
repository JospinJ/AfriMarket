import Link from "next/link";
import { DashboardStubPage } from "@/components/dashboard/DashboardStubPage";
import { mockOrders } from "@/lib/mocks/orders";
import { ROUTES } from "@/lib/constants/routes";
import { formatFCFA } from "@/lib/utils/format-fcfa";

export const metadata = { title: "Mes commandes — Acheteur" };

export default function BuyerOrdersPage() {
  const orders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-night">Mes commandes</h1>
        <p className="mt-1 text-sm text-sand">Historique et suivi de vos achats.</p>
      </header>
      {orders.length === 0 ? (
        <DashboardStubPage
          title="Aucune commande"
          description="Vous n'avez pas encore passé de commande."
          backHref="/buyer"
          backLabel="Retour au tableau de bord"
        />
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={ROUTES.tracking(order.id)}
                className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm hover:shadow-md"
              >
                <div>
                  <p className="font-medium text-night">Commande #{order.id.replace("order-", "")}</p>
                  <p className="text-sm capitalize text-sand">{order.status}</p>
                </div>
                <p className="font-semibold text-green-deep">{formatFCFA(order.total)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
