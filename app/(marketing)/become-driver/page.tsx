import { MarketingLanding } from "@/components/marketing/MarketingLanding";
import { IMAGES } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { Bike, MapPin, Wallet, Clock, MessageCircle, TrendingUp } from "lucide-react";

export const metadata = { title: "Devenir livreur — AfriMarket Hub" };

export default function BecomeDriverPage() {
  return (
    <MarketingLanding
      eyebrow="Mobilité & liberté économique"
      title="Livrez, gagnez, construisez votre indépendance"
      description="Rejoignez le réseau logistique qui connecte les marchés africains. Horaires flexibles, paiements hebdomadaires en FCFA, tracking GPS."
      heroImage={IMAGES.misc.driver}
      heroImageAlt="Livreur africain en moto dans une ville moderne"
      motif="ndop"
      stats={[
        { value: "Flexible", label: "Horaires libres" },
        { value: "Hebdo", label: "Paiements FCFA" },
        { value: "GPS", label: "Tracking temps réel" },
        { value: "Moto", label: "Livraison urbaine" },
      ]}
      features={[
        {
          icon: Bike,
          title: "Livraison moto",
          description: "Le mode dominant en ville. Rapide, agile, adapté aux réalités africaines urbaines.",
        },
        {
          icon: MapPin,
          title: "Réseau logistique",
          description: "Routes commerciales optimisées entre vendeurs, entrepôts et clients.",
        },
        {
          icon: Wallet,
          title: "Gains transparents",
          description: "Suivez vos revenus, retirez via Mobile Money. Votre réussite, chiffres à l'appui.",
        },
        {
          icon: Clock,
          title: "Express & standard",
          description: "Choisissez vos courses selon votre disponibilité et vos objectifs.",
        },
        {
          icon: MessageCircle,
          title: "Support WhatsApp",
          description: "Communication directe, assistance en temps réel. Jamais seul sur la route.",
        },
        {
          icon: TrendingUp,
          title: "Progression",
          description: "Bonus performance, zones premium. Chaque livraison rapproche de la prospérité.",
        },
      ]}
      primaryAction={{ label: "Devenir livreur", href: ROUTES.register }}
      secondaryAction={{ label: "Voir l'espace livreur", href: ROUTES.driver }}
    />
  );
}
