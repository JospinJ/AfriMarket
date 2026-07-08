import {
  Crown,
  Globe2,
  Package,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export const NAV_PROMO_MESSAGES = [
  "⚡ Express 24–72 h — Stock local dans vos villes",
  "🔥 Offres Flash jusqu'à −70 % aujourd'hui",
  "👑 Boutiques Gold & Elite — Livraison prioritaire",
  "🌍 Import & Gros — Meilleurs prix du continent",
] as const;

export interface NavSecondaryLink {
  href: string;
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
}

export const NAV_SECONDARY_LINKS: NavSecondaryLink[] = [
  { href: ROUTES.products, label: "Produits", icon: Package },
  { href: ROUTES.flashSales, label: "Offres du jour", icon: Zap, highlight: true },
  { href: ROUTES.topSellers, label: "Populaires", icon: TrendingUp },
  { href: ROUTES.newArrivals, label: "Nouveautés", icon: Sparkles },
  { href: ROUTES.premiumStores, label: "Vendeurs Premium", icon: Star },
  { href: `${ROUTES.products}?mode=import`, label: "Import Express", icon: Globe2 },
  { href: ROUTES.premium, label: "Promotions", icon: Crown },
];

export const NAV_TOP_LINKS = {
  help: { href: ROUTES.help, label: "Assistance client" },
  seller: { href: ROUTES.becomeSeller, label: "Vendre" },
  driver: { href: ROUTES.becomeDriver, label: "Livrer" },
  orders: { href: `${ROUTES.buyer}/orders`, label: "Mes commandes" },
} as const;

export const NAV_LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
] as const;

export const NAV_CURRENCIES = [
  { code: "XAF", label: "FCFA", symbol: "FCFA" },
  { code: "EUR", label: "Euro", symbol: "€" },
] as const;

export const NAV_QUICK_CATEGORIES = [
  { label: "Smartphones", href: ROUTES.category("smartphones") },
  { label: "Mode & Wax", href: ROUTES.category("mode") },
  { label: "Maison", href: ROUTES.category("maison") },
  { label: "Moto", href: ROUTES.category("moto") },
  { label: "Livres", href: ROUTES.category("livres") },
] as const;
