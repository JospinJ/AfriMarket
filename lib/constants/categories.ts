export interface Category {
  id: string;
  name: string;
  slug: string;
  children?: { id: string; name: string; slug: string }[];
}

export const CATEGORIES: Category[] = [
  {
    id: "electronics",
    name: "Électronique",
    slug: "electronique",
    children: [
      { id: "phones", name: "Smartphones", slug: "smartphones" },
      { id: "tablets", name: "Tablettes", slug: "tablettes" },
      { id: "computers", name: "Ordinateurs", slug: "ordinateurs" },
      { id: "accessories", name: "Accessoires", slug: "accessoires" },
    ],
  },
  {
    id: "fashion",
    name: "Mode",
    slug: "mode",
    children: [
      { id: "men", name: "Homme", slug: "homme" },
      { id: "women", name: "Femme", slug: "femme" },
      { id: "kids", name: "Enfant", slug: "enfant" },
    ],
  },
  {
    id: "home",
    name: "Maison",
    slug: "maison",
    children: [
      { id: "kitchen", name: "Cuisine", slug: "cuisine" },
      { id: "living", name: "Salon", slug: "salon" },
      { id: "decor", name: "Décoration", slug: "decoration" },
    ],
  },
  {
    id: "auto",
    name: "Automobile",
    slug: "automobile",
    children: [
      { id: "parts", name: "Pièces", slug: "pieces" },
      { id: "auto-acc", name: "Accessoires", slug: "accessoires-auto" },
      { id: "moto", name: "Moto & Livraison", slug: "moto" },
    ],
  },
  {
    id: "agri",
    name: "Agriculture",
    slug: "agriculture",
    children: [
      { id: "seeds", name: "Semences", slug: "semences" },
      { id: "agri-tools", name: "Outils agricoles", slug: "outils-agricoles" },
    ],
  },
  {
    id: "health",
    name: "Santé",
    slug: "sante",
    children: [
      { id: "medical", name: "Produits médicaux", slug: "medicaux" },
      { id: "wellness", name: "Bien-être", slug: "bien-etre" },
    ],
  },
  {
    id: "grocery",
    name: "Supermarché",
    slug: "supermarche",
    children: [
      { id: "food", name: "Alimentaire", slug: "alimentaire" },
      { id: "drinks", name: "Boissons", slug: "boissons" },
    ],
  },
  {
    id: "culture",
    name: "Culture & Loisirs",
    slug: "culture",
    children: [
      { id: "books", name: "Livres & Papeterie", slug: "livres" },
    ],
  },
  {
    id: "beauty",
    name: "Beauté",
    slug: "beaute",
    children: [
      { id: "perfumes", name: "Parfums", slug: "parfums" },
    ],
  },
  {
    id: "artisanat",
    name: "Artisanat",
    slug: "artisanat",
    children: [
      { id: "raphia", name: "Rotin & Raphia", slug: "rotin-raphia" },
    ],
  },
];
