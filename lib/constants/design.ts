/** Identité visuelle — orange primaire, vert secondaire (confiance / succès). */

export const BRAND = {
  name: "AfriMarket",
  logoSrc: "/images/logo/logoApp.png",
  logoAlt: "AfriMarket — marketplace africaine",
  /** Fichier source 1024×682 — ne pas forcer en carré */
  logoAspect: 1024 / 682,
  logoSizes: {
    navbarMobile: 50,
    navbar: 50,
    drawer: 50,
    footer: 50,
  },
  tagline: "Le marché numérique de l'Afrique moderne.",
  heroTitle: "L'Afrique commerce. L'Afrique livre. L'Afrique grandit.",
  heroSubtitle:
    "La marketplace panafricaine qui connecte entrepreneurs, artisans, livreurs et consommateurs — Express, Import et Gros sur chaque produit.",
  vision:
    "Je suis Africain, je suis fier de l'être, et l'avenir se construit ici.",
} as const;

export const AFRICA_REGIONS = [
  { id: "global", label: "Afrique globale" },
  { id: "central", label: "Afrique centrale" },
  { id: "west", label: "Afrique de l'Ouest" },
  { id: "east", label: "Afrique de l'Est" },
  { id: "south", label: "Afrique australe" },
  { id: "north", label: "Afrique du Nord" },
] as const;

export type AfricaRegionId = (typeof AFRICA_REGIONS)[number]["id"];

export const MARKETING_STATS = [
  { value: "12 000+", label: "Entrepreneurs actifs" },
  { value: "48", label: "Villes connectées" },
  { value: "3 modes", label: "Express · Import · Gros" },
  { value: "24–72 h", label: "Livraison locale" },
] as const;
