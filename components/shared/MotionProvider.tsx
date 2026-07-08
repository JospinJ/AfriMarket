"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Applique la préférence système « réduire les animations » à TOUTES les
 * animations Framer Motion de l'application (`reducedMotion="user"`).
 * Complète le bloc CSS `prefers-reduced-motion` de globals.css.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
