"use client";

import { Shield, Smartphone } from "lucide-react";
import { TrustStrip } from "@/components/shared/TrustStrip";

interface TrustCheckoutShellProps {
  currentStep: number;
}

const STEP_HINTS: Record<number, string> = {
  1: "Vos données sont chiffrées et ne sont jamais revendues.",
  2: "Livraison moto dominante — suivi GPS + SMS si hors ligne.",
  3: "Mobile Money recommandé — confirmation OTP sécurisée.",
  4: "Vérifiez une dernière fois avant de valider le paiement.",
};

export function TrustCheckoutShell({ currentStep }: TrustCheckoutShellProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="rounded-2xl border border-primary/20 bg-brand-orange-muted/40 px-4 py-4 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Shield className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display font-bold text-night">Paiement 100 % sécurisé</p>
            <p className="text-sm text-sand">{STEP_HINTS[currentStep] ?? STEP_HINTS[3]}</p>
          </div>
          {currentStep === 3 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white">
              <Smartphone className="h-3.5 w-3.5" aria-hidden />
              Mobile Money prioritaire
            </span>
          )}
        </div>
      </div>
      <TrustStrip variant="checkout" />
    </div>
  );
}
