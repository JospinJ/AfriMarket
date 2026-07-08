"use client";

import { ReviewTabs } from "@/components/reviews/ReviewTabs";

export default function SellerReviewsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-night">Avis clients</h1>
        <p className="mt-1 text-sm text-sand">Produits, vendeur et livraisons</p>
      </header>
      <ReviewTabs sellerId="seller-1" showModeration={false} />
    </div>
  );
}
