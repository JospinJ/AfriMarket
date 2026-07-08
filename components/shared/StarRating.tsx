import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({ rating, count, size = "md", className }: StarRatingProps) {
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex" aria-label={`Note ${rating} sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={iconSize}
            className={cn(
              i < Math.round(rating)
                ? "fill-gold text-gold"
                : "fill-none text-sand/50"
            )}
          />
        ))}
      </div>
      <span className={cn("font-medium text-night", size === "sm" ? "text-xs" : "text-sm")}>
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={cn("text-sand", size === "sm" ? "text-xs" : "text-sm")}>
          ({count})
        </span>
      )}
    </div>
  );
}
