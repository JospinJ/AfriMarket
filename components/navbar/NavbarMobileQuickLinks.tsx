"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/constants/routes";
import { useTranslation } from "@/hooks/useTranslation";

const QUICK_LINKS = [
  { href: ROUTES.products, labelKey: "nav.products", highlight: false },
  { href: ROUTES.flashSales, labelKey: "nav.flashSales", highlight: true },
  { href: ROUTES.topSellers, labelKey: "nav.popular", highlight: false },
  { href: ROUTES.newArrivals, labelKey: "nav.newArrivals", highlight: false },
  { href: ROUTES.premiumStores, labelKey: "nav.premiumSellers", highlight: false },
  { href: `${ROUTES.products}?mode=import`, labelKey: "nav.importExpress", highlight: false },
  { href: ROUTES.premium, labelKey: "nav.promotions", highlight: false },
] as const;

interface NavbarMobileQuickLinksProps {
  className?: string;
}

/** Bandeau horizontal des liens secondaires — visible uniquement sur mobile / tablette. */
export function NavbarMobileQuickLinks({ className }: NavbarMobileQuickLinksProps) {
  const { t } = useTranslation();

  return (
    <nav
      className={cn(
        "mt-2 flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide md:hidden",
        className,
      )}
      aria-label={t("nav.secondaryNav")}
    >
      {QUICK_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
            link.highlight
              ? "bg-primary/15 text-primary"
              : "bg-white/10 text-white/90 hover:bg-white/15",
          )}
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </nav>
  );
}
