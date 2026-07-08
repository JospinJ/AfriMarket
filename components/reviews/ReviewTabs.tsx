"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { RatingDistribution } from "@/components/reviews/RatingDistribution";
import { ModerationPanel } from "@/components/reviews/ModerationPanel";
import { mockReviews } from "@/lib/mocks/reviews";
import type { ReviewKind } from "@/types/review";

export interface ReviewTabsProps {
  productId?: string;
  sellerId?: string;
  showModeration?: boolean;
}

export function ReviewTabs({ productId, sellerId, showModeration = false }: ReviewTabsProps) {
  const filterByKind = (kind: ReviewKind) =>
    mockReviews.filter((r) => {
      if (r.kind !== kind) return false;
      if (kind === "product" && productId && r.kind === "product") return r.productId === productId;
      if (kind === "seller" && sellerId && r.kind === "seller") return r.sellerId === sellerId;
      return true;
    });

  const productReviews = filterByKind("product");
  const sellerReviews = filterByKind("seller");
  const deliveryReviews = filterByKind("delivery");

  return (
    <div className="space-y-6">
      <RatingDistribution reviews={[...productReviews, ...sellerReviews, ...deliveryReviews]} />
      <Tabs defaultValue="product">
        <TabsList>
          <TabsTrigger value="product">Produit ({productReviews.length})</TabsTrigger>
          <TabsTrigger value="seller">Vendeur ({sellerReviews.length})</TabsTrigger>
          <TabsTrigger value="delivery">Livraison ({deliveryReviews.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="product" className="mt-4 space-y-4">
          {productReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </TabsContent>
        <TabsContent value="seller" className="mt-4 space-y-4">
          {sellerReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </TabsContent>
        <TabsContent value="delivery" className="mt-4 space-y-4">
          {deliveryReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </TabsContent>
      </Tabs>
      {showModeration && <ModerationPanel reviews={mockReviews.filter((r) => r.reported)} />}
    </div>
  );
}
