import type { Locale } from "@/types/locale";

/** Détecte la langue du navigateur lors de la première visite. */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "fr";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("en")) return "en";
  return "fr";
}
