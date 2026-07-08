"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PremiumFloatingItem } from "@/lib/utils/premium-floating";

interface PremiumOrbCardProps {
  item: PremiumFloatingItem;
  isSurprise?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const SIZES = {
  sm: { orb: "h-14 w-14", label: "w-[88px] text-[9px]", badge: "text-[7px]" },
  md: { orb: "h-16 w-16 sm:h-[72px] sm:w-[72px]", label: "w-[96px] sm:w-[100px] text-[9px] sm:text-[10px]", badge: "text-[7px] sm:text-[8px]" },
  lg: { orb: "h-20 w-20 md:h-[84px] md:w-[84px]", label: "w-[108px] text-[10px]", badge: "text-[8px]" },
} as const;

export function PremiumOrbCard({
  item,
  isSurprise = false,
  size = "md",
  showLabel = true,
  className,
}: PremiumOrbCardProps) {
  const s = SIZES[size];

  return (
    <motion.div
      animate={
        isSurprise
          ? { scale: [1, 1.1, 1.04, 1], y: [0, -5, -2, 0] }
          : { scale: 1, y: 0 }
      }
      transition={{ duration: 0.7, ease: [0.34, 1.4, 0.64, 1] }}
      className={cn("group relative shrink-0", className)}
    >
      {isSurprise && (
        <span
          className="premium-orb-shine pointer-events-none absolute -inset-2 rounded-full"
          aria-hidden
        />
      )}

      <Link
        href={item.href}
        className={cn(
          "relative flex flex-col items-center gap-2 outline-none transition-transform duration-200 group-hover:scale-[1.05] group-focus-visible:scale-[1.05]",
          isSurprise && "premium-orb-surprise-glow rounded-full",
        )}
        aria-label={`${item.label} — vendeur ${item.tier === "elite" ? "Elite" : "Gold"}`}
      >
        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-full border-2 bg-night",
            s.orb,
            item.tier === "elite"
              ? "border-gold/80 shadow-[0_4px_16px_rgba(201,162,39,0.35)]"
              : "border-primary/70 shadow-[0_4px_12px_rgba(255,153,0,0.28)]",
          )}
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="84px"
            className="object-cover"
            draggable={false}
          />
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-center justify-center gap-0.5 py-0.5 font-bold uppercase tracking-wide text-night",
              s.badge,
              item.tier === "elite" ? "bg-gold/95" : "bg-primary/95",
            )}
          >
            <Crown className="h-2 w-2" aria-hidden />
            {item.tier}
          </span>
        </div>

        {showLabel && (
          <div
            className={cn(
              "rounded-full border border-white/10 bg-night/90 px-2.5 py-1 text-center shadow-md",
              s.label,
            )}
          >
            <p className="truncate font-semibold leading-tight text-white">{item.label}</p>
            <p className="mt-0.5 text-[9px] leading-tight text-primary">{item.sublabel}</p>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
