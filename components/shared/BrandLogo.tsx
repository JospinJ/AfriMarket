"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { BRAND } from "@/lib/constants/design";
import { ROUTES } from "@/lib/constants/routes";

interface BrandLogoProps {
  /** Hauteur cible en pixels — prioritaire sur `size` */
  heightPx?: number;
  size?: "xs" | "sm" | "md" | "lg";
  showName?: boolean;
  dark?: boolean;
  hideNameOnMobile?: boolean;
  className?: string;
}

const SIZE_HEIGHT: Record<NonNullable<BrandLogoProps["size"]>, number> = {
  xs: BRAND.logoSizes.navbarMobile,
  sm: BRAND.logoSizes.navbar,
  md: BRAND.logoSizes.drawer,
  lg: BRAND.logoSizes.footer,
};

const SIZE_TEXT: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-base",
  lg: "text-lg",
};

export function BrandLogo({
  heightPx,
  size = "md",
  showName = true,
  dark = false,
  hideNameOnMobile = false,
  className,
}: BrandLogoProps) {
  const displayHeight = heightPx ?? SIZE_HEIGHT[size];
  const displayWidth = Math.round(displayHeight * BRAND.logoAspect);

  return (
    <Link
      href={ROUTES.home}
      className={cn("group inline-flex max-w-full shrink-0 items-center gap-2", className)}
      aria-label={`${BRAND.name} — Accueil`}
    >
      <motion.span
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative inline-flex shrink-0 items-center justify-center"
        style={{ width: displayWidth, height: displayHeight, minWidth: displayWidth, minHeight: displayHeight }}
      >
        <Image
          src={BRAND.logoSrc}
          alt={BRAND.logoAlt}
          width={1024}
          height={682}
          sizes={`${displayWidth}px`}
          className={cn(
            "h-full w-full object-contain object-left",
            dark && "mix-blend-lighten",
          )}
          priority
        />
      </motion.span>
      {showName && (
        <span
          className={cn(
            "truncate font-display font-semibold leading-none tracking-tight",
            SIZE_TEXT[size],
            dark ? "text-white" : "text-night",
            hideNameOnMobile && "hidden sm:inline",
          )}
        >
          {BRAND.name}
        </span>
      )}
    </Link>
  );
}
