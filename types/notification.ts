import type { Role } from "@/types/user";

export type NotificationCategory =
  | "order"
  | "product"
  | "message"
  | "review"
  | "payment"
  | "promo"
  | "system";

export type NotificationEventType =
  // Vendeur
  | "seller_product_added"
  | "seller_product_approved"
  | "seller_product_rejected"
  | "seller_new_order"
  | "seller_payment_confirmed"
  | "seller_stock_out"
  | "seller_new_message"
  | "seller_new_review"
  | "seller_product_modification"
  | "seller_product_report"
  | "seller_platform_announcement"
  // Acheteur
  | "buyer_order_confirmed"
  | "buyer_order_shipped"
  | "buyer_order_delivered"
  | "buyer_refund_processed"
  | "buyer_price_drop"
  | "buyer_seller_reply"
  | "buyer_promo_interest";

export interface AppNotification {
  id: string;
  type: NotificationEventType;
  category: NotificationCategory;
  titleKey: string;
  messageKey: string;
  /** Paramètres d'interpolation pour titleKey / messageKey */
  params?: Record<string, string | number>;
  href?: string;
  read: boolean;
  createdAt: string;
  targetRole: Role;
}
