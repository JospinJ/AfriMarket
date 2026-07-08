import type { Locale } from "@/types/locale";
import type { TranslationDictionary } from "@/lib/i18n/translate";
import { enDictionary } from "@/lib/i18n/dictionaries/en";
import { frDictionary } from "@/lib/i18n/dictionaries/fr";

const dictionaries: Record<Locale, TranslationDictionary> = {
  fr: frDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale): TranslationDictionary {
  return dictionaries[locale] ?? frDictionary;
}

export { frDictionary, enDictionary };
