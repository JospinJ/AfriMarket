import { cn } from "@/lib/utils/cn";
import type { PurchaseMode } from "@/types/product";

const MODE_CONFIG: Record<
  PurchaseMode,
  { icon: string; label: string; shortLabel: string }
> = {
  express: { icon: "⚡", label: "Express", shortLabel: "Express" },
  import: { icon: "🌍", label: "Import", shortLabel: "Import" },
  gros: { icon: "🏭", label: "Gros", shortLabel: "Gros" },
};

interface PurchaseModeChipProps {
  mode: PurchaseMode;
  etaDays?: [number, number];
  moq?: number;
  size?: "sm" | "md";
  className?: string;
}

export function PurchaseModeChip({
  mode,
  etaDays,
  moq,
  size = "md",
  className,
}: PurchaseModeChipProps) {
  const config = MODE_CONFIG[mode];
  const eta =
    etaDays && mode !== "gros"
      ? `${etaDays[0]}–${etaDays[1]} j`
      : mode === "gros" && moq
        ? `MOQ ${moq}`
        : null;

  return (
    <span
      className={cn(
        "inline-flex max-w-full min-w-0 items-center gap-1 rounded-full font-medium",
        mode === "express" && "bg-green-deep/10 text-green-deep",
        mode === "import" && "bg-gold/15 text-gold",
        mode === "gros" && "bg-sand/20 text-sand",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        className
      )}
    >
      <span aria-hidden="true" className="shrink-0">{config.icon}</span>
      <span className="truncate">{config.label}</span>
      {eta && <span className="shrink-0 opacity-70">· {eta}</span>}
    </span>
  );
}
