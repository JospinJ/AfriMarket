"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Handshake,
  Rocket,
  ShoppingBag,
  Sprout,
  Truck,
  Users,
} from "lucide-react";
import { IMAGES } from "@/lib/constants/images";
import { BRAND } from "@/lib/constants/design";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import { SectionHeader } from "@/components/home/SectionHeader";
import { staggerContainer, slideFromLeft, slideFromRight } from "@/lib/motion/variants";

const ACTORS = [
  {
    id: "merchants",
    icon: ShoppingBag,
    title: "Commerçants & artisans",
    story: "Des boutiques de quartier aux ateliers créatifs — vendez local, rayonnez continental.",
    image: IMAGES.ecosystem.merchant,
    href: ROUTES.becomeSeller,
    cta: "Ouvrir ma boutique",
    accent: "from-primary/30 to-transparent",
  },
  {
    id: "startups",
    icon: Rocket,
    title: "Entrepreneurs & startups",
    story: "Scalez votre marque avec Premium, analytics et visibilité sur 48 villes.",
    image: IMAGES.ecosystem.entrepreneur,
    href: ROUTES.premium,
    cta: "Passer Premium",
    accent: "from-gold/30 to-transparent",
  },
  {
    id: "drivers",
    icon: Truck,
    title: "Livreurs & logistique",
    story: "La dernière mile africaine — moto, express, tracking GPS et paiement instantané.",
    image: IMAGES.misc.driver,
    href: ROUTES.becomeDriver,
    cta: "Devenir livreur",
    accent: "from-secondary/30 to-transparent",
  },
  {
    id: "producers",
    icon: Sprout,
    title: "Producteurs locaux",
    story: "Du champ au client — riz, huile, semences avec le mode Gros et MOQ adapté.",
    image: IMAGES.products.rice,
    href: ROUTES.home,
    cta: "Explorer le Gros",
    accent: "from-green-agri/30 to-transparent",
  },
] as const;

export function EcosystemStory() {
  return (
    <section aria-labelledby="ecosystem-heading" className="relative">
      <SectionHeader
        index="01"
        titleId="ecosystem-heading"
        title="Un écosystème qui fait grandir l'Afrique"
        subtitle="Chaque acteur trouve sa place — vendeurs, livreurs, producteurs et acheteurs connectés."
        align="center"
      />

      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <p className="font-display text-lg italic text-night/80 md:text-xl">
          &ldquo;{BRAND.vision}&rdquo;
        </p>
        <footer className="mt-3 flex items-center justify-center gap-2 text-sm text-sand">
          <Users className="h-4 w-4 text-primary" aria-hidden />
          <span>AfriMarket Hub — leadership africain numérique</span>
        </footer>
      </motion.blockquote>

      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {ACTORS.map((actor, i) => (
          <motion.article
            key={actor.id}
            variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
            className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white shadow-premium-md transition-shadow duration-500 hover:shadow-premium-xl"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
                <Image
                  src={actor.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className={cn(
                    "transition-transform duration-700 group-hover:scale-105",
                    actor.id === "drivers"
                      ? "object-cover object-top"
                      : "object-cover object-center",
                  )}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r ${actor.accent}`}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-motif-kuba opacity-20" aria-hidden />
              </div>
              <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
                <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <actor.icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-bold text-night">{actor.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand">{actor.story}</p>
                <Link
                  href={actor.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2"
                >
                  {actor.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-secondary/20 bg-brand-green-muted/50 px-6 py-5"
      >
        {[
          { icon: Handshake, label: "Confiance" },
          { icon: Rocket, label: "Innovation" },
          { icon: Sprout, label: "Prospérité" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-2 text-sm font-medium text-secondary"
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
