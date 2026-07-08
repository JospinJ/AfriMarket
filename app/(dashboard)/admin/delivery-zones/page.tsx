import { ZoneMap } from "@/components/delivery/ZoneMap";
import { CityTable } from "@/components/delivery/CityTable";
import { mockDeliveryZones } from "@/lib/mocks/delivery-zones";

export default function DeliveryZonesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-night">Zones de livraison</h1>
        <p className="mt-1 text-sm text-sand">Couverture logistique par ville et pays</p>
      </header>
      <ZoneMap zones={mockDeliveryZones} />
      <CityTable zones={mockDeliveryZones} />
      {/* TODO API: GET /admin/delivery-zones → DeliveryZone[] */}
    </div>
  );
}
