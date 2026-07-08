/** Profils détaillés des boutiques — onglet « À propos » et SEO. */

export interface StoreProfile {
  slug: string;
  tagline: string;
  description: string;
  specialty: string;
  foundedYear: number;
  deliveryZones: string[];
  avgDeliveryDays: string;
  returnPolicy: string;
  languages: string[];
  highlights: string[];
}

export const STORE_PROFILES: Record<string, StoreProfile> = {
  "librairie-akoma": {
    slug: "librairie-akoma",
    tagline: "Livres, papeterie & culture africaine",
    description:
      "Librairie Akoma est la référence à Douala pour la littérature africaine, les manuels scolaires, la papeterie professionnelle et les ouvrages jeunesse. Nous sélectionnons des auteurs camerounais, sénégalais et nigérians, avec stock local en Express et import éditorial pour les titres rares.",
    specialty: "Littérature africaine, manuels scolaires, papeterie",
    foundedYear: 2018,
    deliveryZones: ["Douala", "Yaoundé", "Bafoussam", "Kribi"],
    avgDeliveryDays: "24–48 h (Express) · 10–18 j (Import)",
    returnPolicy: "Échange sous 7 jours si emballage intact · Pas de retour sur manuels annotés",
    languages: ["Français", "English"],
    highlights: ["📚 2 000+ titres", "🎓 Partenaire écoles", "⚡ Express 24 h Douala"],
  },
  "moto-express-cm": {
    slug: "moto-express-cm",
    tagline: "Pièces, équipement & accessoires moto",
    description:
      "Moto Express CM équipe les livreurs, coursiers et motards urbains du Cameroun. Casques homologués, pièces détachées 125–250 cc, huiles, équipement pluie et sécurité. Stock local Yaoundé, import pièces origine pour les marques Honda, Yamaha, Boxer et Senke.",
    specialty: "Pièces moto, casques, équipement livreur",
    foundedYear: 2016,
    deliveryZones: ["Yaoundé", "Douala", "Garoua", "Bamenda"],
    avgDeliveryDays: "24–72 h (Express) · 12–20 j (Import pièces)",
    returnPolicy: "Garantie 14 jours pièces neuves · SAV atelier partenaire",
    languages: ["Français"],
    highlights: ["🏍 15 000+ pièces", "🛡 Casques certifiés", "📍 SAV Yaoundé"],
  },
  "parfums-dafrique": {
    slug: "parfums-dafrique",
    tagline: "Parfums, eaux de toilette & senteurs africaines",
    description:
      "Parfums d'Afrique célèbre les fragrances internationales et les senteurs traditionnelles — musc, vanille, karité, fleurs d'ylang. Coffrets cadeaux, eaux de toilette homme/femme, huiles parfumées et diffuseurs pour la maison. Boutique Gold avec emballage premium et livraison discrète.",
    specialty: "Parfumerie fine, senteurs traditionnelles, coffrets",
    foundedYear: 2020,
    deliveryZones: ["Douala", "Yaoundé", "Limbe", "Buea"],
    avgDeliveryDays: "24–48 h (Express) · 10–15 j (Import niche)",
    returnPolicy: "Retour 7 jours si scellé d'origine · Échange parfum équivalent",
    languages: ["Français", "English"],
    highlights: ["👑 Vendeur Gold", "🎁 Coffrets premium", "🌸 Senteurs locales"],
  },
  "raphia-artisanat-kamer": {
    slug: "raphia-artisanat-kamer",
    tagline: "Paniers, sacs & déco en rotin & raphia",
    description:
      "Raphia & Artisanat Kamer valorise le savoir-faire camerounais : paniers tressés à la main, sacs raphia-wax, corbeilles, plateaux et déco murale. Chaque pièce est unique, fabriquée par des artisans de l'Ouest et du Littoral. Mode Gros MOQ pour hôtels, restaurants et export.",
    specialty: "Artisanat rotin/raphia, déco, cadeaux authentiques",
    foundedYear: 2015,
    deliveryZones: ["Douala", "Yaoundé", "Bafoussam", "Dschang"],
    avgDeliveryDays: "48–72 h (Express) · 15–25 j (Gros export)",
    returnPolicy: "Échange 14 jours · Pièce artisanale = légères variations normales",
    languages: ["Français"],
    highlights: ["💎 Vendeur Elite", "🤲 100 % fait main", "🏭 MOQ export Gros"],
  },
};

import { getRuntimeProfile } from "@/lib/catalog/runtime";

export function getStoreProfile(slug: string): StoreProfile | undefined {
  return getRuntimeProfile(slug) ?? STORE_PROFILES[slug];
}
