import type { CountryCode, ISODate, Money, UUID } from "./common";
import type { SellerTier } from "./user";

export interface Plan {
  tier: SellerTier;
  monthlyPrice: Money;
  yearlyPrice: Money;
  features: string[];
  visibilityBoost: number;
  commissionPct: number;
}

export type AdObjective = "sales" | "clicks" | "visibility" | "branding" | "add_to_cart";
export type AdPlacement = "home" | "search" | "category" | "recommendations" | "store";
export type CampaignStatus = "active" | "paused" | "ended" | "rejected" | "in_review";

export interface AdCampaign {
  id: UUID;
  sellerId: UUID;
  productId?: UUID;
  name: string;
  objective: AdObjective;
  placements: AdPlacement[];
  budgetTotal: Money;
  budgetDaily?: Money;
  spent: Money;
  startAt: ISODate;
  endAt?: ISODate;
  status: CampaignStatus;
  targeting: {
    countries?: CountryCode[];
    cities?: string[];
    ageRange?: [number, number];
    gender?: "m" | "f" | "all";
    interests?: string[];
    behavior?: string[];
  };
  metrics?: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: Money;
    ctr: number;
    roi: number;
  };
}
