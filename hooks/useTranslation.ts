"use client";

import { useCallback, useMemo } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { useLocaleStore } from "@/store/useLocaleStore";

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);
  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) =>
      translate(dictionary, key, params),
    [dictionary],
  );

  return { t, locale, dictionary };
}
