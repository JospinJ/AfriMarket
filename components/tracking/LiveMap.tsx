"use client";

import { MapPin } from "lucide-react";
import type { GeoPoint } from "@/types/common";

interface LiveMapProps {
  driverPosition?: GeoPoint;
  destination?: GeoPoint;
  etaMinutes?: number;
}

export function LiveMap({ driverPosition, destination, etaMinutes }: LiveMapProps) {
  // Placeholder map — TODO API: GET /drivers/:id/position
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-night/5 md:aspect-video">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-deep/10 to-sand/10">
        <MapPin size={48} className="text-green-deep/50" />
        <p className="mt-2 text-sm font-medium text-night">Carte GPS (placeholder)</p>
        {driverPosition && (
          <p className="mt-1 text-xs text-sand">
            Livreur : {driverPosition.lat.toFixed(4)}, {driverPosition.lng.toFixed(4)}
          </p>
        )}
        {etaMinutes && (
          <p className="mt-2 rounded-full bg-green-deep px-4 py-1 text-sm font-semibold text-white">
            Arrivée estimée : {etaMinutes} min
          </p>
        )}
      </div>
      {destination && (
        <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-xs shadow-sm">
          📍 Point de livraison
        </div>
      )}
    </div>
  );
}
