"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  titleId?: string;
  subtitle?: ReactNode;
  href?: string;
  linkLabel?: string;
  badge?: ReactNode;
  className?: string;
  index?: string;
  align?: "left" | "center";
  tone?: "light" | "dark" | "premium";
  showDivider?: boolean;
}

export function SectionHeader({
  title,
  titleId,
  subtitle,
  href,
  linkLabel = "Voir tout",
  badge,
  className,
  index,
  align = "left",
  tone = "light",
  showDivider = true,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";
  const isPremium = tone === "premium";

  return (
    <div
      className={cn(
        "mb-8 md:mb-10",
        isCenter && "text-center",
        className
      )}
    >
      {index && (
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={cn(
            "section-index mb-2 block text-xs font-semibold uppercase text-primary",
            isCenter && "mx-auto"
          )}
        >
          {index}
        </motion.span>
      )}

      <div
        className={cn(
          "flex flex-wrap items-end justify-between gap-4",
          isCenter && "flex-col items-center"
        )}
      >
        <div className={cn(isCenter && "max-w-2xl")}>
          <div
            className={cn(
              "flex flex-wrap items-center gap-3",
              isCenter && "justify-center"
            )}
          >
            <h2
              id={titleId}
              className={cn(
                "relative font-display text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl",
                isPremium && "text-white",
                isDark && !isPremium && "text-white",
                !isDark && !isPremium && "text-night",
              )}
            >
              {!isCenter && (
                <span
                  className={cn(
                    "absolute -left-1 bottom-0 top-0 w-1 rounded-full bg-gradient-to-b from-primary via-gold to-secondary",
                    isPremium && "w-1.5 from-primary via-primary to-gold",
                  )}
                  aria-hidden
                />
              )}
              <span className={cn(!isCenter && "pl-4")}>{title}</span>
            </h2>
            {badge}
          </div>
          {subtitle && (
            <p
              className={cn(
                "mt-2 max-w-xl text-base font-medium leading-relaxed md:text-lg",
                isCenter && "mx-auto",
                isPremium && "text-white/90",
                isDark && !isPremium && "text-white/65",
                !isDark && !isPremium && "text-sand",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className={cn(
              "group inline-flex min-h-11 items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
              isPremium
                ? "border-primary bg-primary text-white shadow-[0_4px_20px_rgba(255,153,0,0.35)] hover:bg-primary-hover hover:shadow-glow-orange"
                : "border-primary/25 bg-brand-orange-muted/60 text-brand-orange-dark hover:border-primary hover:bg-brand-orange-muted hover:shadow-glow-orange",
            )}
          >
            {linkLabel}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {showDivider && (
        <div
          className={cn(
            "section-divider mt-6",
            isPremium && "section-divider-premium",
          )}
          aria-hidden
        />
      )}
    </div>
  );
}
