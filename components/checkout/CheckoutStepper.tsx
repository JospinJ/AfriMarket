import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Adresse" },
  { id: 2, label: "Livraison" },
  { id: 3, label: "Paiement" },
  { id: 4, label: "Résumé" },
  { id: 5, label: "Confirmation" },
];

interface CheckoutStepperProps {
  currentStep: number;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <nav aria-label="Étapes du checkout" className="mb-6 sm:mb-8">
      <ol className="-mx-1 flex items-center justify-between gap-0 overflow-x-auto px-1 pb-1">
        {STEPS.map((step, i) => (
          <li key={step.id} className="flex min-w-0 flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 sm:text-sm",
                  currentStep > step.id && "bg-secondary text-white",
                  currentStep === step.id && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  currentStep < step.id && "bg-sand/20 text-sand"
                )}
              >
                {currentStep > step.id ? <Check size={14} /> : step.id}
              </div>
              <span
                className={cn(
                  "mt-1 max-w-[4.5rem] truncate text-center text-[10px] sm:max-w-none sm:text-xs",
                  currentStep === step.id ? "block text-night" : "hidden text-sand sm:block",
                  currentStep > step.id && "text-night"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-0.5 h-0.5 min-w-[8px] flex-1 sm:mx-1",
                  currentStep > step.id ? "bg-secondary" : "bg-sand/20"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
