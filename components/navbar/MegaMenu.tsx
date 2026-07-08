"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Car,
  ChevronRight,
  Grid3X3,
  Hammer,
  Headphones,
  Laptop,
  Lamp,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sofa,
  Sprout,
  Tablet,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants/categories";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  electronics: Smartphone,
  fashion: Shirt,
  home: Sofa,
  auto: Car,
  agri: Sprout,
  health: ShoppingBag,
  grocery: UtensilsCrossed,
};

const SUB_ICONS: Record<string, LucideIcon> = {
  phones: Smartphone,
  tablets: Tablet,
  computers: Laptop,
  accessories: Headphones,
  men: Shirt,
  women: ShoppingBag,
  kids: Baby,
  kitchen: UtensilsCrossed,
  living: Sofa,
  decor: Lamp,
  parts: Wrench,
  "auto-acc": Car,
  seeds: Sprout,
  tools: Hammer,
};

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const [activeId, setActiveId] = useState(CATEGORIES[0]?.id ?? "");

  const activeCategory = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const ActiveIcon = activeCategory ? CATEGORY_ICONS[activeCategory.id] ?? Grid3X3 : Grid3X3;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-night/40 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            id="categories-mega-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu des catégories"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-[46] border-t border-sand/20 bg-white shadow-premium-xl"
          >
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
              <div className="overflow-hidden rounded-2xl border border-sand/15 bg-ivory shadow-premium-sm">
                <div className="flex min-h-[340px] max-h-[min(72vh,520px)]">
                  {/* Rail catégories principales */}
                  <nav
                    className="flex w-[220px] shrink-0 flex-col overflow-y-auto border-r border-sand/15 bg-white py-2"
                    aria-label="Catégories principales"
                  >
                    {CATEGORIES.map((category) => {
                      const Icon = CATEGORY_ICONS[category.id] ?? Grid3X3;
                      const isActive = category.id === activeId;
                      return (
                        <Link
                          key={category.id}
                          href={ROUTES.category(category.slug)}
                          onClick={onClose}
                          onMouseEnter={() => setActiveId(category.id)}
                          onFocus={() => setActiveId(category.id)}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm transition-colors",
                            isActive
                              ? "border-l-[3px] border-primary bg-brand-orange-muted/70 font-semibold text-night"
                              : "border-l-[3px] border-transparent text-night/80 hover:bg-surface-light",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0",
                              isActive ? "text-primary" : "text-sand",
                            )}
                            aria-hidden
                          />
                          <span className="flex-1">{category.name}</span>
                          {isActive && (
                            <ChevronRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                          )}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Panneau sous-catégories */}
                  {activeCategory && (
                    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                      <div className="flex items-center justify-between gap-4 border-b border-sand/10 bg-white px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                            <ActiveIcon className="h-5 w-5" aria-hidden />
                          </span>
                          <div>
                            <h2 className="font-display text-lg font-bold text-night">
                              {activeCategory.name}
                            </h2>
                            <p className="text-xs text-sand">
                              {(activeCategory.children ?? []).length} sous-catégories
                            </p>
                          </div>
                        </div>
                        <Link
                          href={ROUTES.category(activeCategory.slug)}
                          onClick={onClose}
                          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary-hover"
                        >
                          Tout voir
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6">
                        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {(activeCategory.children ?? []).map((child) => {
                            const SubIcon = SUB_ICONS[child.id];
                            return (
                              <li key={child.id}>
                                <Link
                                  href={ROUTES.category(child.slug)}
                                  onClick={onClose}
                                  className="group flex items-center gap-3 rounded-xl border border-transparent bg-white px-4 py-3.5 shadow-premium-sm transition-all hover:border-primary/30 hover:shadow-glow-orange"
                                >
                                  {SubIcon && (
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-light text-secondary group-hover:bg-brand-green-muted">
                                      <SubIcon className="h-4 w-4" aria-hidden />
                                    </span>
                                  )}
                                  <span className="text-sm font-medium text-night group-hover:text-primary">
                                    {child.name}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
                <p className="text-xs text-sand">
                  Express · Import · Gros sur chaque produit
                </p>
                <Link
                  href={ROUTES.categories}
                  onClick={onClose}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Explorer toutes les catégories →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
