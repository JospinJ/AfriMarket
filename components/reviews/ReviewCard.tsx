import { StarRating } from "@/components/shared/StarRating";
import { VerifiedBuyerBadge } from "@/components/shared/VerifiedBuyerBadge";
import type { Review } from "@/types/review";

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-lg border border-sand/20 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <StarRating rating={review.rating} size="sm" />
        {review.verifiedPurchase && <VerifiedBuyerBadge size="sm" />}
        {review.reported && (
          <span className="rounded bg-terracotta/10 px-2 py-0.5 text-xs text-terracotta">Signalé</span>
        )}
      </div>
      {review.authorName && (
        <p className="mt-2 text-sm font-medium text-night">{review.authorName}</p>
      )}
      {review.comment && <p className="mt-1 text-sm text-night/80">{review.comment}</p>}
      <footer className="mt-3 flex items-center gap-4 text-xs text-sand">
        <time dateTime={review.createdAt}>{date}</time>
        {review.helpfulCount !== undefined && review.helpfulCount > 0 && (
          <span>{review.helpfulCount} utile(s)</span>
        )}
      </footer>
    </article>
  );
}
