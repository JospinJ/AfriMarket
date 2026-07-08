"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Headphones, Store, Truck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { NAV_CURRENCIES } from "@/lib/constants/nav";
import { ROUTES } from "@/lib/constants/routes";
import { LocationSelector } from "@/components/navbar/LocationSelector";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocaleStore, type CurrencyCode } from "@/store/useLocaleStore";

interface NavbarTopBarProps {
  collapsed?: boolean;
}

const PROMO_KEYS = [
  "nav.promo.express",
  "nav.promo.flash",
  "nav.promo.premium",
  "nav.promo.import",
] as const;

function NavbarTopBarInner({ collapsed = false }: NavbarTopBarProps) {
  const [promoIndex, setPromoIndex] = useState(0);
  const currency = useLocaleStore((s) => s.currency);
  const setCurrency = useLocaleStore((s) => s.setCurrency);
  const { t } = useTranslation();

  const promoMessages = useMemo(() => PROMO_KEYS.map((key) => t(key)), [t]);

  useEffect(() => {
    const id = setInterval(() => {
      setPromoIndex((i) => (i + 1) % promoMessages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [promoMessages.length]);

  return (
    <div
      className={cn(
        "overflow-hidden border-b border-white/8 bg-night text-white transition-all duration-300",
        collapsed ? "max-h-0 border-transparent opacity-0" : "max-h-10 opacity-100",
      )}
      aria-hidden={collapsed}
    >
      <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between gap-3 px-3 text-xs sm:px-4 lg:px-6">
        <div className="hidden min-w-0 items-center gap-3 md:flex">
          <LocationSelector variant="dark" className="shrink-0" />
          <span className="hidden h-4 w-px bg-white/15 lg:inline" aria-hidden />
          <LanguageSelector variant="dark" className="hidden lg:flex" />
          <label className="hidden items-center gap-1 text-white/70 xl:flex">
            <span className="sr-only">{t("nav.currency")}</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="cursor-pointer bg-transparent text-xs font-medium text-white focus:outline-none"
              aria-label={t("nav.chooseCurrency")}
            >
              {NAV_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="text-night">
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p
          className="min-w-0 flex-1 truncate text-center text-[11px] font-medium text-primary sm:text-xs md:text-left"
          aria-live="polite"
        >
          {promoMessages[promoIndex]}
        </p>

        <div className="flex shrink-0 items-center gap-2 sm:hidden">
          <Link
            href={ROUTES.help}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/10 hover:text-primary"
            aria-label={t("nav.help")}
          >
            <Headphones className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={ROUTES.becomeSeller}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/10 hover:text-primary"
            aria-label={t("nav.sell")}
          >
            <Store className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex sm:gap-3">
          <Link
            href={ROUTES.help}
            className="hidden items-center gap-1 text-white/75 transition-colors hover:text-primary sm:flex"
          >
            <Headphones className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden lg:inline">{t("nav.help")}</span>
          </Link>
          <Link
            href={ROUTES.becomeSeller}
            className="hidden items-center gap-1 text-white/75 transition-colors hover:text-primary md:flex"
          >
            <Store className="h-3.5 w-3.5" aria-hidden />
            {t("nav.sell")}
          </Link>
          <Link
            href={ROUTES.becomeDriver}
            className="hidden items-center gap-1 text-white/75 transition-colors hover:text-primary lg:flex"
          >
            <Truck className="h-3.5 w-3.5" aria-hidden />
            {t("nav.deliver")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const NavbarTopBar = memo(NavbarTopBarInner);
