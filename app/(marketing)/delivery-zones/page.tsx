import Link from "next/link";
import { InfoPage } from "@/components/marketing/InfoPage";
import { ROUTES } from "@/lib/constants/routes";
import { mockDeliveryZones } from "@/lib/mocks/delivery-zones";
import { formatFCFA } from "@/lib/utils/format-fcfa";

export const metadata = { title: "Zones de livraison — AfriMarket Hub" };

export default function PublicDeliveryZonesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-night">Zones de livraison</h1>
      <p className="mt-4 text-lg text-sand">
        Frais et délais selon votre ville au Cameroun.
      </p>
      <ul className="mt-8 space-y-3">
        {mockDeliveryZones.filter((z) => z.active).map((zone) => (
          <li
            key={zone.id}
            className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm"
          >
            <div>
              <p className="font-medium text-night">{zone.city}</p>
              <p className="text-sm capitalize text-sand">{zone.status}</p>
              <p className="text-sm text-sand">
                {zone.etaDays[0]}–{zone.etaDays[1]} jours
              </p>
            </div>
            <p className="font-semibold text-green-deep">{formatFCFA(zone.baseFee)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href={ROUTES.help} className="text-green-deep hover:underline">
          ← Retour à l&apos;aide
        </Link>
      </div>
    </div>
  );
}
