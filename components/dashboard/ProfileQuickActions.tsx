"use client";

import Link from "next/link";
import { useRole } from "@/hooks/useRole";
import { getProfileQuickActions } from "@/lib/dashboard-profile-actions";
import { cn } from "@/lib/utils/cn";

export function ProfileQuickActions() {
  const { role } = useRole();
  const actions = getProfileQuickActions(role);

  return (
    <section aria-label="Actions rapides">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-night">
        Accès rapide
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={cn(
              "group flex flex-col items-start rounded-lg border border-dash-border bg-white p-4 shadow-sm",
              "transition-all hover:border-dash-accent hover:shadow-md"
            )}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-dash-bg text-night transition-colors group-hover:bg-dash-accent group-hover:text-night">
              <action.icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="mt-3 block text-sm font-semibold text-night group-hover:text-[#c45500]">
              {action.label}
            </span>
            <span className="mt-1 line-clamp-2 text-xs leading-snug text-sand">
              {action.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
