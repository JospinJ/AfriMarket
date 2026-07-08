import { create } from "zustand";

interface UiState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  quickViewSlug: string | null;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  quickViewSlug: null,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  openQuickView: (slug) => set({ quickViewSlug: slug }),
  closeQuickView: () => set({ quickViewSlug: null }),
}));
