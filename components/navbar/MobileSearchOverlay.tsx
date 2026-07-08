"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { SearchBar } from "@/components/navbar/SearchBar";

export function MobileSearchOverlay() {
  const searchOpen = useUiStore((s) => s.searchOpen);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-night/70 backdrop-blur-sm md:hidden"
            onClick={() => setSearchOpen(false)}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-[61] border-b border-white/10 bg-night p-4 shadow-premium-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Recherche produits"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Rechercher</p>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
                aria-label="Fermer la recherche"
              >
                <X size={20} />
              </button>
            </div>
            <SearchBar expanded onNavigate={() => setSearchOpen(false)} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
