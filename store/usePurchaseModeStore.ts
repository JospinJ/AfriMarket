import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PurchaseMode } from "@/types/product";

interface PurchaseModeState {
  modes: Record<string, PurchaseMode>;
  setMode: (productId: string, mode: PurchaseMode) => void;
  getMode: (productId: string) => PurchaseMode;
}

export const usePurchaseModeStore = create<PurchaseModeState>()(
  persist(
    (set, get) => ({
      modes: {},
      setMode: (productId, mode) =>
        set((state) => ({
          modes: { ...state.modes, [productId]: mode },
        })),
      getMode: (productId) => get().modes[productId] ?? "express",
    }),
    { name: "afrimarket-purchase-mode" }
  )
);
