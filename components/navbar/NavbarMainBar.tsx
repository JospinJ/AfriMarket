"use client";

import { memo } from "react";
import { Heart, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useUiStore } from "@/store/useUiStore";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { ROUTES } from "@/lib/constants/routes";
import { NavbarLogo } from "@/components/navbar/NavbarLogo";
import { NavbarIconAction } from "@/components/navbar/NavbarIconAction";
import { NavbarMobileQuickLinks } from "@/components/navbar/NavbarMobileQuickLinks";
import { SearchBar } from "@/components/navbar/SearchBar";
import { CartMini } from "@/components/navbar/CartMini";
import { UserMenu } from "@/components/navbar/UserMenu";
import { NavbarActions } from "@/components/navbar/NavbarActions";

interface NavbarMainBarProps {
  scrolled: boolean;
}

function NavbarMainBarInner({ scrolled }: NavbarMainBarProps) {
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);
  const { t } = useTranslation();
  const mounted = useMounted();
  const favoritesCount = useFavoritesStore((s) => s.ids.length);
  const displayFavorites = mounted ? favoritesCount : 0;

  return (
    <div
      className={cn(
        "bg-night transition-shadow duration-300",
        scrolled && "shadow-premium-lg",
      )}
    >
      <div className="mx-auto max-w-[1440px] px-3 py-2.5 sm:px-4 lg:px-6 lg:py-3">
        {/* ── Mobile : menu + logo à gauche, actions à droite ── */}
        <div className="flex items-center justify-between gap-2 md:hidden">
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white hover:bg-white/10"
              aria-label={t("nav.openMenu")}
            >
              <Menu size={20} />
            </button>
            <NavbarLogo compact dark />
          </div>
          <div className="flex shrink-0 items-center">
            <NavbarIconAction
              href={ROUTES.favorites}
              label={
                displayFavorites > 0
                  ? `${t("nav.favorites")}, ${displayFavorites}`
                  : t("nav.favorites")
              }
              badge={displayFavorites}
              badgeTone="terracotta"
              className="px-1"
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  displayFavorites > 0 && "fill-terracotta text-terracotta",
                )}
                aria-hidden
              />
            </NavbarIconAction>
            <CartMini compact variant="premium" className="px-1" />
            <UserMenu compact variant="premium" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="mt-2 flex h-12 w-full items-center gap-3 rounded-xl border border-white/15 bg-white px-4 text-left text-sm text-sand shadow-premium-sm md:hidden"
          aria-label={t("common.search")}
        >
          <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <span className="truncate">{t("nav.searchPlaceholder")}</span>
        </button>

        <NavbarMobileQuickLinks />

        {/* ── Desktop / tablette : recherche dominante au centre ── */}
        <div className="hidden md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-3 lg:gap-4">
          <NavbarLogo dark className="shrink-0" />

          <SearchBar className="w-full min-w-0 max-w-none" />

          <div className="flex shrink-0 items-center gap-1 lg:gap-2">
            <NavbarActions />
            <CartMini variant="premium" />
            <UserMenu variant="premium" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const NavbarMainBar = memo(NavbarMainBarInner);
