"use client";

import { motion } from "framer-motion";
import { FOOTER_PAYMENT_BRANDS } from "@/lib/constants/footer-nav";
import { PaymentBrandLogo } from "@/components/footer/logos/PaymentBrandLogos";
import { fadeUp, staggerFast } from "@/lib/motion/variants";

const CATEGORY_LABELS = {
  "mobile-money": "Mobile Money",
  card: "Cartes",
  bank: "Banques",
} as const;

export function FooterPaymentsColumn() {
  const categories = ["mobile-money", "card", "bank"] as const;

  return (
    <div aria-label="Paiements acceptés">
      <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-gold">
        Paiements acceptés
      </h3>
      <div className="space-y-4">
        {categories.map((category) => {
          const brands = FOOTER_PAYMENT_BRANDS.filter((b) => b.category === category);
          return (
            <div key={category}>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white/45">
                {CATEGORY_LABELS[category]}
              </p>
              <motion.ul
                className="flex flex-wrap gap-1.5"
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {brands.map((brand) => (
                  <motion.li
                    key={brand.id}
                    variants={fadeUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <PaymentBrandLogo
                      id={brand.id}
                      className="h-9 min-w-0 px-2 [&_svg]:h-4"
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
