import type { CountryCode } from "@/types/common";

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  currency: "FCFA";
}

export const COUNTRIES: CountryInfo[] = [
  { code: "CM", name: "Cameroun", flag: "🇨🇲", currency: "FCFA" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "FCFA" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", currency: "FCFA" },
  { code: "SN", name: "Sénégal", flag: "🇸🇳", currency: "FCFA" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "FCFA" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "FCFA" },
  { code: "DZ", name: "Algérie", flag: "🇩🇿", currency: "FCFA" },
  { code: "MA", name: "Maroc", flag: "🇲🇦", currency: "FCFA" },
];

export const DEFAULT_COUNTRY: CountryCode = "CM";
