import Image from "next/image";
import { MessageCircle, Phone, Star } from "lucide-react";
import type { Driver } from "@/types/delivery";

interface DriverCardProps {
  driver: Driver;
}

export function DriverCard({ driver }: DriverCardProps) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    "Bonjour, je suis votre client AfriMarket Hub pour ma livraison en cours."
  )}`;

  const vehicleLabel =
    driver.vehicle === "moto"
      ? "🏍 Moto"
      : driver.vehicle === "velo"
        ? "🚲 Vélo"
        : "🚗 Voiture";

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold text-night">Votre livreur</h3>
      <div className="flex items-center gap-3">
        {driver.photoUrl && (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <Image src={driver.photoUrl} alt={driver.name} fill sizes="56px" className="object-cover" />
          </div>
        )}
        <div className="flex-1">
          <p className="font-medium text-night">{driver.name}</p>
          <p className="text-sm text-sand">{vehicleLabel}</p>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star size={14} className="fill-gold text-gold" />
            <span>{driver.rating.average.toFixed(1)}</span>
            {driver.onTimeRatePct && (
              <span className="text-sand">· {driver.onTimeRatePct}% à l&apos;heure</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#25D366] text-sm font-semibold text-white"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <a
          href={`tel:${driver.name}`}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-sand/30 px-4 text-sm"
          aria-label="Appeler le livreur"
        >
          <Phone size={18} />
        </a>
      </div>
    </div>
  );
}
