import type { Plan } from "@/types/ads";

export const mockPremiumPlans: Plan[] = [
  {
    tier: "basic",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ["Boutique standard", "Commission 12%", "Support email"],
    visibilityBoost: 1,
    commissionPct: 12,
  },
  {
    tier: "gold",
    monthlyPrice: 25000,
    yearlyPrice: 250000,
    features: ["Badge Premium", "Analytics complètes", "Commission 8%", "Boost visibilité x2"],
    visibilityBoost: 2,
    commissionPct: 8,
  },
  {
    tier: "elite",
    monthlyPrice: 75000,
    yearlyPrice: 750000,
    features: ["Badge Elite", "Analytics avancées", "Commission 5%", "Boost x3", "Account manager"],
    visibilityBoost: 3,
    commissionPct: 5,
  },
];

export const mockDashboardKpis = {
  admin: [
    { title: "GMV (30j)", value: "45,2 M FCFA", change: "+12% vs mois dernier", trend: "up" as const },
    { title: "Commandes actives", value: "1 234", change: "+8%", trend: "up" as const },
    { title: "Litiges ouverts", value: "23", change: "-5%", trend: "down" as const },
    { title: "Vendeurs actifs", value: "456", change: "+3%", trend: "up" as const },
  ],
  seller: [
    { title: "Ventes (30j)", value: "2,8 M FCFA", change: "+15%", trend: "up" as const },
    { title: "Commandes", value: "89", change: "+6%", trend: "up" as const },
    { title: "Note moyenne", value: "4.7", change: "stable", trend: "neutral" as const },
    { title: "Taux conversion", value: "3.2%", change: "+0.4%", trend: "up" as const },
  ],
  driver: [
    { title: "Livraisons (7j)", value: "34", change: "+5", trend: "up" as const },
    { title: "Gains (7j)", value: "85 000 FCFA", change: "+12%", trend: "up" as const },
    { title: "Ponctualité", value: "96%", change: "+1%", trend: "up" as const },
    { title: "Note", value: "4.9", change: "stable", trend: "neutral" as const },
  ],
  buyer: [
    { title: "Commandes", value: "12", change: "2 en cours", trend: "neutral" as const },
    { title: "Économies Import", value: "125 000 FCFA", change: "vs Express", trend: "up" as const },
    { title: "Litiges", value: "1", change: "en médiation", trend: "neutral" as const },
    { title: "Points fidélité", value: "340", change: "+20 ce mois", trend: "up" as const },
  ],
  support: [
    { title: "Litiges ouverts", value: "23", change: "5 critiques", trend: "neutral" as const },
    { title: "SLA respectés", value: "94%", change: "+2%", trend: "up" as const },
    { title: "Temps médian", value: "4h 20", change: "-30 min", trend: "up" as const },
    { title: "Résolus (7j)", value: "67", change: "+12", trend: "up" as const },
  ],
};

// TODO API: GET /dashboard/kpis?role= → KpiData[]
