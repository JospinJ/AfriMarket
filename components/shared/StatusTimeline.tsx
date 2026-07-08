import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface TimelineStep {
  label: string;
  description?: string;
  done: boolean;
  at?: string;
  key?: string;
  current?: boolean;
}

export interface StatusTimelineProps {
  steps: TimelineStep[];
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function StatusTimeline({ steps, className, orientation = "vertical" }: StatusTimelineProps) {
  if (orientation === "horizontal") {
    return (
      <ol className={cn("flex items-start justify-between gap-2 overflow-x-auto", className)}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={step.key ?? step.label} className="flex min-w-0 flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                <span
                  className={cn(
                    "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    step.done || step.current
                      ? "bg-green-deep text-white"
                      : "border-2 border-sand/40 bg-white text-sand"
                  )}
                >
                  {step.done ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Circle className="h-2 w-2 fill-sand/40" aria-hidden />}
                </span>
                {!isLast && (
                  <span
                    className={cn("h-0.5 flex-1", step.done ? "bg-green-deep" : "bg-sand/30")}
                    aria-hidden
                  />
                )}
              </div>
              <p className={cn("mt-2 text-xs font-medium", step.done || step.current ? "text-night" : "text-sand")}>
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cn("space-y-0", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.key ?? step.label} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[11px] top-6 h-full w-0.5",
                  step.done ? "bg-green-deep" : "bg-sand/30"
                )}
                aria-hidden
              />
            )}
            <span
              className={cn(
                "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                step.done || step.current ? "bg-green-deep text-white" : "border-2 border-sand/40 bg-white text-sand"
              )}
            >
              {step.done ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Circle className="h-2 w-2 fill-sand/40" aria-hidden />}
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className={cn("text-sm font-medium", step.done || step.current ? "text-night" : "text-sand")}>{step.label}</p>
              {step.description && <p className="mt-0.5 text-xs text-sand">{step.description}</p>}
              {step.at && <p className="mt-0.5 text-xs text-sand/70">{step.at}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
