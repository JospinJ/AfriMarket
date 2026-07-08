import type { Review } from "@/types/review";
import { specialtyReviews } from "@/lib/mocks/specialty-stores";

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    kind: "product",
    productId: "prod-1",
    authorId: "user-buyer-1",
    authorName: "Aïcha M.",
    rating: 5,
    comment: "Produit conforme, livraison express rapide !",
    verifiedPurchase: true,
    orderId: "order-101",
    helpfulCount: 12,
    createdAt: "2026-06-15T10:00:00Z",
  },
  {
    id: "rev-2",
    kind: "product",
    productId: "prod-1",
    authorId: "user-buyer-2",
    authorName: "Jean K.",
    rating: 4,
    comment: "Bon rapport qualité-prix en mode Import",
    verifiedPurchase: true,
    helpfulCount: 5,
    createdAt: "2026-06-10T08:00:00Z",
  },
  {
    id: "rev-3",
    kind: "seller",
    sellerId: "seller-1",
    authorId: "user-buyer-1",
    authorName: "Aïcha M.",
    rating: 5,
    comment: "Vendeur réactif sur WhatsApp",
    verifiedPurchase: true,
    helpfulCount: 8,
    createdAt: "2026-06-20T14:00:00Z",
  },
  {
    id: "rev-4",
    kind: "delivery",
    driverId: "user-driver-1",
    authorId: "user-buyer-1",
    authorName: "Aïcha M.",
    rating: 5,
    comment: "Livreur ponctuel et courtois",
    verifiedPurchase: true,
    helpfulCount: 3,
    createdAt: "2026-06-18T16:00:00Z",
  },
  {
    id: "rev-5",
    kind: "product",
    productId: "prod-2",
    authorId: "user-buyer-3",
    authorName: "Marie T.",
    rating: 2,
    comment: "Article endommagé à réception",
    verifiedPurchase: true,
    reported: true,
    helpfulCount: 1,
    createdAt: "2026-07-01T09:00:00Z",
  },
  ...specialtyReviews,
];

export function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of reviews) {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    dist[star] = (dist[star] ?? 0) + 1;
  }
  return dist;
}

export function getReviewsBySeller(sellerId: string): Review[] {
  return mockReviews.filter((r) => r.kind === "seller" && r.sellerId === sellerId);
}

export function getSellerRatingHistogram(sellerId: string): Record<number, number> {
  return getRatingDistribution(getReviewsBySeller(sellerId));
}

// TODO API: GET /reviews?productId=&sellerId= → Review[]
