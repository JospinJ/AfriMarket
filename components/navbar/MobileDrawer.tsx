"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Home,
  Grid3X3,
  Star,
  Store,
  Truck,
  User,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  Search,
  Heart,
  Package,
  ShoppingCart,
  Headphones,
  Scale,
  Wallet,
  MapPin,
  Bell,
} from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { BRAND } from "@/lib/constants/design";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { cn } from "@/lib/utils/cn";
import { useUiStore } from "@/store/useUiStore";
import { useRole } from "@/hooks/useRole";
import { CATEGORIES } from "@/lib/constants/categories";
import { NAV_SECONDARY_LINKS } from "@/lib/constants/nav";
import { ROUTES } from "@/lib/constants/routes";
import { LocationSelector } from "@/components/navbar/LocationSelector";

const ACCOUNT_LINKS = [
  { href: ROUTES.favorites, label: "Favoris", icon: Heart },
  { href: `${ROUTES.buyer}/orders`, label: "Mes commandes", icon: Package },
  { href: ROUTES.cart, label: "Mon panier", icon: ShoppingCart },
  { href: ROUTES.compare, label: "Comparer", icon: Scale },
  { href: ROUTES.wallet, label: "Portefeuille", icon: Wallet },
  { href: ROUTES.addresses, label: "Adresses", icon: MapPin },
  { href: ROUTES.settings, label: "Paramètres", icon: Settings },
] as const;

const SERVICE_LINKS = [
  { href: ROUTES.help, label: "Assistance client", icon: Headphones },
  { href: ROUTES.becomeSeller, label: "Devenir vendeur", icon: Store },
  { href: ROUTES.becomeDriver, label: "Devenir livreur", icon: Truck },
] as const;

export function MobileDrawer() {
  const router = useRouter();
  const open = useUiStore((s) => s.mobileMenuOpen);
  const setOpen = useUiStore((s) => s.setMobileMenuOpen);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);
  const { isAuthenticated, homePath, logout } = useRole();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push(ROUTES.home);
  };

  const toggleCategory = (id: string) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  const closeAndSearch = () => {
    setOpen(false);
    setSearchOpen(true);
  };

  const shortcuts = [
    { href: ROUTES.home, label: "Accueil", icon: Home },
    { href: ROUTES.favorites, label: "Favoris", icon: Heart },
    { href: ROUTES.cart, label: "Panier", icon: ShoppingCart },
    {
      href: isAuthenticated ? homePath : ROUTES.login,
      label: isAuthenticated ? "Compte" : "Connexion",
      icon: isAuthenticated ? User : LogIn,
    },
  ] as const;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-night/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="fixed inset-y-0 left-0 z-[56] flex w-[min(360px,92vw)] flex-col bg-white shadow-premium-xl lg:hidden"
            aria-label="Menu de navigation"
          >
            <div className="border-b border-sand/15 bg-night px-4 py-4 text-white">
              <div className="mb-3 flex items-center justify-between gap-2">
                <BrandLogo heightPx={BRAND.logoSizes.drawer} showName dark size="md" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-white/10"
                  aria-label="Fermer le menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="mb-3 grid grid-cols-4 gap-2">
                {shortcuts.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl bg-white/8 px-1 py-2 text-center text-[11px] font-medium text-white transition-colors hover:bg-white/12"
                  >
                    <item.icon size={18} className="text-primary" aria-hidden />
                    <span className="leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>

              <LocationSelector variant="dark" className="mb-3" />
              <button
                type="button"
                onClick={closeAndSearch}
                className="flex h-11 w-full items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white/70"
              >
                <Search className="h-4 w-4 text-primary" aria-hidden />
                Rechercher un produit…
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-sand">
                <Grid3X3 size={14} aria-hidden />
                Catégories
              </p>
              <ul className="mb-5 space-y-1">
                {CATEGORIES.map((cat) => {
                  const isExpanded = expandedCategory === cat.id;
                  const hasChildren = (cat.children?.length ?? 0) > 0;
                  return (
                    <li key={cat.id} className="overflow-hidden rounded-xl border border-sand/10">
                      <div className="flex items-center bg-ivory/50">
                        <Link
                          href={ROUTES.category(cat.slug)}
                          onClick={() => setOpen(false)}
                          className="flex-1 px-3 py-3 text-sm font-semibold text-night"
                        >
                          {cat.name}
                        </Link>
                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat.id)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center text-sand"
                            aria-expanded={isExpanded}
                            aria-label={`${isExpanded ? "Replier" : "Déplier"} ${cat.name}`}
                          >
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                isExpanded && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </button>
                        )}
                      </div>
                      {hasChildren && isExpanded && (
                        <ul className="space-y-0.5 border-t border-sand/10 bg-white px-2 py-2">
                          {cat.children?.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={ROUTES.category(child.slug)}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-3 py-2.5 text-sm text-night hover:bg-brand-orange-muted"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-sand">
                Découvrir
              </p>
              <ul className="mb-5 space-y-1">
                {NAV_SECONDARY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-orange-muted",
                        link.highlight ? "text-primary" : "text-night",
                      )}
                    >
                      <link.icon size={18} className="text-primary" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-sand">
                Mon compte
              </p>
              <ul className="mb-5 space-y-1">
                {isAuthenticated ? (
                  <li>
                    <Link
                      href={homePath}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-night hover:bg-surface-light"
                    >
                      <User size={18} className="text-secondary" aria-hidden />
                      Mon compte
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        href={ROUTES.login}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-night hover:bg-surface-light"
                      >
                        <LogIn size={18} className="text-secondary" aria-hidden />
                        Connexion
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={ROUTES.register}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-night hover:bg-surface-light"
                      >
                        <UserPlus size={18} className="text-secondary" aria-hidden />
                        Inscription
                      </Link>
                    </li>
                  </>
                )}
                {ACCOUNT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-night hover:bg-surface-light"
                    >
                      <link.icon size={18} className="text-secondary" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={ROUTES.settings}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-night hover:bg-surface-light"
                  >
                    <Bell size={18} className="text-secondary" aria-hidden />
                    Notifications
                  </Link>
                </li>
              </ul>

              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-sand">
                Services
              </p>
              <ul className="space-y-1 border-t border-sand/15 pt-4">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-night hover:bg-surface-light"
                    >
                      <link.icon size={18} className="text-secondary" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
                {isAuthenticated && (
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-terracotta hover:bg-surface-light"
                    >
                      <LogOut size={18} aria-hidden />
                      Déconnexion
                    </button>
                  </li>
                )}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-sand/15 p-4">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-sand/15 bg-surface-light px-3 py-2.5">
                <span className="text-xs font-medium text-sand">Langue</span>
                <LanguageSelector variant="light" showFlag />
              </div>
              <Link
                href={ROUTES.premium}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-gold px-4 py-3 text-sm font-bold text-night shadow-glow-orange"
              >
                <Star size={16} fill="currentColor" aria-hidden />
                Passer Premium
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
