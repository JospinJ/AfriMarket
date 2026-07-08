import { ROUTES } from "@/lib/constants/routes";
import { buildMailtoUrl, buildSupportWhatsAppUrl } from "@/lib/constants/contact";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterNavGroup {
  id: string;
  title: string;
  links: FooterLink[];
}

export const FOOTER_BUY_LINKS: FooterLink[] = [
  { label: "Tous les produits", href: ROUTES.products },
  { label: "Catégories", href: ROUTES.categories },
  { label: "Promotions", href: ROUTES.premium },
  { label: "Nouveautés", href: ROUTES.newArrivals },
  { label: "Offres flash", href: ROUTES.flashSales },
  { label: "Boutiques premium", href: ROUTES.premiumStores },
];

export const FOOTER_SELL_LINKS: FooterLink[] = [
  { label: "Devenir vendeur", href: ROUTES.registerSeller },
  { label: "Centre vendeur", href: ROUTES.seller },
  { label: "Abonnement Premium", href: ROUTES.sellerPremium },
  { label: "Publicité", href: ROUTES.advertise },
  { label: "Conditions vendeur", href: ROUTES.legalTerms },
];

export const FOOTER_SUPPORT_LINKS: FooterLink[] = [
  { label: "Centre d'aide", href: ROUTES.help },
  { label: "FAQ", href: ROUTES.faq },
  { label: "Contact", href: ROUTES.contact },
  { label: "Suivi commande", href: ROUTES.trackingLookup },
  { label: "Zones de livraison", href: ROUTES.deliveryZones },
];

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  { id: "buy", title: "Acheter", links: FOOTER_BUY_LINKS },
  { id: "sell", title: "Vendre", links: FOOTER_SELL_LINKS },
  { id: "support", title: "Support", links: FOOTER_SUPPORT_LINKS },
];

export const FOOTER_TRUST_ITEMS = [
  {
    id: "secure",
    title: "Paiement sécurisé",
    description: "Mobile Money, carte et COD — chiffrement bout en bout.",
    icon: "lock" as const,
  },
  {
    id: "protected",
    title: "Transactions protégées",
    description: "Vérification OTP et traçabilité de chaque paiement.",
    icon: "shield" as const,
  },
  {
    id: "delivery",
    title: "Livraison fiable",
    description: "Express 24–72 h, suivi GPS et fallback SMS.",
    icon: "truck" as const,
  },
  {
    id: "buyer",
    title: "Protection acheteur",
    description: "Litiges, retours et remboursements encadrés.",
    icon: "badge" as const,
  },
] as const;

export type PaymentBrandId =
  | "orange-money"
  | "mtn-momo"
  | "moov-money"
  | "visa"
  | "mastercard"
  | "amex"
  | "uba"
  | "ecobank"
  | "sgbc"
  | "afriland";

export interface PaymentBrand {
  id: PaymentBrandId;
  label: string;
  category: "mobile-money" | "card" | "bank";
}

export const FOOTER_PAYMENT_BRANDS: PaymentBrand[] = [
  { id: "orange-money", label: "Orange Money", category: "mobile-money" },
  { id: "mtn-momo", label: "MTN Mobile Money", category: "mobile-money" },
  { id: "moov-money", label: "Moov Money", category: "mobile-money" },
  { id: "visa", label: "Visa", category: "card" },
  { id: "mastercard", label: "Mastercard", category: "card" },
  { id: "amex", label: "American Express", category: "card" },
  { id: "uba", label: "UBA", category: "bank" },
  { id: "ecobank", label: "Ecobank", category: "bank" },
  { id: "sgbc", label: "Société Générale", category: "bank" },
  { id: "afriland", label: "Afriland First Bank", category: "bank" },
];

export const FOOTER_SOCIAL_LINKS = [
  { label: "WhatsApp Business", href: buildSupportWhatsAppUrl(), network: "whatsapp" as const },
  { label: "Facebook", href: "#", network: "facebook" as const },
  { label: "Instagram", href: "#", network: "instagram" as const },
  { label: "E-mail", href: buildMailtoUrl("Contact AfriMarket Hub"), network: "email" as const },
] as const;
