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
    <nav aria-label="Étapes du checkout" className="mb-8">
      <ol className="flex items-center justify-between">
        {STEPS.map((step, i) => (
          <li key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                  currentStep > step.id && "bg-secondary text-white",
                  currentStep === step.id && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  currentStep < step.id && "bg-sand/20 text-sand"
                )}
              >
                {currentStep > step.id ? <Check size={16} /> : step.id}
              </div>
              <span
                className={cn(
                  "mt-1 hidden text-xs sm:block",
                  currentStep >= step.id ? "text-night" : "text-sand"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-0.5 flex-1",
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
