import { create } from "zustand";

interface FiltersState {
  priceMin?: number;
  priceMax?: number;
  categoryId?: string;
  city?: string;
  premiumOnly: boolean;
  fastDelivery: boolean;
  minRating?: number;
  searchQuery: string;
  setFilter: <K extends keyof Omit<FiltersState, "setFilter" | "resetFilters">>(
    key: K,
    value: FiltersState[K]
  ) => void;
  resetFilters: () => void;
}

const initialState = {
  priceMin: undefined,
  priceMax: undefined,
  categoryId: undefined,
  city: undefined,
  premiumOnly: false,
  fastDelivery: false,
  minRating: undefined,
  searchQuery: "",
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initialState,
  setFilter: (key, value) => set({ [key]: value }),
  resetFilters: () => set(initialState),
}));
