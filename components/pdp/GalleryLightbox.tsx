"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

interface GalleryLightboxProps {
  images: string[];
  title: string;
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GalleryLightbox({
  images,
  title,
  initialIndex = 0,
  open,
  onOpenChange,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] max-w-4xl border-0 bg-night p-2 sm:p-4">
        <DialogTitle className="sr-only">{title} — galerie plein écran</DialogTitle>
        <Swiper
          modules={[Navigation, Zoom]}
          initialSlide={initialIndex}
          navigation
          zoom={{ maxRatio: 4 }}
          onSlideChange={(s) => setIndex(s.activeIndex)}
          className="h-[min(80vh,720px)] w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={`lb-${img}-${i}`}>
              <div className="swiper-zoom-container relative flex h-full items-center justify-center">
                <Image
                  src={img}
                  alt={`${title} — ${i + 1}`}
                  width={1200}
                  height={1200}
                  className="max-h-[min(80vh,720px)] w-auto object-contain"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="text-center text-xs text-white/60">
          {index + 1} / {images.length} · Pincez ou double-cliquez pour zoomer
        </p>
      </DialogContent>
    </Dialog>
  );
}
