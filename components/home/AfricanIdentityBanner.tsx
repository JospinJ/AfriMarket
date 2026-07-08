"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { IMAGES } from "@/lib/constants/images";

export function AfricanIdentityBanner() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section
      aria-label="Identité africaine AfriMarket Hub"
      className="relative overflow-hidden border-y border-gold/20 bg-gradient-to-r from-[#F7F0E4] via-[#FFF8EE] to-[#F7F0E4]"
    >
      <div className="absolute inset-0 bg-motif-bogolan opacity-[0.07]" aria-hidden />

      <div className="relative mx-auto flex max-w-7xl items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative hidden w-[28%] shrink-0 sm:block lg:w-[24%]"
        >
          <Image
            src={IMAGES.africa.silhouettes}
            alt="Silhouettes africaines — commerce et culture"
            fill
            sizes="240px"
            className="object-contain object-left"
            priority
          />
        </motion.div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-8 text-center sm:py-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-gold"
          >
            Afrique moderne · Commerce · Confiance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-2 font-display text-xl font-bold text-night sm:text-2xl md:text-3xl"
          >
            Le marché numérique{" "}
            <span className="text-gradient-sunrise">100 % africain</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-2 max-w-lg text-sm text-sand md:text-base"
          >
            Express, Import, Gros — vendeurs Gold & Elite, livraison moto et paiement Mobile
            Money.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative hidden min-h-[160px] w-[28%] shrink-0 sm:block lg:w-[24%]"
        >
          <motion.div
            className="absolute inset-0"
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, -10, 0] }}
            transition={{
              duration: 4.5,
              repeat: prefersReducedMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={IMAGES.africa.waves}
              alt="Masque africain — identité culturelle"
              fill
              sizes="240px"
              className="object-contain object-right opacity-95"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden />
    </section>
  );
}
