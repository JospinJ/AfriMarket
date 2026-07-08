import { InfoPage } from "@/components/marketing/InfoPage";
import { ROUTES } from "@/lib/constants/routes";

export const metadata = { title: "Comparateur — AfriMarket Hub" };

export default function ComparePage() {
  return (
    <InfoPage
      title="Comparateur de produits"
      description="Ajoutez des produits depuis leur fiche pour les comparer côte à côte."
      primaryAction={{ label: "Parcourir le catalogue", href: ROUTES.home }}
    />
  );
}
