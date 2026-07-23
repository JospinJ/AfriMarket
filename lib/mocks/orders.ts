import { IMAGES } from "@/lib/constants/images";
import type { Order } from "@/types/order";
import type { DeliveryTracking } from "@/types/delivery";

export const mockOrders: Order[] = [
  {
    id: "order-001",
    buyerId: "user-buyer-1",
    items: [
      {
        productId: "prod-1",
        sellerId: "seller-1",
        mode: "express",
        quantity: 1,
        unitPrice: 125000,
        title: "Samsung Galaxy A15 128Go",
        image: IMAGES.products.phone1,
      },
      {
        productId: "prod-4",
        sellerId: "seller-1",
        mode: "import",
        quantity: 2,
        unitPrice: 22000,
        title: "Casque Bluetooth JBL Tune 510",
        image: IMAGES.products.headphone,
      },
    ],
    subtotal: 169000,
    deliveryFee: 1500,
    discount: 0,
    total: 170500,
    currency: "FCFA",
    status: "in_delivery",
    paymentMethod: "mobile_money",
    address: {
      id: "addr-1",
      fullName: "Aïcha Mbarga",
      phone: "677123456",
      country: "CM",
      city: "Douala",
      district: "Akwa",
      street: "Rue Joss",
      landmark: "Immeuble bleu, 2e étage",
    },
    createdAt: "2026-07-04T14:30:00Z",
  },
  {
    id: "order-002",
    buyerId: "user-buyer-1",
    items: [
      {
        productId: "prod-2",
        sellerId: "seller-2",
        mode: "express",
        quantity: 1,
        unitPrice: 385000,
        title: "iPhone 13 Reconditionné 256Go",
        image: IMAGES.products.phone2,
      },
    ],
    subtotal: 385000,
    deliveryFee: 1500,
    discount: 0,
    total: 386500,
    currency: "FCFA",
    status: "confirmed",
    paymentMethod: "mobile_money",
    address: {
      id: "addr-1",
      fullName: "Aïcha Mbarga",
      phone: "677123456",
      country: "CM",
      city: "Douala",
      district: "Bonamoussadi",
    },
    createdAt: "2026-07-05T08:00:00Z",
  },
];

export const mockTracking: Record<string, DeliveryTracking> = {
  "order-001": {
    orderId: "order-001",
    steps: [
      { key: "confirmed", label: "Confirmée", done: true, at: "2026-07-04T14:30:00Z" },
      { key: "prepared", label: "Préparée", done: true, at: "2026-07-04T16:00:00Z" },
      { key: "shipped", label: "Expédiée", done: true, at: "2026-07-05T09:00:00Z" },
      { key: "in_delivery", label: "En livraison", done: false },
      { key: "delivered", label: "Livrée", done: false },
    ],
    driver: {
      id: "driver-1",
      userId: "user-driver-1",
      name: "Ibrahim Nkoulou",
      photoUrl: IMAGES.misc.driver,
      vehicle: "moto",
      rating: { average: 4.8, count: 312 },
      onTimeRatePct: 96,
    },
    driverPosition: { lat: 4.0511, lng: 9.7679 },
    etaMinutes: 18,
    otpCode: "4829",
  },
  "order-002": {
    orderId: "order-002",
    steps: [
      { key: "confirmed", label: "Confirmée", done: true, at: "2026-07-05T08:00:00Z" },
      { key: "prepared", label: "Préparée", done: false },
      { key: "shipped", label: "Expédiée", done: false },
      { key: "in_delivery", label: "En livraison", done: false },
      { key: "delivered", label: "Livrée", done: false },
    ],
  },
};

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id);
}

export function getTrackingByOrderId(orderId: string): DeliveryTracking | undefined {
  return mockTracking[orderId];
}
