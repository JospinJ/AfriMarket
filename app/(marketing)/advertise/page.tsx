import { MarketingLanding } from "@/components/marketing/MarketingLanding";
import { HERO_META } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { Target, TrendingUp, Users, BarChart3, Zap, Globe2 } from "lucide-react";

export const metadata = { title: "Publicité — AfriMarket Hub" };

export default function AdvertisePage() {
  return (
    <MarketingLanding
      eyebrow="Régie publicitaire"
      title="Faites rayonner votre marque à travers l'Afrique"
      description="Campagnes ciblées, ROI mesurable, paiement Mobile Money. Atteignez des millions d'acheteurs sur le marché numérique africain."
      heroImage={HERO_META.hero2.src}
      heroImageAlt={HERO_META.hero2.alt}
      heroImageWidth={HERO_META.hero2.width}
      heroImageHeight={HERO_META.hero2.height}
      motif="bogolan"
      stats={[
        { value: "2M+", label: "Impressions/mois" },
        { value: "ROI", label: "Suivi en temps réel" },
        { value: "5", label: "Régions ciblables" },
        { value: "FCFA", label: "Budget flexible" },
      ]}
      features={[
        {
          icon: Target,
          title: "Ciblage précis",
          description: "Ville, catégorie, mode d'achat. Touchez les bons clients au bon moment.",
        },
        {
          icon: TrendingUp,
          title: "ROI mesurable",
          description: "Analytics détaillées : clics, conversions, coût par acquisition.",
        },
        {
          icon: Users,
          title: "Audience qualifiée",
          description: "Acheteurs actifs, vendeurs vérifiés. Pas de clic vide, des opportunités réelles.",
        },
        {
          icon: BarChart3,
          title: "Ads Analytics",
          description: "Tableaux de bord par région africaine. Optimisez chaque franc investi.",
        },
        {
          icon: Zap,
          title: "Lancement rapide",
          description: "Créez votre campagne en minutes. Mobile Money pour payer et démarrer.",
        },
        {
          icon: Globe2,
          title: "Portée continentale",
          description: "Du Cameroun à l'Afrique de l'Ouest. Votre marque, notre réseau.",
        },
      ]}
      primaryAction={{ label: "Créer une campagne", href: ROUTES.sellerAds }}
      secondaryAction={{ label: "Devenir vendeur", href: ROUTES.becomeSeller }}
    />
  );
}
