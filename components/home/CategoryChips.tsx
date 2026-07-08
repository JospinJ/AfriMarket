"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Baby,
  Car,
  Hammer,
  Headphones,
  Laptop,
  Lamp,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sofa,
  Sprout,
  Tablet,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CATEGORIES } from "@/lib/constants/categories";
import { ROUTES } from "@/lib/constants/routes";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";

const CHIP_ICONS: Record<string, LucideIcon> = {
  phones: Smartphone,
  tablets: Tablet,
  computers: Laptop,
  accessories: Headphones,
  men: Shirt,
  women: ShoppingBag,
  kids: Baby,
  kitchen: UtensilsCrossed,
  living: Sofa,
  decor: Lamp,
  parts: Wrench,
  "auto-acc": Car,
  seeds: Sprout,
  "agri-tools": Hammer,
};

export function CategoryChips() {
  const chips = CATEGORIES.flatMap((c) => c.children ?? []).slice(0, 10);

  return (
    <section aria-label="Catégories rapides">
      <h2 className="mb-3 font-display text-lg font-semibold text-night md:text-xl">
        Explorer par catégorie
      </h2>
      <motion.div
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
      >
        <motion.div variants={fadeUp}>
          <Link
            href={ROUTES.products}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-night shadow-sm transition-shadow hover:bg-brand-orange-muted hover:shadow-md"
          >
            Tous
          </Link>
        </motion.div>
        {chips.map((chip) => {
          const Icon = CHIP_ICONS[chip.id];
          return (
            <motion.div key={chip.id} variants={fadeUp}>
              <Link
                href={ROUTES.category(chip.slug)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-shadow",
                  "bg-white text-night shadow-sm hover:bg-brand-orange-muted hover:shadow-md",
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                {chip.name}
              </Link>
            </motion.div>
          );
        })}
        <motion.div variants={fadeUp}>
          <Link
            href={ROUTES.categories}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-orange-muted px-4 py-2 text-sm font-medium text-brand-orange-dark transition-all hover:bg-primary/20 hover:shadow-glow-orange"
          >
            Voir tout →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
