import Link from "next/link";
import { InfoPage } from "@/components/marketing/InfoPage";
import { ROUTES } from "@/lib/constants/routes";

export const metadata = { title: "Aide — AfriMarket Hub" };

export default function HelpPage() {
  return (
    <InfoPage
      title="Centre d'aide"
      description="Trouvez des réponses à vos questions sur les commandes, paiements et livraisons."
      primaryAction={{ label: "FAQ", href: ROUTES.faq }}
      secondaryAction={{ label: "Nous contacter", href: ROUTES.contact }}
    >
      <ul className="space-y-2">
        <li>
          <Link href={ROUTES.trackingLookup} className="text-green-deep hover:underline">
            Suivre une commande
          </Link>
        </li>
        <li>
          <Link href={ROUTES.deliveryZones} className="text-green-deep hover:underline">
            Zones de livraison
          </Link>
        </li>
        <li>
          <Link href={ROUTES.legal} className="text-green-deep hover:underline">
            Mentions légales & CGU
          </Link>
        </li>
      </ul>
    </InfoPage>
  );
}
