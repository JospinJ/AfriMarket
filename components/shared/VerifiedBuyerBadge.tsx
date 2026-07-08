import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export interface VerifiedBuyerBadgeProps {
  className?: string;
  size?: "sm" | "default";
}

export function VerifiedBuyerBadge({ className, size = "default" }: VerifiedBuyerBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 border-green-deep/30 text-green-deep",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
    >
      <BadgeCheck className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      Achat vérifié
    </Badge>
  );
}
