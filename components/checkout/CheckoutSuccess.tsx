"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Sparkles } from "lucide-react";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { SuccessCelebration } from "@/components/shared/SuccessCelebration";
import { BRAND } from "@/lib/constants/design";

interface CheckoutSuccessProps {
  orderId: string;
  total: number;
}

export function CheckoutSuccess({ orderId, total }: CheckoutSuccessProps) {
  const [celebrate, setCelebrate] = useState(true);

  useEffect(() => {
    setCelebrate(true);
  }, []);

  return (
    <>
      <SuccessCelebration
        open={celebrate}
        onClose={() => setCelebrate(false)}
        type="first_purchase"
      />
      <div className="relative mx-auto max-w-lg overflow-hidden px-4 py-12 text-center">
        <div className="absolute inset-0 bg-motif-adinkra opacity-40" aria-hidden />
        <div className="relative rounded-2xl border border-sand/15 bg-white p-8 shadow-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-muted">
            <CheckCircle size={40} className="text-secondary" aria-hidden />
          </div>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Accomplissement
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-night">Commande confirmée !</h1>
          <p className="mt-3 text-sm text-sand">
            Vous participez à {BRAND.tagline.toLowerCase()}
          </p>
          <p className="mt-4 text-sand">
            N° commande : <strong className="text-night">{orderId}</strong>
          </p>
          <p className="mt-1 text-lg font-bold text-night">{formatFCFA(total)}</p>
          <p className="mt-4 text-sm text-sand">
            Confirmation envoyée par SMS et WhatsApp (mock)
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/orders/${orderId}/tracking`}
              className="rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary-hover"
            >
              Suivre ma commande
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-sand/30 px-6 py-3 font-semibold text-night hover:bg-surface-light"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
