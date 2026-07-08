import type { CountryCode, ISODate, UUID } from "./common";

export type Role = "admin" | "seller" | "driver" | "buyer";
export type SellerTier = "basic" | "gold" | "elite";

export interface User {
  id: UUID;
  role: Role;
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
  phone: string;
  email?: string;
  country: CountryCode;
  city?: string;
  createdAt: ISODate;
  kycStatus?: "none" | "pending" | "verified" | "rejected";
  sellerTier?: SellerTier;
  isSupport?: boolean;
}

export type PermissionAction =
  | "viewFullAnalytics"
  | "manageUsers"
  | "createProduct"
  | "acceptDelivery"
  | "createCampaign"
  | "moderateDispute";
