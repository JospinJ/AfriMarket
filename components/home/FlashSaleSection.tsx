"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import type { Product } from "@/types/product";
import { getSellerById } from "@/lib/mocks/sellers";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeader } from "@/components/home/SectionHeader";
import { ROUTES } from "@/lib/constants/routes";

interface FlashSaleSectionProps {
  products: Product[];
}

function useCountdown(endTimestamp: number) {
  const [remaining, setRemaining] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, endTimestamp - Date.now());
      setRemaining({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTimestamp]);

  return remaining;
}

export function FlashSaleSection({ products }: FlashSaleSectionProps) {
  const endTimestamp = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end.getTime();
  }, []);

  const countdown = useCountdown(endTimestamp);

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="flash-sale-heading"
      className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-brand-orange-muted via-white to-brand-green-muted/30 p-4 shadow-sm border-glow-flash md:p-6"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" aria-hidden />

      <SectionHeader
        titleId="flash-sale-heading"
        title="Offres Flash"
        subtitle="Stock limité — prix imbattables"
        href={ROUTES.flashSales}
        badge={
          <span className="flex items-center gap-1 rounded-lg bg-terracotta/15 px-2 py-1 font-mono text-sm font-bold text-terracotta">
            <Zap className="h-4 w-4" aria-hidden />
            <span suppressHydrationWarning>
              {String(countdown.h).padStart(2, "0")}:{String(countdown.m).padStart(2, "0")}:
              {String(countdown.s).padStart(2, "0")}
            </span>
          </span>
        }
      />

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="w-[min(200px,45vw)] shrink-0 snap-start sm:w-[220px]"
          >
            <ProductCard product={product} seller={getSellerById(product.sellerId)} />
          </motion.div>
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-sand">
        <span className="font-semibold text-primary">127 personnes</span> consultent ces offres en ce
        moment {/* TODO API: live viewers */}
      </p>
    </section>
  );
}
