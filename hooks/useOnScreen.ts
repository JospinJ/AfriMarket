"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Renvoie `true` tant que l'élément référencé est visible dans le viewport.
 * Utile pour ne déclencher des animations/timers que lorsque la zone est à l'écran.
 */
export function useOnScreen<T extends Element>(
  ref: RefObject<T>,
  rootMargin = "0px"
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isVisible;
}
