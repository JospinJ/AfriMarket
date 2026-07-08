"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Crown, MapPin, Sparkles, Star } from "lucide-react";
import type { Seller } from "@/types/seller";
import { SellerBadge } from "@/components/shared/SellerBadge";
import { IMAGES } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { getPremiumFloatingItems } from "@/lib/utils/premium-floating";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PremiumOrbsMarquee } from "@/components/home/PremiumOrbsMarquee";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PremiumStoresCarouselProps {
  sellers: Seller[];
}

export function PremiumStoresCarousel({ sellers }: PremiumStoresCarouselProps) {
  if (sellers.length === 0) return null;

  const premiumOrbs = getPremiumFloatingItems(5);

  return (
    <section aria-labelledby="premium-stores-heading" className="relative">
      <div className="relative isolate rounded-2xl border border-white/10 bg-night px-4 py-6 shadow-lg ring-1 ring-primary/20 sm:px-6 md:py-8">
        <SectionHeader
          index="06"
          tone="premium"
          showDivider={false}
          className="mb-4 md:mb-5"
          titleId="premium-stores-heading"
          title="Boutiques Premium"
          subtitle={
            <>
              Vendeurs{" "}
              <span className="font-semibold text-primary">Gold &amp; Elite</span>
              {" "}— l&apos;excellence du commerce africain
            </>
          }
          href={ROUTES.premiumStores}
          badge={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
              <Crown className="h-3.5 w-3.5" aria-hidden />
              Premium
            </span>
          }
        />

        <div className="flex items-start gap-3 rounded-lg border-l-4 border-primary bg-white/[0.07] px-4 py-3.5">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <p className="text-sm leading-relaxed md:text-[15px]">
            <span className="font-semibold text-primary">Boutiques certifiées</span>
            <span className="text-white/90">
              {" "}
              — visibilité maximale, analytics avancées et badge de confiance acheteur.
            </span>
          </p>
        </div>
      </div>

      <div className="relative mt-8">

        <PremiumOrbsMarquee items={premiumOrbs} className="mb-8" tone="dark" />

        <div className="premium-stores-frame relative rounded-2xl border border-primary/30 bg-white/10 p-4">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-motif-kuba opacity-[0.04]" aria-hidden />
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            className="premium-swiper !pb-10"
          >
            {sellers.map((seller, i) => (
              <SwiperSlide key={seller.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={ROUTES.store(seller.storeSlug)}
                    className="group block overflow-hidden rounded-2xl border border-white/15 bg-white shadow-premium-md transition-all duration-500 hover:border-primary hover:shadow-glow-orange"
                  >
                    <div className="relative h-32 overflow-hidden bg-night">
                      <Image
                        src={seller.bannerUrl ?? IMAGES.sellers.banner1}
                        alt=""
                        fill
                        sizes="320px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
                      <div className="absolute left-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        {seller.tier}
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-night/85 px-2 py-1 text-xs text-white">
                        <MapPin className="h-3 w-3 text-primary" aria-hidden />
                        {seller.city}
                      </div>
                    </div>
                    <div className="p-4">
                      <SellerBadge
                        tier={seller.tier}
                        verified={seller.kycStatus === "verified"}
                        storeName={seller.storeName}
                      />
                      <div className="mt-2 flex items-center gap-3 text-xs text-sand">
                        <span className="flex items-center gap-1 font-semibold text-night">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden />
                          {seller.rating.average}
                        </span>
                        <span>{seller.deliveredOrders}+ livraisons</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
