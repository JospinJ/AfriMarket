import { GeoMap } from "@/components/shared/GeoMap";
import type { DeliveryZone } from "@/types/delivery";

export interface ZoneMapProps {
  zones: DeliveryZone[];
}

export function ZoneMap({ zones }: ZoneMapProps) {
  const markers = zones.map((z) => ({
    id: z.id,
    position: { lat: 4.0 + Math.random() * 2, lng: 9.0 + Math.random() * 3 },
    label: z.city,
  }));

  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-night mb-4">Carte des zones</h2>
      <GeoMap center={{ lat: 5.96, lng: 10.15 }} markers={markers} height="h-80" />
      <p className="mt-2 text-xs text-sand">{zones.length} zones configurées</p>
    </section>
  );
}
