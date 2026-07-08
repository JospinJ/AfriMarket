import { MarketingLanding } from "@/components/marketing/MarketingLanding";
import { HERO_META } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { Crown, BarChart3, BadgeCheck, Megaphone, Star, Shield } from "lucide-react";

export const metadata = { title: "Premium — AfriMarket Hub" };

export default function PremiumPage() {
  const hero = HERO_META.hero3;

  return (
    <MarketingLanding
      eyebrow="Prestige & croissance"
      title="AfriMarket Premium — L'excellence entrepreneuriale"
      description="Abonnements Gold & Elite : visibilité accrue, analytics par région africaine, badge premium et outils pour les vendeurs qui visent le leadership."
      heroImage={hero.src}
      heroImageAlt={hero.alt}
      heroImageWidth={hero.width}
      heroImageHeight={hero.height}
      heroFullBanner
      motif="adinkra"
      stats={[
        { value: "Gold", label: "Visibilité x3" },
        { value: "Elite", label: "Analytics complètes" },
        { value: "+40%", label: "Ventes moyennes" },
        { value: "Badge", label: "Confiance client" },
      ]}
      features={[
        {
          icon: Crown,
          title: "Badge Premium",
          description: "Or royal et bronze — symboles de confiance et de réussite reconnus par les acheteurs.",
        },
        {
          icon: BarChart3,
          title: "Analytics par région",
          description: "Afrique centrale, de l'Ouest, de l'Est… Pilotez votre croissance continentale.",
        },
        {
          icon: Megaphone,
          title: "Boost publicitaire",
          description: "Campagnes Ads intégrées pour toucher les bons clients au bon moment.",
        },
        {
          icon: Star,
          title: "Mise en avant",
          description: "Placement prioritaire dans les résultats et les boutiques Premium.",
        },
        {
          icon: BadgeCheck,
          title: "Support prioritaire",
          description: "Accompagnement dédié pour les entrepreneurs ambitieux.",
        },
        {
          icon: Shield,
          title: "Confiance renforcée",
          description: "KYC vérifié, score de confiance élevé. La modernité au service de la réussite.",
        },
      ]}
      primaryAction={{ label: "Passer Premium", href: ROUTES.sellerPremium }}
      secondaryAction={{ label: "Boutiques Premium", href: ROUTES.premiumStores }}
    />
  );
}
