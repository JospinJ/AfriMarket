import type { Address } from "@/types/common";
import type { CartItem, PaymentMethod } from "@/types/order";
import type { MobileMoneyOperator } from "@/types/payment";
import { validatePhone } from "@/lib/utils/validate-phone";
import { validateDeliveryZone } from "@/lib/mocks/delivery-zones";
import { getProductById } from "@/lib/mocks/products";

export interface CheckoutValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CheckoutPayload {
  address: Address;
  deliveryMethod: string;
  paymentMethod: PaymentMethod;
  mobileMoney?: {
    operator: MobileMoneyOperator;
    phone: string;
    otp?: string;
  };
  items: CartItem[];
}

// TODO API: POST /checkout/validate → { addressId, items[], deliveryMethod } → { valid: boolean, errors[] }
export async function validateCheckout(
  payload: CheckoutPayload
): Promise<CheckoutValidationResult> {
  const errors: string[] = [];

  if (!payload.address.fullName.trim()) {
    errors.push("Nom complet requis");
  }
  if (!validatePhone(payload.address.phone, payload.address.country)) {
    errors.push("Numéro de téléphone invalide");
  }
  const zoneCheck = validateDeliveryZone(
    payload.address.country,
    payload.address.city
  );
  if (!zoneCheck.valid) {
    errors.push(zoneCheck.message ?? "Zone de livraison non couverte");
  }

  for (const item of payload.items) {
    const product = getProductById(item.productId);
    if (!product) {
      errors.push(`Produit ${item.productId} introuvable`);
      continue;
    }
    const offer = product.offers.find((o) => o.mode === item.mode);
    if (!offer) {
      errors.push(`Mode ${item.mode} indisponible pour ${product.title}`);
      continue;
    }
    if (item.quantity > offer.stock) {
      errors.push(`Stock insuffisant pour ${product.title}`);
    }
    if (item.unitPrice !== offer.price) {
      errors.push(`Prix modifié pour ${product.title}. Veuillez rafraîchir le panier.`);
    }
    if (item.mode === "gros" && offer.moq && item.quantity < offer.moq) {
      errors.push(`MOQ non respecté pour ${product.title} (min. ${offer.moq})`);
    }
  }

  return { valid: errors.length === 0, errors };
}

// TODO API: POST /payments/mobile-money → { operator, phone, amount } → { status, sessionId }
export async function initiateMobileMoneyPayment(
  operator: MobileMoneyOperator,
  phone: string,
  amount: number
): Promise<{ status: "otp_sent"; sessionId: string }> {
  await new Promise((r) => setTimeout(r, 800));
  return { status: "otp_sent", sessionId: `mm-${Date.now()}` };
}

// TODO API: POST /payments/otp/verify → { sessionId, otp } → { status: "success" | "failed" | "timeout" }
export async function verifyOtp(
  sessionId: string,
  otp: string
): Promise<{ status: "success" | "failed" | "timeout" }> {
  await new Promise((r) => setTimeout(r, 600));
  if (otp.length === 6 && otp !== "000000") {
    return { status: "success" };
  }
  return { status: "failed" };
}

// TODO API: POST /orders → CheckoutPayload → { orderId, status }
export async function createOrder(
  payload: CheckoutPayload
): Promise<{ orderId: string; status: "confirmed" }> {
  const validation = await validateCheckout(payload);
  if (!validation.valid) {
    throw new Error(validation.errors.join(", "));
  }
  await new Promise((r) => setTimeout(r, 1000));
  return { orderId: `order-${Date.now()}`, status: "confirmed" };
}

// TODO API: POST /coupons/validate → { code, subtotal } → { valid, discount, type }
export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<{ valid: boolean; discount: number; message?: string }> {
  await new Promise((r) => setTimeout(r, 400));
  const coupons: Record<string, { discount: number; min?: number }> = {
    AFRICA10: { discount: Math.round(subtotal * 0.1) },
    LIVRAISON: { discount: 1500, min: 50000 },
  };
  const coupon = coupons[code.toUpperCase()];
  if (!coupon) {
    return { valid: false, discount: 0, message: "Code promo invalide" };
  }
  if (coupon.min && subtotal < coupon.min) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum ${coupon.min} FCFA requis`,
    };
  }
  return { valid: true, discount: coupon.discount };
}
