"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";

/** Synchronise `document.documentElement.lang` et détecte la langue navigateur à la 1ère visite. */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale);
  const initFromBrowser = useLocaleStore((s) => s.initFromBrowser);

  useEffect(() => {
    initFromBrowser();
  }, [initFromBrowser]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
