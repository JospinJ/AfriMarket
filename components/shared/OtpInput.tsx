"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

export interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onResend?: () => void;
  className?: string;
}

export function OtpInput({ length = 6, onComplete, onResend, className }: OtpInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[index] = digit;
    setValues(next);

    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    const otp = next.join("");
    if (otp.length === length && next.every((v) => v)) {
      onComplete?.(otp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn("space-y-2", className)} role="group" aria-label="Code OTP">
      <div className="flex gap-2 justify-center">
      {values.map((val, i) => (
        <Input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-12 w-10 text-center text-lg font-semibold"
          aria-label={`Chiffre ${i + 1}`}
        />
      ))}
      </div>
      {onResend && (
        <button type="button" onClick={onResend} className="mx-auto block text-xs text-green-deep hover:underline">
          Renvoyer le code
        </button>
      )}
    </div>
  );
}
