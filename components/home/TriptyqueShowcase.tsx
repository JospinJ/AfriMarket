"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Factory, Globe2, Zap } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { SectionHeader } from "@/components/home/SectionHeader";
import { staggerContainer, revealScale } from "@/lib/motion/variants";

const MODES = [
  {
    mode: "express" as const,
    icon: Zap,
    label: "Express",
    tagline: "Stock local · 24–72 h",
    desc: "Comme Amazon — disponible maintenant, livré en moto dans votre ville.",
    href: ROUTES.flashSales,
    gradient: "from-secondary to-green-forest",
    glow: "shadow-glow-green",
  },
  {
    mode: "import" as const,
    icon: Globe2,
    label: "Import",
    tagline: "Prix réduit · 10–25 j",
    desc: "Comme Temu — accédez aux marchés mondiaux à prix compétitifs.",
    href: ROUTES.home,
    gradient: "from-gold to-amber",
    glow: "shadow-glow-orange",
  },
  {
    mode: "gros" as const,
    icon: Factory,
    label: "Gros",
    tagline: "MOQ · Prix usine",
    desc: "Comme Alibaba — achetez en volume, maximisez vos marges.",
    href: ROUTES.home,
    gradient: "from-copper to-noble-brown",
    glow: "shadow-premium-md",
  },
] as const;

export function TriptyqueShowcase() {
  return (
    <section aria-labelledby="triptyque-heading">
      <SectionHeader
        index="03"
        titleId="triptyque-heading"
        title="Le triptyque qui change tout"
        subtitle="Trois modes d'achat sur chaque produit — notre signature, votre liberté."
        align="center"
      />

      <motion.div
        className="grid gap-4 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {MODES.map((item) => (
          <motion.div key={item.mode} variants={revealScale}>
            <Link
              href={item.href}
              className={`group relative block overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-6 text-white transition-transform duration-500 hover:-translate-y-2 ${item.glow}`}
            >
              <div className="absolute inset-0 bg-motif-adinkra opacity-30" aria-hidden />
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
                aria-hidden
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <item.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="relative mt-4 font-display text-2xl font-bold">{item.label}</h3>
              <p className="relative mt-1 text-sm font-medium text-white/90">{item.tagline}</p>
              <p className="relative mt-3 text-sm leading-relaxed text-white/75">{item.desc}</p>
              <span className="relative mt-5 inline-block text-sm font-semibold underline-offset-4 group-hover:underline">
                Découvrir →
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
