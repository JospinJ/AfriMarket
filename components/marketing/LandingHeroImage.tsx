"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion, useScroll } from "framer-motion";
import { HeroImmersiveBackdrop } from "@/components/home/HeroImmersiveBackdrop";
import { cn } from "@/lib/utils/cn";

interface LandingHeroImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  softMotion?: boolean;
  objectFit?: "cover" | "contain";
  className?: string;
  imageClassName?: string;
}

export function LandingHeroImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "50vw",
  softMotion = true,
  objectFit = "contain",
  className,
  imageClassName,
}: LandingHeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const useFill = !width || !height;

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <HeroImmersiveBackdrop
        scrollProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
        softMotion={softMotion}
        imageLayout="split"
      >
        {useFill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn(
              objectFit === "cover" ? "object-cover" : "object-contain",
              "object-center",
              imageClassName,
            )}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            className={cn(
              "h-full w-full",
              objectFit === "cover" ? "object-cover" : "object-contain",
              "object-center",
              imageClassName,
            )}
          />
        )}
      </HeroImmersiveBackdrop>
    </div>
  );
}
