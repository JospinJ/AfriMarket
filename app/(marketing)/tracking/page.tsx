import Link from "next/link";
import { InfoPage } from "@/components/marketing/InfoPage";
import { ROUTES } from "@/lib/constants/routes";
import { mockOrders } from "@/lib/mocks/orders";

export const metadata = { title: "Suivi de commande — AfriMarket Hub" };

export default function TrackingLookupPage() {
  const demoOrder = mockOrders[0];

  return (
    <InfoPage
      title="Suivre une commande"
      description="Entrez votre numéro de commande pour suivre la livraison en temps réel."
      primaryAction={
        demoOrder
          ? { label: "Voir un exemple de suivi", href: ROUTES.tracking(demoOrder.id) }
          : { label: "Retour à l'accueil", href: ROUTES.home }
      }
      secondaryAction={{ label: "Mes commandes", href: ROUTES.buyer + "/orders" }}
    >
      <p className="text-sm text-sand">
        {/* TODO API: formulaire de recherche par numéro de commande */}
        Exemple : commande{" "}
        {demoOrder && (
          <Link
            href={ROUTES.tracking(demoOrder.id)}
            className="font-mono text-green-deep hover:underline"
          >
            {demoOrder.id}
          </Link>
        )}
      </p>
    </InfoPage>
  );
}
