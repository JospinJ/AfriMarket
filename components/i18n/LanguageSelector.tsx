"use client";

import { memo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useTranslation } from "@/hooks/useTranslation";
import type { Locale } from "@/types/locale";
import { LOCALE_FLAGS, LOCALE_LABELS, LOCALES } from "@/types/locale";

interface LanguageSelectorProps {
  variant?: "dark" | "light";
  className?: string;
  showFlag?: boolean;
}

function LanguageSelectorInner({
  variant = "dark",
  className,
  showFlag = true,
}: LanguageSelectorProps) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const { t } = useTranslation();

  return (
    <label
      className={cn(
        "inline-flex items-center gap-1",
        variant === "dark" ? "text-white/70" : "text-night",
        className,
      )}
    >
      <span className="sr-only">{t("nav.chooseLanguage")}</span>
      {showFlag && (
        <span className="text-sm" aria-hidden>
          {LOCALE_FLAGS[locale]}
        </span>
      )}
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className={cn(
          "cursor-pointer bg-transparent text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          variant === "dark" ? "text-white" : "text-night",
        )}
        aria-label={t("nav.chooseLanguage")}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code} className="text-night">
            {LOCALE_FLAGS[code]} {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
      <ChevronDown className="h-3 w-3 opacity-60" aria-hidden />
    </label>
  );
}

export const LanguageSelector = memo(LanguageSelectorInner);
