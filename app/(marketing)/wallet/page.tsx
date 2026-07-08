import { InfoPage } from "@/components/marketing/InfoPage";
import { ROUTES } from "@/lib/constants/routes";

export const metadata = { title: "Portefeuille — AfriMarket Hub" };

export default function WalletPage() {
  return (
    <InfoPage
      title="Mon portefeuille"
      description="Solde AfriMarket, historique des transactions et retraits Mobile Money."
      primaryAction={{ label: "Retour à l'accueil", href: ROUTES.home }}
    />
  );
}
