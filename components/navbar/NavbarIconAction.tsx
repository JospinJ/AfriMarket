"use client";

import { memo, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface NavbarIconActionProps {
  href?: string;
  onClick?: () => void;
  label: string;
  badge?: number | string;
  badgeTone?: "primary" | "terracotta" | "secondary";
  children: ReactNode;
  className?: string;
  showLabel?: boolean;
  subLabel?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: boolean | "dialog" | "menu";
}

function NavbarIconActionInner({
  href,
  onClick,
  label,
  badge,
  badgeTone = "terracotta",
  children,
  className,
  showLabel = false,
  subLabel,
  "aria-expanded": ariaExpanded,
  "aria-haspopup": ariaHaspopup,
}: NavbarIconActionProps) {
  const badgeColors = {
    primary: "bg-primary text-night",
    terracotta: "bg-terracotta text-white",
    secondary: "bg-secondary text-white",
  };

  const inner = (
    <>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-transparent transition-colors group-hover:bg-white/10 lg:h-10 lg:w-10">
        {children}
        {badge !== undefined && Number(badge) > 0 && (
          <motion.span
            key={String(badge)}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "badge-bump absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-sm",
              badgeColors[badgeTone],
            )}
          >
            {typeof badge === "number" && badge > 99 ? "99+" : badge}
          </motion.span>
        )}
      </span>
      {showLabel && (
        <span className="hidden flex-col items-start leading-tight xl:flex">
          <span className="text-[10px] text-white/60">{subLabel ?? ""}</span>
          <span className="text-xs font-semibold text-white">{label}</span>
        </span>
      )}
    </>
  );

  const baseClass = cn(
    "group flex min-h-11 min-w-11 items-center gap-1.5 rounded-lg px-1.5 text-white transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    className,
  );

  if (href) {
    return (
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
        <Link
          href={href}
          className={baseClass}
          aria-label={label}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHaspopup}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      className={baseClass}
      aria-label={label}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
    >
      {inner}
    </motion.button>
  );
}

export const NavbarIconAction = memo(NavbarIconActionInner);
