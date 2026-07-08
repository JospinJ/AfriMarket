import type { CountryCode, UUID } from "./common";
import type { SellerTier } from "./user";

export interface Seller {
  id: UUID;
  userId: UUID;
  storeName: string;
  storeSlug: string;
  logoUrl?: string;
  bannerUrl?: string;
  tier: SellerTier;
  kycStatus: "none" | "pending" | "verified" | "rejected";
  rating: { average: number; count: number };
  responseRatePct?: number;
  responseTimeMins?: number;
  followersCount?: number;
  deliveredOrders?: number;
  country: CountryCode;
  city?: string;
  badges?: ("verified" | "premium" | "elite" | "top_rated" | "local")[];
}
