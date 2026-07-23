"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Package, Heart, MapPin, Wallet, Settings, Store, Truck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useRole } from "@/hooks/useRole";
import { mockUsers } from "@/lib/mocks/sellers";
import { RoleGuard } from "@/components/shared/RoleGuard";
import { ROUTES } from "@/lib/constants/routes";
import type { Role } from "@/types/user";

interface UserMenuProps {
  className?: string;
  variant?: "default" | "premium";
  /** Icône seule — pour la navbar mobile */
  compact?: boolean;
}

interface MenuItem {
  href: string;
  label: string;
  icon: typeof User;
  roles: Role[];
}

export function UserMenu({ className, variant = "default", compact = false }: UserMenuProps) {
  const router = useRouter();
  const { role, userId, homePath, isAuthenticated, logout } = useRole();
  const user = isAuthenticated ? mockUsers.find((u) => u.id === userId) : undefined;
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push(ROUTES.home);
  };

  const isPremium = variant === "premium";

  if (!isAuthenticated || !user) {
    if (compact) {
      return (
        <Link
          href={ROUTES.login}
          className={cn(
            "flex min-h-10 min-w-10 items-center justify-center rounded-lg transition-colors",
            isPremium
              ? "text-white hover:bg-white/10"
              : "text-night hover:bg-brand-orange-muted hover:text-primary",
            className,
          )}
          aria-label="Connexion"
        >
          <User size={22} aria-hidden />
        </Link>
      );
    }

    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Link
          href={ROUTES.login}
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isPremium
              ? "text-white/90 hover:bg-white/10 hover:text-white"
              : "text-night hover:bg-brand-orange-muted hover:text-primary",
          )}
        >
          Connexion
        </Link>
        <Link
          href={ROUTES.register}
          className="rounded-lg bg-primary px-3 py-2 text-sm font-bold text-night shadow-glow-orange transition-colors hover:bg-primary-hover"
        >
          Inscription
        </Link>
      </div>
    );
  }

  const ordersHref =
    role === "buyer"
      ? `${ROUTES.buyer}/orders`
      : role === "seller"
        ? `${ROUTES.seller}/orders`
        : role === "driver"
          ? `${ROUTES.driver}/deliveries`
          : ROUTES.admin;

  const menuItems: MenuItem[] = [
    { href: homePath, label: "Mon profil", icon: User, roles: ["admin", "seller", "driver", "buyer"] },
    { href: ordersHref, label: "Mes commandes", icon: Package, roles: ["admin", "seller", "driver", "buyer"] },
    { href: ROUTES.favorites, label: "Favoris", icon: Heart, roles: ["admin", "seller", "driver", "buyer"] },
    { href: ROUTES.addresses, label: "Adresses", icon: MapPin, roles: ["admin", "buyer"] },
    { href: ROUTES.wallet, label: "Portefeuille", icon: Wallet, roles: ["admin", "buyer", "seller"] },
    { href: ROUTES.seller, label: "Ma boutique", icon: Store, roles: ["seller"] },
    { href: ROUTES.driver, label: "Mes livraisons", icon: Truck, roles: ["driver"] },
    { href: ROUTES.settings, label: "Paramètres", icon: Settings, roles: ["admin", "seller", "driver", "buyer"] },
  ];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex min-h-11 items-center gap-2 rounded-lg px-2 py-1.5 transition-colors",
          compact && "min-h-10 min-w-10 justify-center px-0",
          isPremium ? "text-white hover:bg-white/10" : "hover:bg-surface-light",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Mon compte"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-green-deep text-sm font-bold text-white shadow-sm">
          {user.firstName.charAt(0)}
        </span>
        <span className="hidden flex-col items-start leading-tight xl:flex">
          <span className={cn("text-[10px]", isPremium ? "text-white/60" : "text-sand")}>
            Bonjour, {user.firstName}
          </span>
          <span className={cn("text-xs font-semibold", isPremium ? "text-white" : "text-night")}>
            Mon compte
          </span>
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div
            className="absolute right-0 top-full z-50 mt-1 max-h-[min(70dvh,24rem)] w-56 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-sand/20 bg-white py-2 shadow-lg"
            role="menu"
          >
            <p className="border-b border-sand/10 px-4 py-2 text-xs text-sand">
              Connecté en tant que {role}
            </p>
            {menuItems.map((item) => (
              <RoleGuard key={item.label} allow={item.roles}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-night hover:bg-surface-light"
                  role="menuitem"
                >
                  <item.icon size={16} aria-hidden />
                  {item.label}
                </Link>
              </RoleGuard>
            ))}
            <hr className="my-1 border-sand/10" />
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-terracotta hover:bg-surface-light"
            >
              <LogOut size={16} aria-hidden />
              Déconnexion
            </button>
          </div>
        </>
      )}
    </div>
  );
}
