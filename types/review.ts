import type { ISODate, UUID } from "./common";

export type ReviewKind = "product" | "seller" | "delivery";

export interface ReviewBase {
  id: UUID;
  kind: ReviewKind;
  authorId: UUID;
  authorName?: string;
  rating: number;
  comment?: string;
  mediaUrls?: string[];
  voiceUrl?: string;
  verifiedPurchase: boolean;
  orderId?: UUID;
  helpfulCount?: number;
  reported?: boolean;
  createdAt: ISODate;
}

export interface ProductReview extends ReviewBase {
  kind: "product";
  productId: UUID;
}

export interface SellerReview extends ReviewBase {
  kind: "seller";
  sellerId: UUID;
}

export interface DeliveryReview extends ReviewBase {
  kind: "delivery";
  driverId: UUID;
}

export type Review = ProductReview | SellerReview | DeliveryReview;
