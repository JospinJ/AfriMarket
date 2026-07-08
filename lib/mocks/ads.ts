import type { AdCampaign } from "@/types/ads";

export const mockCampaigns: AdCampaign[] = [
  {
    id: "camp-1",
    sellerId: "user-seller-1",
    productId: "prod-1",
    name: "Promo Express Téléphones",
    objective: "sales",
    placements: ["home", "search", "category"],
    budgetTotal: 500000,
    budgetDaily: 25000,
    spent: 187500,
    startAt: "2026-06-01T00:00:00Z",
    endAt: "2026-07-31T23:59:59Z",
    status: "active",
    targeting: {
      countries: ["CM"],
      cities: ["Douala", "Yaoundé"],
      ageRange: [18, 45],
      gender: "all",
      interests: ["tech", "smartphones"],
    },
    metrics: {
      impressions: 125000,
      clicks: 3750,
      conversions: 187,
      revenue: 9350000,
      ctr: 3.0,
      roi: 4.98,
    },
  },
  {
    id: "camp-2",
    sellerId: "user-seller-1",
    name: "Visibilité boutique",
    objective: "visibility",
    placements: ["home", "recommendations"],
    budgetTotal: 200000,
    spent: 45000,
    startAt: "2026-07-01T00:00:00Z",
    status: "active",
    targeting: { countries: ["CM"], cities: ["Douala"] },
    metrics: {
      impressions: 45000,
      clicks: 900,
      conversions: 0,
      revenue: 0,
      ctr: 2.0,
      roi: 0,
    },
  },
];

export const mockAdsChartData = [
  { label: "Lun", value: 1200 },
  { label: "Mar", value: 1800 },
  { label: "Mer", value: 1500 },
  { label: "Jeu", value: 2200 },
  { label: "Ven", value: 1900 },
  { label: "Sam", value: 2800 },
  { label: "Dim", value: 2100 },
];

// TODO API: GET /ads/campaigns → AdCampaign[]
// TODO API: POST /ads/campaigns → AdCampaign
