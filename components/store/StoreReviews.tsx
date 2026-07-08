import { StarRating } from "@/components/shared/StarRating";
import { getReviewsBySeller, getSellerRatingHistogram } from "@/lib/mocks/reviews";

interface StoreReviewsProps {
  sellerId: string;
  averageRating: number;
  reviewCount: number;
}

export function StoreReviews({ sellerId, averageRating, reviewCount }: StoreReviewsProps) {
  const reviews = getReviewsBySeller(sellerId);
  const histogram = getSellerRatingHistogram(sellerId);
  const maxCount = Math.max(...Object.values(histogram), 1);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-4xl font-bold text-night">{averageRating.toFixed(1)}</p>
            <StarRating rating={averageRating} count={reviewCount} />
          </div>
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-8 text-sand">{star}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand/20">
                  <div
                    className="h-full bg-gold"
                    style={{ width: `${((histogram[star] ?? 0) / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-sand">{histogram[star] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ul className="space-y-4">
        {reviews.length === 0 ? (
          <li className="rounded-xl bg-white p-6 text-center text-sand">
            Aucun avis pour cette boutique
          </li>
        ) : (
          reviews.map((review) => (
            <li key={review.id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-night">{review.authorName}</span>
                <StarRating rating={review.rating} size="sm" />
              </div>
              {review.verifiedPurchase && (
                <span className="mt-1 inline-block text-xs text-green-deep">
                  ✓ Achat vérifié
                </span>
              )}
              {review.comment && (
                <p className="mt-2 text-sm text-night/80">{review.comment}</p>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
