"use client";

import { cn } from "@/lib/utils/cn";

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface SimpleBarChartProps {
  data: ChartDataPoint[];
  title?: string;
  className?: string;
}

export function SimpleBarChart({ data, title, className }: SimpleBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("rounded-lg border border-dash-border bg-white p-5 shadow-sm", className)}>
      {title && (
        <h4 className="mb-4 border-b border-dash-border pb-3 font-display text-sm font-bold text-night">
          {title}
        </h4>
      )}
      <div className="flex h-44 items-end gap-2">
        {data.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-dash-accent transition-all"
              style={{ height: `${(point.value / max) * 100}%`, minHeight: point.value > 0 ? "4px" : "0" }}
              role="img"
              aria-label={`${point.label}: ${point.value}`}
            />
            <span className="text-[10px] text-sand">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface SimpleLineChartProps {
  data: ChartDataPoint[];
  title?: string;
  className?: string;
}

export function SimpleLineChart({ data, title, className }: SimpleLineChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const points = data
    .map((d, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * 100;
      const y = 100 - (d.value / max) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={cn("rounded-lg border border-dash-border bg-white p-5 shadow-sm", className)}>
      {title && (
        <h4 className="mb-4 border-b border-dash-border pb-3 font-display text-sm font-bold text-night">
          {title}
        </h4>
      )}
      <svg viewBox="0 0 100 100" className="h-44 w-full" preserveAspectRatio="none" role="img" aria-label={title ?? "Graphique"}>
        <polyline fill="none" stroke="var(--dash-accent)" strokeWidth="2" points={points} />
        {data.map((d, i) => {
          const x = (i / Math.max(data.length - 1, 1)) * 100;
          const y = 100 - (d.value / max) * 80;
          return <circle key={d.label} cx={x} cy={y} r="2" fill="var(--green-deep)" />;
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-sand">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
