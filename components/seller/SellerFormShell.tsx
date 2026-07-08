"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SellerFormShellProps {
  title: string;
  description: string;
  children: ReactNode;
  variant?: "marketing" | "dashboard";
  footer?: ReactNode;
}

export function SellerFormShell({
  title,
  description,
  children,
  variant = "dashboard",
  footer,
}: SellerFormShellProps) {
  const isDash = variant === "dashboard";

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={cn(
          "overflow-hidden rounded-2xl border shadow-sm",
          isDash ? "border-dash-border bg-white" : "border-sand/15 bg-white",
        )}
      >
        <div
          className={cn("h-1", isDash ? "bg-dash-accent" : "bg-gradient-sunrise")}
          aria-hidden
        />
        <header className={cn("border-b px-6 py-5", isDash ? "border-dash-border" : "border-sand/15")}>
          <h1 className="font-display text-xl font-bold text-night md:text-2xl">{title}</h1>
          <p className="mt-1 text-sm text-sand">{description}</p>
        </header>
        <div className="px-6 py-6">{children}</div>
        {footer && (
          <footer className={cn("border-t px-6 py-4", isDash ? "border-dash-border bg-dash-bg/40" : "border-sand/15 bg-surface-light")}>
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  hint?: string;
}

export function FormField({ label, error, children, hint }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-night">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-sand">{hint}</p>}
      {error && (
        <p className="text-xs text-terracotta" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
