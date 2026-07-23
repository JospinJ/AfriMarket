/** Activité live mockée — social proof & notifications commerciales. */

export interface LiveActivity {
  id: string;
  type: "purchase" | "sale" | "view" | "premium";
  message: string;
  city: string;
  minutesAgo: number;
}

export const LIVE_ACTIVITIES: LiveActivity[] = [
  {
    id: "a1",
    type: "purchase",
    message: "iPhone 13 — Express",
    city: "Douala",
    minutesAgo: 1,
  },
  {
    id: "a2",
    type: "sale",
    message: "Casque Bluetooth JBL",
    city: "Yaoundé",
    minutesAgo: 3,
  },
  {
    id: "a3",
    type: "premium",
    message: "Tech Yaoundé Pro — Gold",
    city: "Yaoundé",
    minutesAgo: 5,
  },
  {
    id: "a4",
    type: "purchase",
    message: "Samsung Galaxy A15",
    city: "Bafoussam",
    minutesAgo: 7,
  },
  {
    id: "a5",
    type: "view",
    message: "48 personnes regardent les Offres Flash",
    city: "Douala",
    minutesAgo: 0,
  },
  {
    id: "a6",
    type: "sale",
    message: "Riz 25 kg — Gros",
    city: "Garoua",
    minutesAgo: 12,
  },
];

export const DISCOVERY_ITEMS = [
  "🔥 Flash -40% smartphones",
  "👑 Boutiques Elite",
  "⚡ Livraison 24h Douala",
  "🌍 Import tendance",
  "🏭 Prix usine MOQ",
  "🆕 Nouveautés tech",
  "⭐ Top vendeurs vérifiés",
  "📦 Stock local garanti",
] as const;
