"use client";

import { cn } from "@/lib/utils/cn";

interface OnboardingStepperProps {
  steps: string[];
  current: number;
  className?: string;
}

export function OnboardingStepper({ steps, current, className }: OnboardingStepperProps) {
  return (
    <ol className={cn("mb-8 flex flex-wrap gap-2 sm:gap-0", className)} aria-label="Étapes">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex min-w-0 flex-1 items-center">
            <div className="flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  done && "bg-green-deep text-white",
                  active && "bg-primary text-night ring-2 ring-primary/30",
                  !done && !active && "bg-sand/15 text-sand",
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={cn(
                  "max-w-[5.5rem] truncate text-center text-[10px] font-medium sm:max-w-none sm:text-left sm:text-xs",
                  active ? "text-night" : "text-sand",
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-1 hidden h-px flex-1 sm:block",
                  done ? "bg-green-deep/50" : "bg-sand/20",
                )}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
