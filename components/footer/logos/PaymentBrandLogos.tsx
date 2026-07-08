import type { ComponentType } from "react";
import { cn } from "@/lib/utils/cn";
import type { PaymentBrandId } from "@/lib/constants/footer-nav";

interface LogoProps {
  className?: string;
}

function LogoShell({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-11 min-w-[4.5rem] items-center justify-center rounded-lg border border-white/10 bg-white px-3 shadow-sm",
        className,
      )}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}

export function OrangeMoneyLogo({ className }: LogoProps) {
  return (
    <LogoShell label="Orange Money" className={className}>
      <svg viewBox="0 0 120 32" className="h-5 w-auto" aria-hidden>
        <rect width="120" height="32" rx="4" fill="#FF7900" />
        <text
          x="60"
          y="21"
          textAnchor="middle"
          fill="#fff"
          fontSize="11"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          orange money
        </text>
      </svg>
    </LogoShell>
  );
}

export function MtnMomoLogo({ className }: LogoProps) {
  return (
    <LogoShell label="MTN Mobile Money" className={className}>
      <svg viewBox="0 0 120 32" className="h-5 w-auto" aria-hidden>
        <rect width="120" height="32" rx="4" fill="#FFCC00" />
        <text
          x="8"
          y="14"
          fill="#000"
          fontSize="9"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
        >
          MTN
        </text>
        <text
          x="8"
          y="24"
          fill="#000"
          fontSize="8"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          MoMo
        </text>
      </svg>
    </LogoShell>
  );
}

export function MoovMoneyLogo({ className }: LogoProps) {
  return (
    <LogoShell label="Moov Money" className={className}>
      <svg viewBox="0 0 120 32" className="h-5 w-auto" aria-hidden>
        <rect width="120" height="32" rx="4" fill="#0066CC" />
        <text
          x="60"
          y="21"
          textAnchor="middle"
          fill="#fff"
          fontSize="11"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          Moov Money
        </text>
      </svg>
    </LogoShell>
  );
}

export function VisaLogo({ className }: LogoProps) {
  return (
    <LogoShell label="Visa" className={cn("min-w-[3.5rem]", className)}>
      <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden>
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <path
          d="M20.2 21h-3.2l2-12.4h3.2L20.2 21zm11.8-12.1c-.6-.2-1.6-.5-2.8-.5-3.1 0-5.3 1.6-5.3 4 0 1.7 1.6 2.7 2.8 3.3 1.2.6 1.7 1 1.7 1.5 0 .8-1 1.2-2 1.2-1.3 0-2-.2-3.1-.7l-.4-.2-.5 2.8c.8.3 2.3.6 3.8.6 3.3 0 5.4-1.6 5.5-4 .1-1.4-1-2.4-3.1-3.3-1.3-.6-2.1-1-2.1-1.6 0-.5.6-1.1 1.9-1.1 1.1 0 1.9.2 2.5.5l.3.1.5-2.7zm8.5-.3h-2.5c-.8 0-1.4.2-1.7 1l-4.9 11.4h3.4l.7-2h4.2l.4 2h3l-2.6-12.4zm-4.2 8l1.7-4.7.9 4.7h-2.6zM14.5 8.6L11.3 21H8l3.2-12.4h3.3z"
          fill="#fff"
        />
      </svg>
    </LogoShell>
  );
}

export function MastercardLogo({ className }: LogoProps) {
  return (
    <LogoShell label="Mastercard" className={cn("min-w-[3.5rem]", className)}>
      <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden>
        <rect width="48" height="32" rx="4" fill="#252525" />
        <circle cx="19" cy="16" r="9" fill="#EB001B" />
        <circle cx="29" cy="16" r="9" fill="#F79E1B" />
        <path
          d="M24 9.5a9 9 0 0 1 0 13A9 9 0 0 1 24 9.5z"
          fill="#FF5F00"
          opacity="0.85"
        />
      </svg>
    </LogoShell>
  );
}

export function AmexLogo({ className }: LogoProps) {
  return (
    <LogoShell label="American Express" className={cn("min-w-[3.5rem]", className)}>
      <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden>
        <rect width="48" height="32" rx="4" fill="#006FCF" />
        <text
          x="24"
          y="19"
          textAnchor="middle"
          fill="#fff"
          fontSize="7"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          AMEX
        </text>
      </svg>
    </LogoShell>
  );
}

export function UbaLogo({ className }: LogoProps) {
  return (
    <LogoShell label="UBA" className={className}>
      <svg viewBox="0 0 80 32" className="h-5 w-auto" aria-hidden>
        <text x="4" y="22" fill="#D71920" fontSize="18" fontWeight="800" fontFamily="system-ui, sans-serif">
          UBA
        </text>
      </svg>
    </LogoShell>
  );
}

export function EcobankLogo({ className }: LogoProps) {
  return (
    <LogoShell label="Ecobank" className={className}>
      <svg viewBox="0 0 100 32" className="h-5 w-auto" aria-hidden>
        <text x="4" y="14" fill="#00529B" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">
          ECOBANK
        </text>
        <rect x="4" y="18" width="60" height="3" rx="1" fill="#00A651" />
      </svg>
    </LogoShell>
  );
}

export function SgbcLogo({ className }: LogoProps) {
  return (
    <LogoShell label="Société Générale" className={className}>
      <svg viewBox="0 0 120 32" className="h-5 w-auto" aria-hidden>
        <rect x="0" y="6" width="4" height="20" fill="#E30613" rx="1" />
        <rect x="6" y="6" width="4" height="20" fill="#000" rx="1" />
        <text x="16" y="21" fill="#000" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
          Société Générale
        </text>
      </svg>
    </LogoShell>
  );
}

export function AfrilandLogo({ className }: LogoProps) {
  return (
    <LogoShell label="Afriland First Bank" className={className}>
      <svg viewBox="0 0 120 32" className="h-5 w-auto" aria-hidden>
        <text x="4" y="14" fill="#006B3F" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">
          AFRILAND
        </text>
        <text x="4" y="24" fill="#006B3F" fontSize="7" fontWeight="500" fontFamily="system-ui, sans-serif">
          FIRST BANK
        </text>
      </svg>
    </LogoShell>
  );
}

const LOGO_MAP: Record<PaymentBrandId, ComponentType<LogoProps>> = {
  "orange-money": OrangeMoneyLogo,
  "mtn-momo": MtnMomoLogo,
  "moov-money": MoovMoneyLogo,
  visa: VisaLogo,
  mastercard: MastercardLogo,
  amex: AmexLogo,
  uba: UbaLogo,
  ecobank: EcobankLogo,
  sgbc: SgbcLogo,
  afriland: AfrilandLogo,
};

export function PaymentBrandLogo({
  id,
  className,
}: {
  id: PaymentBrandId;
  className?: string;
}) {
  const Component = LOGO_MAP[id];
  return <Component className={className} />;
}
