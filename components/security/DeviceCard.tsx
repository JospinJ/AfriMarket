"use client";

import { Smartphone, Monitor, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Device } from "@/types/security";

const ICONS = {
  mobile: Smartphone,
  desktop: Monitor,
  tablet: Tablet,
};

export interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
  const Icon = ICONS[device.type];

  const handleRevoke = () => {
    // TODO API: DELETE /security/devices/:id → { success }
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-sand/20 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-light">
          <Icon className="h-5 w-5 text-green-deep" aria-hidden />
        </div>
        <div>
          <p className="text-sm font-medium text-night">
            {device.os} — {device.browser}
          </p>
          <p className="text-xs text-sand">
            {device.location ?? "Localisation inconnue"} · {device.ip}
          </p>
          <p className="text-xs text-sand">
            Dernière activité : {new Date(device.lastActiveAt).toLocaleString("fr-FR")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {device.trusted && (
          <span className="rounded bg-green-deep/10 px-2 py-0.5 text-xs text-green-deep">Approuvé</span>
        )}
        {!device.trusted && (
          <Button variant="outline" size="sm" onClick={handleRevoke}>
            Révoquer
          </Button>
        )}
      </div>
    </div>
  );
}
