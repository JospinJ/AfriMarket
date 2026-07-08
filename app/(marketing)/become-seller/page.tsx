import { MarketingLanding } from "@/components/marketing/MarketingLanding";
import { IMAGES } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { Zap, Smartphone, BarChart3, Users, Globe2, Package } from "lucide-react";

export const metadata = { title: "Devenir vendeur — AfriMarket Hub" };

export default function BecomeSellerPage() {
  return (
    <MarketingLanding
      eyebrow="Entrepreneuriat africain"
      title="Lancez votre boutique numérique en Afrique"
      description="Rejoignez des milliers d'entrepreneurs qui vendent en Express, Import et Gros. Mobile Money, logistique intégrée et visibilité continentale."
      heroImage={IMAGES.sellers.seller1}
      heroImageAlt="Femme entrepreneure africaine dans sa boutique"
      motif="kente"
      stats={[
        { value: "0 FCFA", label: "Frais d'ouverture" },
        { value: "3 modes", label: "Express · Import · Gros" },
        { value: "48 h", label: "Mise en ligne" },
        { value: "5 pays", label: "Marchés couverts" },
      ]}
      features={[
        {
          icon: Zap,
          title: "Express 24–72 h",
          description: "Stock local, livraison rapide dans les grandes villes. Vos clients reçoivent vite, vous vendez plus.",
        },
        {
          icon: Globe2,
          title: "Import & commerce transfrontalier",
          description: "Prix compétitifs, délais maîtrisés. Connectez l'Afrique aux opportunités mondiales.",
        },
        {
          icon: Package,
          title: "Vente en gros (MOQ)",
          description: "Prix usine, quantités minimales. Idéal pour les commerçants et distributeurs.",
        },
        {
          icon: Smartphone,
          title: "Mobile Money intégré",
          description: "MTN, Orange, Moov — encaissez comme vos clients paient, partout au Cameroun.",
        },
        {
          icon: BarChart3,
          title: "Analytics Premium",
          description: "Suivez vos ventes par région africaine. Gold & Elite pour les vendeurs ambitieux.",
        },
        {
          icon: Users,
          title: "Communauté de vendeurs",
          description: "Solidarité, partage d'expérience et croissance collective. L'Afrique construit ensemble.",
        },
      ]}
      primaryAction={{ label: "Créer ma boutique", href: ROUTES.registerSeller }}
      secondaryAction={{ label: "Voir l'espace vendeur", href: ROUTES.seller }}
    />
  );
}
