"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/shared/OtpInput";

export interface TwoFactorPanelProps {
  enabled: boolean;
  method?: "sms" | "email" | "app";
}

export function TwoFactorPanel({ enabled: initialEnabled, method = "sms" }: TwoFactorPanelProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [step, setStep] = useState<"idle" | "otp">("idle");

  const handleEnable = () => {
    setStep("otp");
    // TODO API: POST /security/2fa/send-otp → { method } → { sent }
  };

  const handleVerify = (otp: string) => {
    if (otp.length < 6) return;
    setEnabled(true);
    setStep("idle");
    // TODO API: POST /security/2fa/enable → { method, otp } → { success }
  };

  return (
    <section className="rounded-2xl border border-sand/20 bg-white p-6">
      <div className="flex items-start gap-3">
        <Shield className="h-6 w-6 text-green-deep shrink-0" aria-hidden />
        <div className="flex-1">
          <h2 className="font-display text-lg font-semibold text-night">Authentification à deux facteurs</h2>
          <p className="mt-1 text-sm text-sand">
            {enabled ? `Activée via ${method.toUpperCase()}` : "Recommandée pour protéger vos paiements Mobile Money"}
          </p>
          {!enabled && step === "idle" && (
            <Button className="mt-4" size="sm" onClick={handleEnable}>
              Activer la 2FA
            </Button>
          )}
          {step === "otp" && (
            <div className="mt-4 space-y-3">
              <p className="text-xs text-sand">Entrez le code reçu par SMS</p>
              <OtpInput length={6} onComplete={handleVerify} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
