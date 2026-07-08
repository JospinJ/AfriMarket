import type { CountryCode } from "@/types/common";
import type { MobileMoneyOperator } from "@/types/payment";

export const OPERATORS_BY_COUNTRY: Record<CountryCode, MobileMoneyOperator[]> = {
  CM: ["mtn", "orange"],
  NG: ["mtn", "airtel"],
  CI: ["mtn", "orange", "moov", "wave"],
  SN: ["orange", "wave"],
  GH: ["mtn", "airtel"],
  KE: ["airtel"],
  DZ: ["mtn"],
  MA: ["mtn"],
};

export function operatorsForCountry(country: CountryCode): MobileMoneyOperator[] {
  return OPERATORS_BY_COUNTRY[country];
}

export const OPERATOR_LABELS: Record<MobileMoneyOperator, string> = {
  mtn: "MTN Mobile Money",
  orange: "Orange Money",
  moov: "Moov Money",
  airtel: "Airtel Money",
  wave: "Wave",
};
