"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Bike, Flower2, Sparkles } from "lucide-react";
import { specialtySellers } from "@/lib/mocks/specialty-stores";
import { getProductsBySeller } from "@/lib/mocks/products";
import { getStoreProfile } from "@/lib/mocks/store-profiles";
import { ROUTES } from "@/lib/constants/routes";
import { SellerBadge } from "@/components/shared/SellerBadge";
import { SectionHeader } from "@/components/home/SectionHeader";
import { formatFCFA } from "@/lib/utils/format-fcfa";

const STORE_ICONS = {
  "librairie-akoma": BookOpen,
  "moto-express-cm": Bike,
  "parfums-dafrique": Sparkles,
  "raphia-artisanat-kamer": Flower2,
} as const;

export function SpecialtyStoresShowcase() {
  return (
    <section aria-labelledby="specialty-stores-heading">
      <SectionHeader
        index="02"
        titleId="specialty-stores-heading"
        title="Boutiques thématiques"
        subtitle="Librairie, moto, parfums et artisanat rotin — vitrines complètes"
        href={ROUTES.premiumStores}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {specialtySellers.map((seller, i) => {
          const profile = getStoreProfile(seller.storeSlug);
          const products = getProductsBySeller(seller.id);
          const topProduct = products[0];
          const expressOffer = topProduct?.offers.find((o) => o.mode === "express");
          const Icon = STORE_ICONS[seller.storeSlug as keyof typeof STORE_ICONS] ?? BookOpen;

          return (
            <motion.article
              key={seller.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-sand/15 bg-white shadow-premium-md transition-shadow hover:shadow-premium-xl"
            >
              <Link href={ROUTES.store(seller.storeSlug)} className="block">
                <div className="relative h-36 overflow-hidden bg-night sm:h-40">
                  {seller.bannerUrl && (
                    <Image
                      src={seller.bannerUrl}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    {seller.logoUrl && (
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-white/80">
                        <Image src={seller.logoUrl} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                    )}
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/90 text-night">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-night group-hover:text-primary">
                        {seller.storeName}
                      </h3>
                      <p className="mt-0.5 text-xs text-sand">{profile?.tagline}</p>
                    </div>
                    <SellerBadge tier={seller.tier} verified={seller.kycStatus === "verified"} />
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-sand">
                    {profile?.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile?.highlights.slice(0, 2).map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-surface-light px-2.5 py-0.5 text-[10px] font-medium text-night/70"
                      >
                        {h}
                      </span>
                    ))}
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                      {products.length} produits
                    </span>
                  </div>

                  {topProduct && expressOffer && (
                    <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-light p-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={topProduct.images[0] ?? ""}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-night">{topProduct.title}</p>
                        <p className="text-sm font-bold text-primary">
                          {formatFCFA(expressOffer.price)}
                        </p>
                      </div>
                    </div>
                  )}

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2">
                    Visiter la boutique
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
