"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Lock, Shield, Truck } from "lucide-react";
import { FOOTER_TRUST_ITEMS } from "@/lib/constants/footer-nav";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

const TRUST_ICONS = {
  lock: Lock,
  shield: Shield,
  truck: Truck,
  badge: BadgeCheck,
} as const;

export function FooterTrustStrip() {
  return (
    <section aria-label="Garanties de confiance" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-deep/20 via-transparent to-gold/10"
        aria-hidden
      />
      <motion.div
        className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {FOOTER_TRUST_ITEMS.map((item, index) => {
          const Icon = TRUST_ICONS[item.icon];
          return (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={index * 0.06}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10",
                "bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300",
                "hover:border-gold/35 hover:bg-white/[0.07]",
              )}
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-deep/25 text-gold ring-1 ring-gold/20 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
