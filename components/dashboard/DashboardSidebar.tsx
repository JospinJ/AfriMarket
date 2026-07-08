"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  MessageSquare,
  Megaphone,
  Package,
  Shield,
  ShoppingBag,
  Star,
  Truck,
  Users,
  MapPin,
  Crown,
  AlertTriangle,
  Store,
  type LucideIcon,
} from "lucide-react";
import { useRole } from "@/hooks/useRole";
import { useRoleHydrated } from "@/hooks/useRoleHydrated";
import { useTranslation } from "@/hooks/useTranslation";
import { filterNavByPermissions, getDashboardNav, getSupportNav } from "@/lib/dashboard-nav";
import type { NavItem } from "@/lib/dashboard-nav";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

const ICONS: Record<string, LucideIcon> = {
  overview: LayoutDashboard,
  users: Users,
  deliveryZones: MapPin,
  analytics: BarChart3,
  messages: MessageSquare,
  security: Shield,
  supportDisputes: AlertTriangle,
  products: Package,
  orders: ShoppingBag,
  premium: Crown,
  ads: Megaphone,
  adsAnalytics: BarChart3,
  reviews: Star,
  deliveries: Truck,
  earnings: BarChart3,
  disputes: AlertTriangle,
  marketplace: Store,
};

function NavSkeleton() {
  return (
    <ul className="space-y-0.5 px-2" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="h-10 animate-pulse rounded bg-dash-sidebar-hover/50" />
      ))}
    </ul>
  );
}

function useDashboardNavItems() {
  const pathname = usePathname();
  const { role, tier, isSupport, can } = useRole();
  const isSupportRoute = pathname.startsWith("/support");
  const rawNav = isSupportRoute ? getSupportNav() : getDashboardNav(role, tier, isSupport);
  return filterNavByPermissions(rawNav, can, role, tier);
}

interface SidebarNavProps {
  onNavigate?: () => void;
  className?: string;
}

export function SidebarNav({ onNavigate, className }: SidebarNavProps) {
  const pathname = usePathname();
  const hydrated = useRoleHydrated();
  const navItems = useDashboardNavItems();

  if (!hydrated) {
    return (
      <nav className={cn("flex-1 overflow-y-auto py-3", className)} aria-label="Navigation dashboard">
        <NavSkeleton />
      </nav>
    );
  }

  return (
    <nav className={cn("flex-1 overflow-y-auto py-2", className)} aria-label="Navigation dashboard">
      <ul className="space-y-0.5 px-2">
        {navItems.map((item) => (
          <NavLink key={`${item.labelKey}-${item.href}`} item={item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </ul>
    </nav>
  );
}

function NavLink({
  item,
  pathname,
  onNavigate,
  compact = false,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const { t } = useTranslation();
  const Icon = ICONS[item.iconKey] ?? LayoutDashboard;
  const label = t(item.labelKey);
  const isExact = pathname === item.href;
  const isChild = item.href !== "/" && pathname.startsWith(`${item.href}/`);
  const isActive = isExact || isChild;

  return (
    <li>
      <Link
        href={item.href}
        prefetch={false}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 font-medium transition-colors",
          compact ? "min-h-[36px] px-2.5 py-1.5 text-xs" : "min-h-[40px] px-3 py-2 text-sm",
          isActive
            ? "border-l-[3px] border-dash-accent bg-dash-sidebar-hover pl-[9px] text-white"
            : "border-l-[3px] border-transparent text-[#cccccc] hover:bg-dash-sidebar-hover hover:text-white"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
        {label}
      </Link>
    </li>
  );
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="shrink-0 border-t border-[#3a4553] p-3">
      <Link
        href={ROUTES.home}
        prefetch={false}
        onClick={onNavigate}
        className="flex min-h-[40px] items-center gap-2 rounded px-3 py-2 text-sm text-[#cccccc] transition-colors hover:bg-dash-sidebar-hover hover:text-white"
      >
        <Store className="h-4 w-4 shrink-0" aria-hidden />
        {t("dashboard.backToMarketplace")}
      </Link>
    </div>
  );
}

function SidebarBrand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href={ROUTES.home}
      onClick={onClick}
      className="flex h-14 shrink-0 items-center gap-1 border-b border-[#3a4553] px-4"
    >
      <span className="font-display text-lg font-bold text-white">Afri</span>
      <span className="font-display text-lg font-bold text-dash-accent">Market</span>
      <span className="ml-1 rounded bg-dash-accent/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-dash-accent">
        Hub
      </span>
    </Link>
  );
}

/** Sidebar fixe — style Amazon Seller Central */
export function DashboardSidebarDesktop() {
  return (
    <aside
      className="hidden md:flex md:w-[220px] md:shrink-0 md:flex-col bg-dash-sidebar lg:w-[240px]"
      aria-label="Navigation dashboard"
    >
      <SidebarBrand />
      <SidebarNav />
      <SidebarFooter />
    </aside>
  );
}

export interface DashboardSidebarMobileProps {
  open: boolean;
  onClose: () => void;
}

export function DashboardSidebarMobile({ open, onClose }: DashboardSidebarMobileProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(260px,85vw)] flex-col bg-dash-sidebar shadow-2xl transition-transform duration-200 md:hidden",
          open ? "translate-x-0" : "-translate-x-full pointer-events-none"
        )}
        aria-hidden={!open}
        aria-label="Menu dashboard"
      >
        <SidebarBrand onClick={onClose} />
        <SidebarNav onNavigate={onClose} />
        <SidebarFooter onNavigate={onClose} />
      </aside>
    </>
  );
}

export function DashboardMobileNav() {
  const pathname = usePathname();
  const hydrated = useRoleHydrated();
  const navItems = useDashboardNavItems();
  const { t } = useTranslation();

  if (!hydrated) return null;

  return (
    <nav
      className="flex gap-1.5 overflow-x-auto border-b border-dash-border bg-dash-header px-3 py-2 scrollbar-hide md:hidden"
      aria-label="Navigation rapide dashboard"
    >
      {navItems.map((item) => {
        const Icon = ICONS[item.iconKey] ?? LayoutDashboard;
        const label = t(item.labelKey);
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={`mobile-${item.labelKey}`}
            href={item.href}
            prefetch={false}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors",
              isActive
                ? "bg-dash-accent text-night"
                : "bg-dash-bg text-night hover:bg-dash-border/50"
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
