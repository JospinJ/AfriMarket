"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/constants/routes";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";

const CTA_LINKS = [
  {
    title: "Devenir vendeur",
    desc: "Ouvrez votre boutique — 0 FCFA d'entrée",
    href: ROUTES.registerSeller,
    cta: "Créer une boutique",
    accent: "from-secondary/25 to-transparent",
  },
  {
    title: "Devenir livreur",
    desc: "Livraison moto — revenus flexibles",
    href: ROUTES.becomeDriver,
    cta: "Postuler",
    accent: "from-primary/25 to-transparent",
  },
  {
    title: "Premium",
    desc: "Visibilité Gold & Elite",
    href: ROUTES.premium,
    cta: "Découvrir",
    accent: "from-gold/30 to-transparent",
  },
  {
    title: "Publicité",
    desc: "Campagnes ciblées marketplace",
    href: ROUTES.advertise,
    cta: "Lancer une campagne",
    accent: "from-terracotta/25 to-transparent",
  },
] as const;

export function FooterCtaGrid() {
  return (
    <motion.div
      className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {CTA_LINKS.map((cta) => (
        <motion.div key={cta.href} variants={fadeUp}>
          <Link
            href={cta.href}
            className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:bg-white/[0.07] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cta.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              aria-hidden
            />
            <h3 className="relative font-display font-semibold text-gold">{cta.title}</h3>
            <p className="relative mt-1 text-sm text-white/70">{cta.desc}</p>
            <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-400 transition-transform group-hover:translate-x-1">
              {cta.cta} →
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
