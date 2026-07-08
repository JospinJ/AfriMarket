"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Trophy, ShieldCheck, ShoppingBag, Wallet, Store } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

export type CelebrationType =
  | "shop"
  | "kyc"
  | "first_sale"
  | "first_purchase"
  | "withdrawal";

const CELEBRATION_CONFIG: Record<
  CelebrationType,
  { icon: typeof Trophy; title: string; message: string; accent: string }
> = {
  shop: {
    icon: Store,
    title: "Boutique créée !",
    message: "Votre aventure entrepreneuriale africaine commence maintenant.",
    accent: "text-gold",
  },
  kyc: {
    icon: ShieldCheck,
    title: "Identité vérifiée",
    message: "La confiance est le fondement du commerce africain moderne.",
    accent: "text-green-deep",
  },
  first_sale: {
    icon: Trophy,
    title: "Première vente !",
    message: "Chaque vente construit la prospérité de notre continent.",
    accent: "text-gold",
  },
  first_purchase: {
    icon: ShoppingBag,
    title: "Premier achat validé",
    message: "Vous participez à la croissance de l'économie numérique africaine.",
    accent: "text-green-deep",
  },
  withdrawal: {
    icon: Wallet,
    title: "Retrait effectué",
    message: "Votre liberté économique, un pas de plus vers la réussite.",
    accent: "text-copper",
  },
};

export interface SuccessCelebrationProps {
  open: boolean;
  onClose: () => void;
  type: CelebrationType;
  className?: string;
}

/** Célébration discrète des étapes importantes — motivation sans surcharge. */
export function SuccessCelebration({ open, onClose, type, className }: SuccessCelebrationProps) {
  const config = CELEBRATION_CONFIG[type];
  const Icon = config.icon;

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className={cn(
            "fixed bottom-6 left-1/2 z-50 w-[min(400px,calc(100vw-2rem))] -translate-x-1/2",
            className
          )}
          role="status"
          aria-live="polite"
        >
          <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-night shadow-xl">
            <div className="absolute inset-0 bg-motif-adinkra opacity-50" aria-hidden />
            <div className="relative flex items-start gap-4 p-5">
              <span
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10",
                  config.accent
                )}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
                  <p className="font-display text-sm font-bold text-white">{config.title}</p>
                </div>
                <p className="mt-1 text-sm text-white/70">{config.message}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-white/50 hover:text-white"
                onClick={onClose}
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
