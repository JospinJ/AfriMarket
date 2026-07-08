export type Money = number;
export type ISODate = string;
export type UUID = string;

export type CountryCode = "CM" | "NG" | "CI" | "SN" | "GH" | "KE" | "DZ" | "MA";
export type Currency = "FCFA";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Address {
  id: UUID;
  fullName: string;
  phone: string;
  country: CountryCode;
  city: string;
  district: string;
  street?: string;
  landmark?: string;
  geo?: GeoPoint;
  instructions?: string;
}
