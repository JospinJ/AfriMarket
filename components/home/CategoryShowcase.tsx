"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants/categories";
import { IMAGES } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { SectionHeader } from "@/components/home/SectionHeader";
import { cn } from "@/lib/utils/cn";
import { staggerFast, revealScale } from "@/lib/motion/variants";

const CATEGORY_VISUALS: Record<string, { image: string; gradient: string }> = {
  electronics: { image: IMAGES.products.phone2, gradient: "from-night/70 to-primary/40" },
  fashion: { image: IMAGES.products.dress1, gradient: "from-night/70 to-terracotta/50" },
  home: { image: IMAGES.products.bag, gradient: "from-night/70 to-sand/50" },
  auto: { image: IMAGES.products.motoHelmet, gradient: "from-night/70 to-copper/50" },
  agri: { image: IMAGES.products.rice, gradient: "from-night/70 to-green-agri/50" },
  health: { image: IMAGES.products.oil, gradient: "from-night/70 to-secondary/50" },
};

export function CategoryShowcase() {
  const topCategories = CATEGORIES.slice(0, 6);

  return (
    <section aria-labelledby="categories-showcase-heading">
      <SectionHeader
        index="02"
        titleId="categories-showcase-heading"
        title="Explorez par univers"
        subtitle="De la tech à l'agriculture — chaque catégorie, une histoire africaine."
        href={ROUTES.categories}
      />

      <motion.div
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {topCategories.map((cat) => {
          const visual = CATEGORY_VISUALS[cat.id] ?? {
            image: IMAGES.hero.hero2,
            gradient: "from-night/80 to-night/40",
          };

          return (
            <motion.div key={cat.id} variants={revealScale}>
              <Link
                href={ROUTES.category(cat.slug)}
                className={cn(
                  "group relative flex aspect-[4/3] overflow-hidden rounded-2xl text-left shadow-premium-sm transition-all duration-500 hover:shadow-premium-lg",
                )}
              >
                <Image
                  src={visual.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={cn("absolute inset-0 bg-gradient-to-t", visual.gradient)}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-motif-kuba opacity-15" aria-hidden />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <span className="font-display text-base font-bold text-white md:text-lg">
                    {cat.name}
                  </span>
                  <span className="mt-0.5 text-xs text-white/75">
                    {(cat.children ?? []).length} sous-catégories
                  </span>
                </div>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-4 text-center">
        <Link
          href={ROUTES.categories}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 bg-brand-orange-muted px-6 py-2.5 text-sm font-semibold text-brand-orange-dark transition-all hover:border-primary hover:shadow-glow-orange"
        >
          Toutes les catégories
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
