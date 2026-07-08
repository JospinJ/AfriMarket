import type { CountryCode, GeoPoint, ISODate, Money, UUID } from "./common";
import type { OrderStatus } from "./order";

export interface Driver {
  id: UUID;
  userId: UUID;
  name: string;
  photoUrl?: string;
  vehicle: "moto" | "velo" | "voiture";
  rating: { average: number; count: number };
  onTimeRatePct?: number;
}

export interface TrackingStep {
  key: OrderStatus;
  label: string;
  done: boolean;
  at?: ISODate;
}

export interface DeliveryTracking {
  orderId: UUID;
  steps: TrackingStep[];
  driver?: Driver;
  driverPosition?: GeoPoint;
  etaMinutes?: number;
  otpCode?: string;
}

export interface DeliveryZone {
  id: UUID;
  country: CountryCode;
  city: string;
  status: "covered" | "partial" | "uncovered";
  etaDays: [number, number];
  baseFee: Money;
  types: ("standard" | "express" | "same_day" | "pickup_point")[];
  active: boolean;
}
