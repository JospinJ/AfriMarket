"use client";

import type { ReactNode } from "react";
import { ProfileHero } from "@/components/dashboard/ProfileHero";
import { ProfileQuickActions } from "@/components/dashboard/ProfileQuickActions";
import { useRole } from "@/hooks/useRole";
import {
  ROLE_PROFILE_SUBTITLES,
  ROLE_PROFILE_TITLES,
} from "@/lib/dashboard-profile-actions";

interface ProfileDashboardProps {
  children?: ReactNode;
  headerExtra?: ReactNode;
}

export function ProfileDashboard({ children, headerExtra }: ProfileDashboardProps) {
  const { role } = useRole();

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <ProfileHero />
      {headerExtra}

      <ProfileQuickActions />

      <section className="rounded-lg border border-dash-border bg-white p-5 shadow-sm sm:p-6">
        <header className="mb-5 border-b border-dash-border pb-4">
          <h2 className="font-display text-lg font-bold text-night">
            {ROLE_PROFILE_TITLES[role]}
          </h2>
          <p className="mt-1 text-sm text-sand">{ROLE_PROFILE_SUBTITLES[role]}</p>
        </header>
        {children}
      </section>
    </div>
  );
}
