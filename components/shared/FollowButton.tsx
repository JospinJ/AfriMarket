"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

interface FollowButtonProps {
  sellerId: string;
  initialFollowing?: boolean;
  className?: string;
}

export function FollowButton({
  sellerId,
  initialFollowing = false,
  className,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);

  const handleClick = () => {
    // TODO API: POST /stores/:id/follow → { following: boolean }
    setFollowing(!following);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={following ? "Ne plus suivre la boutique" : "Suivre la boutique"}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        following
          ? "bg-gold/15 text-gold"
          : "bg-green-deep text-white hover:bg-green-deep/90",
        className
      )}
    >
      <Heart size={18} className={following ? "fill-gold" : ""} />
      {following ? "Suivi" : "Suivre"}
    </button>
  );
}
