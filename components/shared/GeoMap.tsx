import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { GeoPoint } from "@/types/common";

export interface GeoMapProps {
  center?: GeoPoint;
  markers?: { id: string; position: GeoPoint; label?: string }[];
  className?: string;
  height?: string;
}

export function GeoMap({
  center = { lat: 4.0511, lng: 9.7679 },
  markers = [],
  className,
  height = "h-64",
}: GeoMapProps) {
  // TODO API: intégrer carte GPS (Mapbox/Google) avec fallback SMS tracking
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-sand/20 bg-night/5",
        height,
        className
      )}
      role="img"
      aria-label={`Carte centrée sur ${center.lat}, ${center.lng}`}
    >
      <div className="absolute inset-0 bg-motif-wax opacity-50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sand">
        <MapPin className="h-8 w-8 text-green-deep" aria-hidden />
        <p className="text-sm font-medium text-night">Carte GPS (placeholder)</p>
        <p className="text-xs">
          {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
        </p>
        {markers.length > 0 && (
          <p className="text-xs text-sand">{markers.length} point(s) affiché(s)</p>
        )}
      </div>
    </div>
  );
}
