"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Megaphone } from "lucide-react";
import type { Product } from "@/types/product";
import { getSellerById } from "@/lib/mocks/sellers";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { getPremiumFloatingItems } from "@/lib/utils/premium-floating";
import { IMAGES } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PurchaseModeChip } from "@/components/shared/PurchaseModeChip";
import { PremiumOrbsMarquee } from "@/components/home/PremiumOrbsMarquee";

interface TrendingStripProps {
  products: Product[];
}

const BADGES = ["Sponsorisé", "Tendance", "Populaire", "Sponsorisé"] as const;

export function TrendingStrip({ products }: TrendingStripProps) {
  if (products.length === 0) return null;

  const items = products.slice(0, 6);
  const premiumOrbs = getPremiumFloatingItems(6);

  return (
    <section aria-labelledby="trending-heading" className="relative">
      <SectionHeader
        titleId="trending-heading"
        title="Tendances du moment"
        subtitle="Produits sponsorisés et best-sellers au Cameroun"
        href={ROUTES.home}
        badge={
          <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/15 px-2.5 py-0.5 text-xs font-bold text-terracotta">
            <Flame className="h-3.5 w-3.5" aria-hidden />
            Hot
          </span>
        }
      />

      <PremiumOrbsMarquee items={premiumOrbs} className="mb-6" tone="light" />

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {items.map((product, i) => {
          const offer = product.offers.find((o) => o.mode === "express") ?? product.offers[0];
          if (!offer) return null;
          const badge = BADGES[i % BADGES.length];
          const isSponsored = badge === "Sponsorisé";
          const seller = getSellerById(product.sellerId);
          const isPremium = seller?.tier === "gold" || seller?.tier === "elite";

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="w-[min(260px,72vw)] shrink-0 snap-start"
            >
              <Link
                href={ROUTES.product(product.slug)}
                className={`group flex gap-3 rounded-xl border bg-white p-3 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-glow-orange ${
                  isPremium
                    ? "border-gold/40 ring-1 ring-gold/20"
                    : "border-dash-border"
                }`}
              >
                <div
                  className={`relative h-20 w-20 shrink-0 overflow-hidden bg-sand/10 ${
                    isPremium ? "premium-trending-orb rounded-full" : "rounded-lg"
                  }`}
                >
                  <Image
                    src={product.images[0] ?? IMAGES.placeholder}
                    alt={product.title}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {isPremium && (
                    <span className="absolute inset-0 rounded-full border-2 border-gold/70" aria-hidden />
                  )}
                  <span
                    className={`absolute left-0 top-0 flex items-center gap-0.5 rounded-br-md px-1.5 py-0.5 text-[9px] font-bold ${
                      isSponsored
                        ? "bg-night/80 text-primary"
                        : "bg-terracotta/90 text-white"
                    }`}
                  >
                    {isSponsored && <Megaphone className="h-2.5 w-2.5" aria-hidden />}
                    {badge}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-night transition-colors group-hover:text-primary">
                    {product.title}
                  </p>
                  <div className="mt-1">
                    <PurchaseModeChip mode={offer.mode} etaDays={offer.deliveryEtaDays} size="sm" />
                  </div>
                  <p className="mt-1 font-display text-base font-bold text-night">
                    {formatFCFA(offer.price)}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
