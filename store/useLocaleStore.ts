import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Locale } from "@/types/locale";
import { detectBrowserLocale } from "@/lib/i18n/detect-locale";

export type CurrencyCode = "XAF" | "EUR";

interface LocaleState {
  locale: Locale;
  currency: CurrencyCode;
  /** true après un choix explicite de l'utilisateur */
  userHasChosenLocale: boolean;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode) => void;
  initFromBrowser: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: "fr",
      currency: "XAF",
      userHasChosenLocale: false,
      setLocale: (locale) => set({ locale, userHasChosenLocale: true }),
      setCurrency: (currency) => set({ currency }),
      initFromBrowser: () => {
        if (get().userHasChosenLocale) return;
        set({ locale: detectBrowserLocale() });
      },
    }),
    {
      name: "afrimarket-locale",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        locale: state.locale,
        currency: state.currency,
        userHasChosenLocale: state.userHasChosenLocale,
      }),
    },
  ),
);
