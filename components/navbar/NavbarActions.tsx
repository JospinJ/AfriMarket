"use client";

import { memo } from "react";
import { Heart, Package, Scale } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { ROUTES } from "@/lib/constants/routes";
import { NavbarIconAction } from "@/components/navbar/NavbarIconAction";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";

interface NavbarActionsProps {
  className?: string;
}

function NavbarActionsInner({ className }: NavbarActionsProps) {
  const mounted = useMounted();
  const { t } = useTranslation();
  const favoritesCount = useFavoritesStore((s) => s.ids.length);
  const displayFavorites = mounted ? favoritesCount : 0;

  return (
    <div className={cn("flex shrink-0 items-center gap-0.5 sm:gap-1", className)}>
      <NavbarIconAction
        href={`${ROUTES.buyer}/orders`}
        label={t("nav.orders")}
        subLabel={t("common.hello")}
        showLabel
        className="hidden 2xl:flex"
      >
        <Package className="h-5 w-5" aria-hidden />
      </NavbarIconAction>

      <NavbarIconAction
        href={ROUTES.favorites}
        label={
          displayFavorites > 0
            ? `${t("nav.favorites")}, ${t("nav.favoritesCount", { count: displayFavorites })}`
            : t("nav.favorites")
        }
        badge={displayFavorites}
        badgeTone="terracotta"
        className="hidden sm:flex"
      >
        <Heart
          className={cn("h-5 w-5", displayFavorites > 0 && "fill-terracotta text-terracotta")}
          aria-hidden
        />
      </NavbarIconAction>

      <NavbarIconAction
        href={ROUTES.compare}
        label={t("nav.compare")}
        className="hidden 2xl:flex"
      >
        <Scale className="h-5 w-5" aria-hidden />
      </NavbarIconAction>

      <NotificationBell className="hidden lg:flex" />

      <LanguageSelector variant="dark" className="hidden xl:flex" />
    </div>
  );
}

export const NavbarActions = memo(NavbarActionsInner);
