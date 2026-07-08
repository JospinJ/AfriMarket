"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { fadeUpBlur } from "@/lib/motion/variants";

type SectionVariant = "default" | "ivory" | "night" | "mesh" | "warm" | "elevated";

interface PremiumSectionProps {
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  innerClassName?: string;
  id?: string;
  animate?: boolean;
}

const VARIANT_STYLES: Record<SectionVariant, string> = {
  default: "bg-transparent",
  ivory: "bg-ivory bg-motif-bogolan",
  night: "bg-night text-white bg-motif-kuba",
  mesh: "bg-mesh-africa",
  warm: "bg-gradient-warm bg-motif-wax",
  elevated: "bg-white shadow-premium-sm",
};

export function PremiumSection({
  children,
  variant = "default",
  className,
  innerClassName,
  id,
  animate = true,
}: PremiumSectionProps) {
  const Wrapper = animate ? motion.section : "section";
  const motionProps = animate
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px 0px" },
        variants: fadeUpBlur,
      }
    : {};

  return (
    <Wrapper
      id={id}
      className={cn("relative overflow-hidden py-14 md:py-20", VARIANT_STYLES[variant], className)}
      {...motionProps}
    >
      {variant === "night" && (
        <div
          className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
      )}
      {variant === "mesh" && (
        <div
          className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03]"
          aria-hidden
        />
      )}
      <div className={cn("relative mx-auto max-w-7xl px-4 sm:px-6", innerClassName)}>
        {children}
      </div>
    </Wrapper>
  );
}
