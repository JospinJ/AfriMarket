"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { useRole } from "@/hooks/useRole";
import { useTranslation } from "@/hooks/useTranslation";
import { mockUsers } from "@/lib/mocks/sellers";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";

export interface DashboardTopBarProps {
  onMenuClick?: () => void;
}

export function DashboardTopBar({ onMenuClick }: DashboardTopBarProps) {
  const { role, tier, userId } = useRole();
  const pathname = usePathname();
  const { t } = useTranslation();
  const user = mockUsers.find((u) => u.id === userId);
  const displayRole = pathname.startsWith("/support") ? "support" : role;
  const securityHref = `/${displayRole === "support" ? "support" : role}/security`;

  const roleLabel =
    t(`dashboard.roles.${displayRole}` as "dashboard.roles.admin") ||
    t("dashboard.roles.default");

  return (
    <header className="sticky top-0 z-30 border-b border-dash-border bg-dash-header shadow-sm">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-night hover:bg-dash-bg md:hidden"
          onClick={onMenuClick}
          aria-label={t("nav.openMenu")}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-semibold text-night">{roleLabel}</p>
          {role === "seller" && tier && (
            <p className="text-xs text-sand capitalize">
              {t("dashboard.subscription")}{" "}
              <span className="font-medium text-dash-accent">{tier}</span>
            </p>
          )}
        </div>

        <div className="hidden max-w-md flex-1 md:flex">
          <label className="relative w-full">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand"
              aria-hidden
            />
            <input
              type="search"
              placeholder={t("nav.searchInDashboard")}
              className="h-10 w-full rounded-md border border-dash-border bg-dash-bg pl-10 pr-3 text-sm text-night placeholder:text-sand focus:border-dash-accent focus:outline-none focus:ring-1 focus:ring-dash-accent"
              aria-label={t("nav.searchInDashboard")}
            />
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <LanguageSelector variant="light" className="hidden sm:flex" />
          <NotificationBell variant="dashboard" />
          <Link
            href={securityHref}
            className="flex h-9 items-center gap-2 rounded-md border border-dash-border bg-dash-bg px-2.5 text-sm font-medium text-night transition-colors hover:border-dash-accent"
            aria-label={t("nav.profileSettings")}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-dash-accent text-xs font-bold text-night">
              {user?.firstName?.charAt(0) ?? role[0]?.toUpperCase()}
            </span>
            <span className="hidden lg:inline">{user?.firstName ?? role}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
