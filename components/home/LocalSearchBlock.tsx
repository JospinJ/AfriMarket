"use client";

import { motion } from "framer-motion";
import { MapPin, Store, Zap } from "lucide-react";
import { useFiltersStore } from "@/store/useFiltersStore";
import { staggerContainer, revealScale } from "@/lib/motion/variants";
import { SectionHeader } from "@/components/home/SectionHeader";

const LOCAL_OPTIONS = [
  {
    id: "nearby",
    label: "Produits près de moi",
    desc: "Stock local Express — disponible maintenant",
    icon: MapPin,
    accent: "border-secondary/30 bg-brand-green-muted/80",
    iconBg: "bg-secondary text-white",
  },
  {
    id: "city-sellers",
    label: "Vendeurs dans ma ville",
    desc: "Boutiques locales vérifiées et notées",
    icon: Store,
    accent: "border-primary/30 bg-brand-orange-muted/80",
    iconBg: "bg-primary text-night",
  },
  {
    id: "fast-local",
    label: "Livraison rapide locale",
    desc: "24–48h en zone urbaine, moto incluse",
    icon: Zap,
    accent: "border-secondary/30 bg-brand-green-muted/80",
    iconBg: "bg-secondary text-white",
  },
] as const;

export function LocalSearchBlock() {
  const setFilter = useFiltersStore((s) => s.setFilter);

  return (
    <section aria-label="Recherche locale">
      <SectionHeader
        title="Commerce de proximité"
        subtitle="L'Afrique près de chez vous — achetez local, soutenez l'économie réelle."
      />

      <motion.div
        className="grid gap-4 sm:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {LOCAL_OPTIONS.map((opt) => (
          <motion.button
            key={opt.id}
            type="button"
            variants={revealScale}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (opt.id === "nearby" || opt.id === "fast-local") {
                setFilter("fastDelivery", true);
              } else if (opt.id === "city-sellers") {
                setFilter("city", "Douala");
              }
            }}
            className={`group relative overflow-hidden rounded-2xl border p-5 text-left shadow-premium-sm transition-shadow duration-500 hover:shadow-premium-lg ${opt.accent}`}
          >
            <div className="absolute inset-0 bg-motif-kuba opacity-20" aria-hidden />
            <span
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl shadow-premium-sm transition-transform duration-300 group-hover:scale-110 ${opt.iconBg}`}
            >
              <opt.icon size={20} aria-hidden />
            </span>
            <span className="relative mt-4 block font-display text-base font-bold text-night">
              {opt.label}
            </span>
            <span className="relative mt-1 block text-sm text-sand">{opt.desc}</span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
