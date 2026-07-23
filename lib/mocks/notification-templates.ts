import type { AppNotification } from "@/types/notification";
import type { Role } from "@/types/user";

const SELLER_SEED: Omit<AppNotification, "id" | "read" | "createdAt">[] = [
  {
    type: "seller_new_order",
    category: "order",
    titleKey: "notifications.events.seller_new_order.title",
    messageKey: "notifications.events.seller_new_order.message",
    params: { orderId: "AMH-2847", amount: "45 000" },
    href: "/seller/orders",
    targetRole: "seller",
  },
  {
    type: "seller_product_approved",
    category: "product",
    titleKey: "notifications.events.seller_product_approved.title",
    messageKey: "notifications.events.seller_product_approved.message",
    params: { product: "Casque Bluetooth JBL Tune 510" },
    href: "/seller/products",
    targetRole: "seller",
  },
  {
    type: "seller_stock_out",
    category: "product",
    titleKey: "notifications.events.seller_stock_out.title",
    messageKey: "notifications.events.seller_stock_out.message",
    params: { product: "Samsung Galaxy A15" },
    href: "/seller/products",
    targetRole: "seller",
  },
];

const BUYER_SEED: Omit<AppNotification, "id" | "read" | "createdAt">[] = [
  {
    type: "buyer_order_shipped",
    category: "order",
    titleKey: "notifications.events.buyer_order_shipped.title",
    messageKey: "notifications.events.buyer_order_shipped.message",
    params: { orderId: "AMH-2812", eta: "24–48 h" },
    href: "/buyer/orders",
    targetRole: "buyer",
  },
  {
    type: "buyer_price_drop",
    category: "promo",
    titleKey: "notifications.events.buyer_price_drop.title",
    messageKey: "notifications.events.buyer_price_drop.message",
    params: { product: "Casque Bluetooth", price: "12 500", discount: "15" },
    href: "/products/casque-bluetooth",
    targetRole: "buyer",
  },
];

const DRIVER_SEED: Omit<AppNotification, "id" | "read" | "createdAt">[] = [
  {
    type: "seller_platform_announcement",
    category: "system",
    titleKey: "notifications.events.seller_platform_announcement.title",
    messageKey: "notifications.events.seller_platform_announcement.message",
    params: { message: "Nouvelle zone de livraison : Douala Nord." },
    href: "/driver/deliveries",
    targetRole: "driver",
  },
];

export function getSeedNotificationsForRole(
  role: Role,
): Omit<AppNotification, "id" | "read" | "createdAt">[] {
  switch (role) {
    case "seller":
      return SELLER_SEED;
    case "buyer":
      return BUYER_SEED;
    case "driver":
      return DRIVER_SEED;
    case "admin":
      return [
        {
          type: "seller_platform_announcement",
          category: "system",
          titleKey: "notifications.events.seller_platform_announcement.title",
          messageKey: "notifications.events.seller_platform_announcement.message",
          params: { message: "3 litiges en attente de modération." },
          href: "/support/disputes",
          targetRole: "admin",
        },
      ];
    default:
      return [];
  }
}

/** Événements simulés en temps réel par rôle. */
export const LIVE_EVENT_POOL: Record<
  Role,
  Omit<AppNotification, "id" | "read" | "createdAt" | "targetRole">[]
> = {
  seller: [
    {
      type: "seller_new_order",
      category: "order",
      titleKey: "notifications.events.seller_new_order.title",
      messageKey: "notifications.events.seller_new_order.message",
      params: { orderId: "AMH-2901", amount: "78 500" },
      href: "/seller/orders",
    },
    {
      type: "seller_payment_confirmed",
      category: "payment",
      titleKey: "notifications.events.seller_payment_confirmed.title",
      messageKey: "notifications.events.seller_payment_confirmed.message",
      params: { orderId: "AMH-2898" },
      href: "/seller/orders",
    },
    {
      type: "seller_new_message",
      category: "message",
      titleKey: "notifications.events.seller_new_message.title",
      messageKey: "notifications.events.seller_new_message.message",
      params: { customer: "Marie K.", product: "Sac en raphia" },
      href: "/messages",
    },
    {
      type: "seller_new_review",
      category: "review",
      titleKey: "notifications.events.seller_new_review.title",
      messageKey: "notifications.events.seller_new_review.message",
      params: { rating: "5", product: "Téléphone Tecno", excerpt: "Livraison rapide !" },
      href: "/seller/reviews",
    },
    {
      type: "seller_product_modification",
      category: "product",
      titleKey: "notifications.events.seller_product_modification.title",
      messageKey: "notifications.events.seller_product_modification.message",
      params: { product: "Moto 125cc" },
      href: "/seller/products",
    },
    {
      type: "seller_product_report",
      category: "product",
      titleKey: "notifications.events.seller_product_report.title",
      messageKey: "notifications.events.seller_product_report.message",
      params: { product: "Chargeur universel" },
      href: "/seller/products",
    },
    {
      type: "seller_platform_announcement",
      category: "promo",
      titleKey: "notifications.events.seller_platform_announcement.title",
      messageKey: "notifications.events.seller_platform_announcement.message",
      params: { message: "Tech Week Cameroun — boostez votre visibilité !" },
      href: "/seller/ads",
    },
  ],
  buyer: [
    {
      type: "buyer_order_confirmed",
      category: "order",
      titleKey: "notifications.events.buyer_order_confirmed.title",
      messageKey: "notifications.events.buyer_order_confirmed.message",
      params: { orderId: "AMH-2910", amount: "32 000" },
      href: "/buyer/orders",
    },
    {
      type: "buyer_order_delivered",
      category: "order",
      titleKey: "notifications.events.buyer_order_delivered.title",
      messageKey: "notifications.events.buyer_order_delivered.message",
      params: { orderId: "AMH-2805" },
      href: "/buyer/orders",
    },
    {
      type: "buyer_refund_processed",
      category: "payment",
      titleKey: "notifications.events.buyer_refund_processed.title",
      messageKey: "notifications.events.buyer_refund_processed.message",
      params: { amount: "15 000" },
      href: "/buyer/orders",
    },
    {
      type: "buyer_seller_reply",
      category: "message",
      titleKey: "notifications.events.buyer_seller_reply.title",
      messageKey: "notifications.events.buyer_seller_reply.message",
      params: { seller: "Boutique Étoile", product: "iPhone 13 Reconditionné" },
      href: "/messages",
    },
    {
      type: "buyer_promo_interest",
      category: "promo",
      titleKey: "notifications.events.buyer_promo_interest.title",
      messageKey: "notifications.events.buyer_promo_interest.message",
      params: { discount: "40", category: "Smartphones" },
      href: "/flash-sales",
    },
  ],
  driver: [
    {
      type: "seller_platform_announcement",
      category: "system",
      titleKey: "notifications.events.seller_platform_announcement.title",
      messageKey: "notifications.events.seller_platform_announcement.message",
      params: { message: "Nouvelle course disponible — Bonamoussadi → Akwa." },
      href: "/driver/deliveries",
    },
  ],
  admin: [
    {
      type: "seller_product_report",
      category: "system",
      titleKey: "notifications.events.seller_product_report.title",
      messageKey: "notifications.events.seller_product_report.message",
      params: { product: "Produit signalé #4421" },
      href: "/support/disputes",
    },
  ],
};
