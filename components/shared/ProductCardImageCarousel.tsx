"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IMAGES } from "@/lib/constants/images";
import { cn } from "@/lib/utils/cn";

const AUTOPLAY_MS = 2800;

interface ProductCardImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  sizes?: string;
}

export function ProductCardImageCarousel({
  images,
  alt,
  className,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: ProductCardImageCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  // Évite `src=""` (Next/Image n'affiche rien) + fallback si l'image distante échoue (mobile/réseau).
  const gallery = (images ?? []).filter((src) => typeof src === "string" && src.trim().length > 0);
  const [index, setIndex] = useState(0);
  const [hadError, setHadError] = useState(false);
  const hasMultiple = gallery.length > 1;

  const currentSrc = hadError ? IMAGES.placeholder : (gallery[index] ?? IMAGES.placeholder);

  useEffect(() => {
    setHadError(false);
  }, [index]);

  useEffect(() => {
    if (!hasMultiple || prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % Math.max(gallery.length, 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [gallery.length, hasMultiple, prefersReducedMotion]);

  return (
    <div className={cn("relative h-full w-full bg-ivory", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${currentSrc}-${index}`}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={currentSrc}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain p-2"
            draggable={false}
            onError={() => setHadError(true)}
            unoptimized={currentSrc.startsWith("http")}
          />
        </motion.div>
      </AnimatePresence>

      {hasMultiple && (
        <div
          className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1"
          aria-hidden
        >
          {gallery.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === index ? "w-4 bg-primary" : "w-1 bg-white/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
