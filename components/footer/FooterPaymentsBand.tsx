"use client";

import { motion } from "framer-motion";
import { Banknote, CreditCard, Smartphone } from "lucide-react";
import { FOOTER_PAYMENT_BRANDS } from "@/lib/constants/footer-nav";
import { PaymentBrandLogo } from "@/components/footer/logos/PaymentBrandLogos";
import { fadeUp, staggerFast } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

const PAYMENT_GROUPS = [
  {
    id: "mobile-money",
    title: "Mobile Money",
    icon: Smartphone,
    accent: "text-primary",
    ring: "ring-primary/25",
  },
  {
    id: "card",
    title: "Cartes bancaires",
    icon: CreditCard,
    accent: "text-gold",
    ring: "ring-gold/25",
  },
  {
    id: "bank",
    title: "Banques partenaires",
    icon: Banknote,
    accent: "text-green-400",
    ring: "ring-green-deep/40",
  },
] as const;

export function FooterPaymentsBand({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Moyens de paiement acceptés" className="space-y-5">
      {!compact && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/90">
              Paiements & partenaires
            </p>
            <h2 className="font-display text-lg font-bold text-white md:text-xl">
              Payez en toute confiance
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/60">
              Mobile Money en priorité, cartes internationales et banques locales — le triptyque
              Afrique-first d&apos;AfriMarket Hub.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" aria-hidden />
            Transactions sécurisées SSL
          </div>
        </div>
      )}

      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3")}>
        {PAYMENT_GROUPS.map((group) => {
          const brands = FOOTER_PAYMENT_BRANDS.filter((b) => b.category === group.id);
          const Icon = group.icon;

          return (
            <motion.div
              key={group.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className={cn(
                "rounded-2xl border border-white/10 bg-white/[0.03] p-4",
                "backdrop-blur-sm transition-colors hover:border-white/20",
              )}
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ring-1",
                    group.accent,
                    group.ring,
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="font-display text-sm font-semibold text-white">{group.title}</h3>
              </div>

              <motion.ul
                className="flex flex-wrap gap-2"
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {brands.map((brand) => (
                  <motion.li
                    key={brand.id}
                    variants={fadeUp}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <PaymentBrandLogo id={brand.id} />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
