import type { DeliveryZone } from "@/types/delivery";

export const mockDeliveryZones: DeliveryZone[] = [
  {
    id: "zone-cm-dla",
    country: "CM",
    city: "Douala",
    status: "covered",
    etaDays: [1, 2],
    baseFee: 1500,
    types: ["standard", "express", "same_day", "pickup_point"],
    active: true,
  },
  {
    id: "zone-cm-yde",
    country: "CM",
    city: "Yaoundé",
    status: "covered",
    etaDays: [1, 3],
    baseFee: 1500,
    types: ["standard", "express", "same_day"],
    active: true,
  },
  {
    id: "zone-cm-baf",
    country: "CM",
    city: "Bafoussam",
    status: "partial",
    etaDays: [2, 4],
    baseFee: 2500,
    types: ["standard", "express"],
    active: true,
  },
  {
    id: "zone-cm-gar",
    country: "CM",
    city: "Garoua",
    status: "partial",
    etaDays: [4, 7],
    baseFee: 5000,
    types: ["standard"],
    active: true,
  },
  {
    id: "zone-ci-abj",
    country: "CI",
    city: "Abidjan",
    status: "covered",
    etaDays: [2, 4],
    baseFee: 3000,
    types: ["standard", "express"],
    active: true,
  },
];

export function getZoneByCity(
  country: string,
  city: string
): DeliveryZone | undefined {
  return mockDeliveryZones.find(
    (z) => z.country === country && z.city.toLowerCase() === city.toLowerCase() && z.active
  );
}

export function validateDeliveryZone(
  country: string,
  city: string
): { valid: boolean; zone?: DeliveryZone; message?: string } {
  const zone = getZoneByCity(country, city);
  if (!zone) {
    return { valid: false, message: "Zone de livraison non couverte" };
  }
  if (zone.status === "uncovered") {
    return { valid: false, message: "Livraison indisponible dans cette zone" };
  }
  return { valid: true, zone };
}
