import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

export type KpiMotif = "kente" | "adinkra" | "bogolan" | "ndop" | "none";

export interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  motif?: KpiMotif;
  region?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  region,
  className,
}: KpiCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg border border-dash-border bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 pt-4">
        <div className="min-w-0">
          <CardTitle className="text-xs font-medium uppercase tracking-wide text-sand">
            {title}
          </CardTitle>
          {region && (
            <p className="mt-0.5 truncate text-[10px] text-sand">{region}</p>
          )}
        </div>
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-dash-bg text-night">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        )}
      </CardHeader>
      <CardContent className="pb-4">
        <p className="font-display text-2xl font-bold tracking-tight text-night lg:text-3xl">
          {value}
        </p>
        {change && (
          <p
            className={cn(
              "mt-2 flex items-center gap-1 text-xs font-medium",
              trend === "up" && "text-[#067d62]",
              trend === "down" && "text-[#b12704]",
              trend === "neutral" && "text-sand"
            )}
          >
            <TrendIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
