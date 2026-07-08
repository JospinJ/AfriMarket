import type { CountryCode } from "@/types/common";

const PHONE_PATTERNS: Record<CountryCode, RegExp> = {
  CM: /^6\d{8}$/,
  NG: /^[789]\d{9}$/,
  CI: /^0[157]\d{8}$/,
  SN: /^7\d{8}$/,
  GH: /^0\d{9}$/,
  KE: /^7\d{8}$/,
  DZ: /^0[567]\d{8}$/,
  MA: /^0[67]\d{8}$/,
};

export function validatePhone(phone: string, country: CountryCode): boolean {
  const cleaned = phone.replace(/[\s\-+]/g, "").replace(/^237/, "");
  return PHONE_PATTERNS[country].test(cleaned);
}
