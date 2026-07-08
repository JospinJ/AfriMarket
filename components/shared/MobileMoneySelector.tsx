"use client";

import { useState } from "react";
import { OPERATOR_LABELS, operatorsForCountry } from "@/lib/constants/operators";
import { validatePhone } from "@/lib/utils/validate-phone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/shared/OtpInput";
import { cn } from "@/lib/utils/cn";
import type { CountryCode } from "@/types/common";
import type { MobileMoneyOperator } from "@/types/payment";

export interface MobileMoneySelectorProps {
  country?: CountryCode;
  onSuccess?: () => void;
  className?: string;
  /** Controlled mode (checkout) */
  selected?: MobileMoneyOperator | null;
  phone?: string;
  onOperatorChange?: (operator: MobileMoneyOperator) => void;
  onPhoneChange?: (phone: string) => void;
  /** Self-contained OTP flow */
  embeddedOtp?: boolean;
}

export function MobileMoneySelector({
  country = "CM",
  onSuccess,
  className,
  selected: controlledOperator,
  phone: controlledPhone,
  onOperatorChange,
  onPhoneChange,
  embeddedOtp = false,
}: MobileMoneySelectorProps) {
  const operators = operatorsForCountry(country);
  const isControlled = onOperatorChange !== undefined;

  const [internalOperator, setInternalOperator] = useState<MobileMoneyOperator>(operators[0] ?? "mtn");
  const [internalPhone, setInternalPhone] = useState("");
  const [step, setStep] = useState<"select" | "otp" | "success">("select");
  const [error, setError] = useState<string | null>(null);

  const operator = isControlled ? (controlledOperator ?? operators[0] ?? "mtn") : internalOperator;
  const phone = isControlled ? (controlledPhone ?? "") : internalPhone;

  const setOperator = (op: MobileMoneyOperator) => {
    if (isControlled) onOperatorChange?.(op);
    else setInternalOperator(op);
  };

  const setPhone = (value: string) => {
    if (isControlled) onPhoneChange?.(value);
    else setInternalPhone(value);
  };

  const handleSendOtp = () => {
    if (!validatePhone(phone, country)) {
      setError("Numéro invalide pour ce pays");
      return;
    }
    setError(null);
    // TODO API: POST /payments/mobile-money/otp → { operator, phone, country } → { sent: boolean }
    if (!isControlled) setStep("otp");
    onSuccess?.();
  };

  const handleVerifyOtp = (otp: string) => {
    if (otp.length < 6) return;
    // TODO API: POST /payments/mobile-money/verify → { operator, phone, otp } → { success: boolean }
    if (!isControlled) setStep("success");
    onSuccess?.();
  };

  if (!isControlled && step === "success") {
    return (
      <div className={cn("rounded-lg border border-green-deep/30 bg-green-deep/5 p-4 text-sm text-green-deep", className)}>
        Paiement Mobile Money confirmé via {OPERATOR_LABELS[operator]}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-sm font-medium text-night">Mobile Money (recommandé)</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {operators.map((op) => (
          <button
            key={op}
            type="button"
            onClick={() => setOperator(op)}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-medium transition-colors min-h-[44px]",
              operator === op
                ? "border-green-deep bg-green-deep/10 text-green-deep"
                : "border-sand/30 bg-white text-night hover:border-sand/50"
            )}
          >
            {OPERATOR_LABELS[op]}
          </button>
        ))}
      </div>
      {(!isControlled || !embeddedOtp) && (isControlled ? step === "select" : step !== "otp") && (
        <>
          <Input
            type="tel"
            placeholder="Numéro Mobile Money"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="Numéro Mobile Money"
          />
          {error && <p className="text-xs text-terracotta">{error}</p>}
          {!isControlled && (
            <Button type="button" onClick={handleSendOtp} className="w-full">
              Envoyer le code OTP
            </Button>
          )}
        </>
      )}
      {!isControlled && step === "otp" && (
        <div className="space-y-3">
          <p className="text-xs text-sand">Code envoyé au {phone}</p>
          <OtpInput length={6} onComplete={handleVerifyOtp} />
          <Button type="button" variant="ghost" size="sm" onClick={() => setStep("select")}>
            Changer de numéro
          </Button>
        </div>
      )}
    </div>
  );
}
