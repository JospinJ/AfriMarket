"use client";

import Link from "next/link";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { cn } from "@/lib/utils/cn";

interface CartSummaryStickyProps {
  subtotal: number;
  deliveryFee?: number;
  discount?: number;
  itemCount: number;
  hasMoqErrors?: boolean;
  className?: string;
}

export function CartSummarySticky({
  subtotal,
  deliveryFee = 1500,
  discount = 0,
  itemCount,
  hasMoqErrors,
  className,
}: CartSummaryStickyProps) {
  const total = subtotal + deliveryFee - discount;

  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-4 shadow-sm",
        "md:sticky md:top-20",
        "fixed bottom-0 left-0 right-0 z-40 border-t border-sand/20 md:relative md:border-0",
        className
      )}
    >
      <div className="hidden md:block">
        <h3 className="font-display text-lg font-semibold text-night">Résumé</h3>
      </div>
      <div className="space-y-1 text-sm md:mt-4">
        <div className="flex justify-between">
          <span className="text-sand">Sous-total ({itemCount} articles)</span>
          <span>{formatFCFA(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sand">Livraison estimée</span>
          <span>{formatFCFA(deliveryFee)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-secondary">
            <span>Réduction</span>
            <span>-{formatFCFA(discount)}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 text-lg font-bold text-night">
          <span>Total</span>
          <span>{formatFCFA(total)}</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className={cn(
          "mt-3 flex min-h-[48px] w-full items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary-hover",
          hasMoqErrors && "pointer-events-none opacity-50"
        )}
        aria-disabled={hasMoqErrors}
      >
        Passer la commande
      </Link>
      <p className="mt-2 hidden text-center text-xs text-sand md:block">
        Paiement Mobile Money disponible au checkout
      </p>
    </div>
  );
}
