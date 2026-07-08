export type Locale = "fr" | "en";

export const LOCALES: readonly Locale[] = ["fr", "en"] as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
};
