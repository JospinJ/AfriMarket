"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/constants/routes";
import { useTranslation } from "@/hooks/useTranslation";

interface NavbarSecondaryBarProps {
  megaOpen: boolean;
  onToggleMega: () => void;
}

const SECONDARY_LINKS = [
  { href: ROUTES.products, labelKey: "nav.products", highlight: false },
  { href: ROUTES.flashSales, labelKey: "nav.flashSales", highlight: true },
  { href: ROUTES.topSellers, labelKey: "nav.popular", highlight: false },
  { href: ROUTES.newArrivals, labelKey: "nav.newArrivals", highlight: false },
  { href: ROUTES.premiumStores, labelKey: "nav.premiumSellers", highlight: false },
  { href: `${ROUTES.products}?mode=import`, labelKey: "nav.importExpress", highlight: false },
  { href: ROUTES.premium, labelKey: "nav.promotions", highlight: false },
] as const;

function NavbarSecondaryBarInner({ megaOpen, onToggleMega }: NavbarSecondaryBarProps) {
  const { t } = useTranslation();

  return (
    <div className="hidden border-t border-white/8 bg-[#131921] lg:block">
      <div className="mx-auto flex max-w-[1440px] items-center gap-1 px-4 py-1.5 lg:px-6">
        <button
          type="button"
          onClick={onToggleMega}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
            megaOpen ? "bg-primary text-night" : "text-white hover:bg-white/10",
          )}
          aria-expanded={megaOpen}
          aria-controls="categories-mega-menu"
        >
          <Menu size={16} aria-hidden />
          {t("nav.allCategories")}
        </button>

        <nav
          className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto scrollbar-hide"
          aria-label={t("nav.secondaryNav")}
        >
          {SECONDARY_LINKS.map((link) => (
            <motion.div key={link.href} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={link.href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  link.highlight
                    ? "text-primary hover:bg-primary/10"
                    : "text-white/85 hover:bg-white/10 hover:text-white",
                )}
              >
                {t(link.labelKey)}
              </Link>
            </motion.div>
          ))}
        </nav>

        <Link
          href={ROUTES.premium}
          className="ml-2 hidden shrink-0 items-center gap-1.5 rounded-md bg-gradient-to-r from-primary/20 to-gold/20 px-3 py-2 text-sm font-bold text-primary transition-all hover:from-primary/30 hover:to-gold/30 xl:flex"
        >
          {t("nav.premiumBadge")}
        </Link>
      </div>
    </div>
  );
}

export const NavbarSecondaryBar = memo(NavbarSecondaryBarInner);
