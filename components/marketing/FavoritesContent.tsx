"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartCrack } from "lucide-react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useMounted } from "@/hooks/useMounted";
import { getProductById } from "@/lib/mocks/products";
import { getSellerById } from "@/lib/mocks/sellers";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { staggerFast, fadeUp } from "@/lib/motion/variants";

export function FavoritesContent() {
  const mounted = useMounted();
  const ids = useFavoritesStore((s) => s.ids);

  const products = mounted
    ? ids.map((id) => getProductById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p))
    : [];

  if (mounted && products.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl bg-white p-10 shadow-premium-sm"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange-muted text-primary">
            <HeartCrack className="h-8 w-8" aria-hidden />
          </span>
          <h1 className="font-display text-2xl font-bold text-night">Mes favoris</h1>
          <p className="text-sm text-sand">
            Vous n&apos;avez pas encore ajouté de produits à vos favoris. Touchez le cœur sur un
            produit pour le retrouver ici.
          </p>
          <Button asChild className="mt-2">
            <Link href={ROUTES.home}>Découvrir les produits</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-night">Mes favoris</h1>
        <p className="mt-1 text-sm text-sand" suppressHydrationWarning>
          {products.length} produit{products.length !== 1 ? "s" : ""} sauvegardé
          {products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={fadeUp}>
            <ProductCard product={product} seller={getSellerById(product.sellerId)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
