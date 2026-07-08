import { InfoPage } from "@/components/marketing/InfoPage";
import { ROUTES } from "@/lib/constants/routes";

export const metadata = { title: "Mes adresses — AfriMarket Hub" };

export default function AddressesPage() {
  return (
    <InfoPage
      title="Mes adresses"
      description="Gérez vos adresses de livraison pour Douala, Yaoundé et autres villes."
      primaryAction={{ label: "Retour à l'accueil", href: ROUTES.home }}
    />
  );
}
