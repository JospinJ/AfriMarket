"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { revealVariants, type RevealVariant } from "@/lib/motion/variants";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });
  const variants = revealVariants[variant] as Variants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      custom={delay}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
