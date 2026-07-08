"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { ROUTES } from "@/lib/constants/routes";
import { useCartStore } from "@/store/useCartStore";
import { useMounted } from "@/hooks/useMounted";

interface CartMiniProps {
  compact?: boolean;
  variant?: "default" | "premium";
  className?: string;
}

export function CartMini({ compact = false, variant = "default", className }: CartMiniProps) {
  const mounted = useMounted();
  const count = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());
  const displayCount = mounted ? count : 0;
  const displaySubtotal = mounted ? subtotal : 0;
  const isPremium = variant === "premium";

  return (
    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
      <Link
        href={ROUTES.cart}
        className={cn(
          "relative flex min-h-11 items-center gap-2 rounded-lg px-2 py-1.5 transition-colors",
          isPremium
            ? "text-white hover:bg-white/10"
            : "text-night hover:bg-brand-orange-muted",
          className,
        )}
        aria-label={`Panier, ${displayCount} article${displayCount !== 1 ? "s" : ""}${displayCount > 0 ? `, ${formatFCFA(displaySubtotal)}` : ""}`}
      >
        <span className="relative flex h-9 w-9 items-center justify-center">
          <ShoppingCart size={22} aria-hidden />
          <AnimatePresence mode="popLayout">
            {displayCount > 0 && (
              <motion.span
                key={displayCount}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 520, damping: 20 }}
                className="badge-bump absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-night shadow-glow-orange"
              >
                {displayCount > 99 ? "99+" : displayCount}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        {!compact && (
          <span className="hidden flex-col leading-tight lg:flex">
            <span className={cn("text-[10px]", isPremium ? "text-white/60" : "text-sand")}>
              Panier
            </span>
            <span
              className={cn("text-sm font-bold", isPremium ? "text-primary" : "text-night")}
              suppressHydrationWarning
            >
              {displayCount > 0 ? formatFCFA(displaySubtotal) : "Vide"}
            </span>
          </span>
        )}
      </Link>
    </motion.div>
  );
}
