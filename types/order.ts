import type { Address, Currency, ISODate, Money, UUID } from "./common";
import type { PurchaseMode } from "./product";

export interface CartItem {
  productId: UUID;
  sellerId: UUID;
  variantId?: UUID;
  mode: PurchaseMode;
  quantity: number;
  unitPrice: Money;
  title?: string;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
}

export type OrderStatus =
  | "confirmed"
  | "prepared"
  | "shipped"
  | "in_delivery"
  | "delivered"
  | "cancelled"
  | "disputed";

export type PaymentMethod = "mobile_money" | "card" | "cod" | "wallet";

export interface Order {
  id: UUID;
  buyerId: UUID;
  items: CartItem[];
  subtotal: Money;
  deliveryFee: Money;
  discount: Money;
  total: Money;
  currency: Currency;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  address: Address;
  createdAt: ISODate;
}
