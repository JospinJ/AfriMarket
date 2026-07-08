"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Pagination, Zoom } from "swiper/modules";
import { Maximize2, Play } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { GalleryLightbox } from "@/components/pdp/GalleryLightbox";
import { SellerVideoPreview } from "@/components/pdp/SellerVideoPreview";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

interface ProductGalleryProps {
  images: string[];
  title: string;
  badges?: string[];
  sellerName?: string;
  sellerImage?: string;
  compact?: boolean;
}

export function ProductGallery({
  images,
  title,
  badges,
  sellerName,
  sellerImage,
  compact = false,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const displayImages = images.length > 0 ? images : [""];

  useEffect(() => {
    swiperRef.current?.slideTo(activeIndex);
  }, [activeIndex]);

  return (
    <div className={cn("relative", compact && "max-w-md")}>
      <div className="relative overflow-hidden rounded-2xl bg-night/5 shadow-premium-md">
        {showVideo && sellerName ? (
          <SellerVideoPreview
            sellerName={sellerName}
            posterImage={displayImages[0] ?? ""}
            sellerImage={sellerImage}
            onClose={() => setShowVideo(false)}
          />
        ) : (
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Zoom]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            zoom={{ maxRatio: 2.5 }}
            autoplay={
              displayImages.length > 1
                ? {
                    delay: 3200,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            className="aspect-square w-full"
          >
            {displayImages.map((img, i) => (
              <SwiperSlide key={`${img}-${i}`}>
                <div className="swiper-zoom-container relative h-full w-full">
                  <Image
                    src={img}
                    alt={`${title} — image ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain bg-ivory p-2"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {badges && badges.length > 0 && !showVideo && (
          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-1">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-terracotta px-2.5 py-1 text-xs font-semibold text-white shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {!showVideo && (
          <div className="absolute right-3 top-3 z-10 flex gap-2">
            {sellerName && (
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-1 rounded-full glass-panel px-2.5 py-1.5 text-xs font-semibold text-night shadow-sm transition hover:shadow-glow-orange"
                aria-label="Voir la vidéo du vendeur"
              >
                <Play className="h-3.5 w-3.5 text-primary" aria-hidden />
                Vendeur
              </button>
            )}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Voir en plein écran"
              className="rounded-full glass-panel p-2 shadow-sm transition hover:shadow-glow-orange"
            >
              <Maximize2 size={18} className="text-night" />
            </button>
          </div>
        )}
      </div>

      {displayImages.length > 1 && !showVideo && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {displayImages.map((img, i) => (
            <button
              key={`thumb-${img}-${i}`}
              type="button"
              aria-label={`Voir image ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-ivory transition-all",
                i === activeIndex
                  ? "border-primary shadow-glow-orange"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill sizes="64px" className="object-contain p-0.5" />
            </button>
          ))}
        </div>
      )}

      <GalleryLightbox
        images={displayImages}
        title={title}
        initialIndex={activeIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}
