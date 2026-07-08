import type { ISODate, Money, UUID } from "./common";

export type PurchaseMode = "express" | "import" | "gros";

export const PRODUCT_MODES: PurchaseMode[] = ["express", "import", "gros"];

export interface Offer {
  mode: PurchaseMode;
  price: Money;
  originalPrice?: Money;
  deliveryEtaDays: [number, number];
  stock: number;
  moq?: number;
}

export interface ProductVariant {
  id: UUID;
  label: string;
  attributes: Record<string, string>;
  stockByMode?: Partial<Record<PurchaseMode, number>>;
}

export type BadgeType =
  | "trending"
  | "flash_sale"
  | "new"
  | "premium_seller"
  | "verified"
  | "fast_delivery";

export interface Product {
  id: UUID;
  slug: string;
  title: string;
  brand?: string;
  categoryId: string;
  sellerId: UUID;
  images: string[];
  videoUrl?: string;
  has360?: boolean;
  offers: Offer[];
  variants?: ProductVariant[];
  rating: { average: number; count: number };
  soldCount?: number;
  viewsCount?: number;
  badges?: BadgeType[];
  specs?: Record<string, string>;
  createdAt: ISODate;
}
