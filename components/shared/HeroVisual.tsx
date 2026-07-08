import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface HeroVisualProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  maxHeight?: string;
  sizes?: string;
}

/**
 * Affiche une bannière hero en entier (object-contain).
 * Le conteneur s'adapte au ratio réel de l'image — rien n'est coupé.
 */
export function HeroVisual({
  src,
  width,
  height,
  alt,
  priority = false,
  className,
  imageClassName,
  maxHeight = "min(78vh, 820px)",
  sizes = "100vw",
}: HeroVisualProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden bg-night",
        className
      )}
      style={{ aspectRatio: `${width} / ${height}`, maxHeight }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={cn("h-full w-full object-contain object-center", imageClassName)}
      />
    </div>
  );
}
