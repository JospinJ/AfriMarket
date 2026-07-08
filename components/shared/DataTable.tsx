"use client";

import { cn } from "@/lib/utils/cn";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "Aucune donnée",
  className,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={cn("rounded-lg border border-sand/20 bg-white p-8 text-center text-sm text-sand", className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto rounded-lg border border-sand/20 bg-white", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-sand/20 bg-surface-light">
            {columns.map((col) => (
              <th key={col.key} className={cn("px-4 py-3 text-left font-medium text-night", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="border-b border-sand/10 last:border-0 hover:bg-surface-light/50">
              {columns.map((col) => (
                <td key={col.key} className={cn("px-4 py-3 text-night/80", col.className)}>
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
