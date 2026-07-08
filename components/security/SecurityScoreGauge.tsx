import { cn } from "@/lib/utils/cn";

export interface SecurityScoreGaugeProps {
  score: number;
  level: "strong" | "medium" | "weak";
}

const LEVEL_CONFIG = {
  strong: { label: "Fort", color: "text-green-deep", ring: "stroke-green-deep" },
  medium: { label: "Moyen", color: "text-gold", ring: "stroke-gold" },
  weak: { label: "Faible", color: "text-terracotta", ring: "stroke-terracotta" },
};

export function SecurityScoreGauge({ score, level }: SecurityScoreGaugeProps) {
  const config = LEVEL_CONFIG[level];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-6 rounded-2xl border border-sand/20 bg-white p-6">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--sand)" strokeOpacity="0.2" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className={config.ring}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-night">{score}</span>
          <span className="text-[10px] text-sand">/100</span>
        </div>
      </div>
      <div>
        <h2 className="font-display text-lg font-semibold text-night">Score de sécurité</h2>
        <p className={cn("mt-1 text-sm font-medium", config.color)}>Niveau {config.label}</p>
        <p className="mt-2 text-xs text-sand">
          Activez la 2FA et vérifiez vos appareils pour améliorer votre score.
        </p>
      </div>
    </div>
  );
}
