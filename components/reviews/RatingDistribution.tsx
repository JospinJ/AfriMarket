import { getRatingDistribution } from "@/lib/mocks/reviews";
import type { Review } from "@/types/review";

export interface RatingDistributionProps {
  reviews: Review[];
}

export function RatingDistribution({ reviews }: RatingDistributionProps) {
  const dist = getRatingDistribution(reviews);
  const total = reviews.length || 1;
  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="rounded-lg border border-sand/20 bg-white p-4">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-3xl font-bold text-night">{average.toFixed(1)}</span>
        <span className="text-sm text-sand">sur 5 · {reviews.length} avis</span>
      </div>
      <div className="mt-4 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = dist[star] ?? 0;
          const pct = (count / total) * 100;
          return (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="w-8 text-sand">{star} ★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand/20">
                <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-8 text-right text-xs text-sand">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
