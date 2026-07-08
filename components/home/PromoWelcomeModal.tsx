"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES, HERO_META } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";

const STORAGE_KEY = "afrimarket-welcome-promo";

export function PromoWelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;
    const timer = setTimeout(() => setOpen(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-night/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed left-1/2 top-1/2 z-[61] w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-labelledby="promo-title"
            aria-modal="true"
          >
            <div className="relative flex h-36 items-center justify-center bg-night">
              <Image
                src={IMAGES.hero.hero2}
                alt=""
                width={HERO_META.hero2.width}
                height={HERO_META.hero2.height}
                className="h-full w-full object-contain"
                sizes="420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/40 to-transparent" />
              <button
                type="button"
                onClick={dismiss}
                className="absolute right-3 top-3 rounded-full bg-white/20 p-1.5 text-white backdrop-blur hover:bg-white/30"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" aria-hidden />
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-night">
                  -30% Flash
                </span>
              </div>
            </div>
            <div className="bg-motif-adinkra p-5">
              <h2 id="promo-title" className="font-display text-xl font-bold text-night">
                Bienvenue sur AfriMarket Hub
              </h2>
              <p className="mt-2 text-sm text-sand">
                Découvrez les offres Express, Import et Gros. Livraison locale 24–72 h à Douala &
                Yaoundé.
              </p>
              <div className="mt-4 flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={ROUTES.flashSales} onClick={dismiss}>
                    Voir les promos
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={ROUTES.home} onClick={dismiss}>
                    Explorer
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
