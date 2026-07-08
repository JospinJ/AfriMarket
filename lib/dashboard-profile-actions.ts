import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  MapPin,
  MessageSquare,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  Crown,
  Megaphone,
  Truck,
  Users,
  AlertTriangle,
} from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import type { Role } from "@/types/user";

export interface ProfileAction {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function getProfileQuickActions(role: Role): ProfileAction[] {
  const security = `/${role}/security`;

  switch (role) {
    case "buyer":
      return [
        {
          label: "Mes commandes",
          description: "Suivi et historique",
          href: `${ROUTES.buyer}/orders`,
          icon: Package,
        },
        {
          label: "Messages",
          description: "Vendeurs et support",
          href: ROUTES.messages,
          icon: MessageSquare,
        },
        {
          label: "Sécurité",
          description: "2FA et appareils",
          href: security,
          icon: Shield,
        },
        {
          label: "Paramètres",
          description: "Notifications et langue",
          href: ROUTES.settings,
          icon: Settings,
        },
      ];
    case "seller":
      return [
        {
          label: "Mes produits",
          description: "Catalogue et stock",
          href: `${ROUTES.seller}/products`,
          icon: ShoppingBag,
        },
        {
          label: "Commandes",
          description: "À expédier",
          href: `${ROUTES.seller}/orders`,
          icon: Package,
        },
        {
          label: "Premium",
          description: "Plans Gold & Elite",
          href: ROUTES.sellerPremium,
          icon: Crown,
        },
        {
          label: "Publicités",
          description: "Campagnes Ads",
          href: ROUTES.sellerAds,
          icon: Megaphone,
        },
      ];
    case "driver":
      return [
        {
          label: "Livraisons",
          description: "Courses en cours",
          href: `${ROUTES.driver}/deliveries`,
          icon: Truck,
        },
        {
          label: "Mes gains",
          description: "Revenus hebdo",
          href: `${ROUTES.driver}/earnings`,
          icon: BarChart3,
        },
        {
          label: "Messages",
          description: "Clients et support",
          href: ROUTES.messages,
          icon: MessageSquare,
        },
        {
          label: "Sécurité",
          description: "Compte protégé",
          href: security,
          icon: Shield,
        },
      ];
    case "admin":
      return [
        {
          label: "Utilisateurs",
          description: "Gestion comptes",
          href: `${ROUTES.admin}/users`,
          icon: Users,
        },
        {
          label: "Analytics",
          description: "KPIs plateforme",
          href: `${ROUTES.admin}/analytics`,
          icon: BarChart3,
        },
        {
          label: "Litiges",
          description: "Modération",
          href: ROUTES.supportDisputes,
          icon: AlertTriangle,
        },
        {
          label: "Zones livraison",
          description: "Couverture CM",
          href: `${ROUTES.admin}/delivery-zones`,
          icon: MapPin,
        },
      ];
    default:
      return [];
  }
}

export const ROLE_PROFILE_TITLES: Record<Role, string> = {
  buyer: "Mon compte",
  seller: "Mon espace vendeur",
  driver: "Mon espace livreur",
  admin: "Administration",
};

export const ROLE_PROFILE_SUBTITLES: Record<Role, string> = {
  buyer: "Gérez vos achats, commandes et préférences",
  seller: "Pilotez votre boutique et vos performances",
  driver: "Suivez vos livraisons et vos gains",
  admin: "Vue d'ensemble de la plateforme AfriMarket Hub",
};
