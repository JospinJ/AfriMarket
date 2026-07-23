"use client";

import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/lib/constants/countries";

const REGIONS: Record<string, string[]> = {
  CM: ["Centre", "Littoral", "Ouest", "Nord", "Sud"],
};

const CITIES: Record<string, string[]> = {
  Centre: ["Yaoundé", "Mbalmayo"],
  Littoral: ["Douala", "Edéa"],
  Ouest: ["Bafoussam", "Dschang"],
};

interface LocationSelectorProps {
  className?: string;
  variant?: "light" | "dark";
}

export function LocationSelector({ className, variant = "light" }: LocationSelectorProps) {
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [region, setRegion] = useState("Centre");
  const [city, setCity] = useState("Yaoundé");
  const [open, setOpen] = useState(false);

  const countryInfo = COUNTRIES.find((c) => c.code === country);
  const regions = REGIONS[country] ?? [];
  const cities = CITIES[region] ?? [];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex min-h-9 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium transition-colors",
          variant === "dark"
            ? "text-white/80 hover:bg-white/10 hover:text-white"
            : "text-night hover:bg-surface-light",
          className,
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <MapPin
          size={14}
          className={cn("shrink-0", variant === "dark" ? "text-primary" : "text-green-deep")}
          aria-hidden
        />
        <span className="hidden max-w-[140px] truncate sm:inline">
          <span className={variant === "dark" ? "text-white/50" : "text-sand"}>Livrer à </span>
          {city}
        </span>
        <span className="sm:hidden">{countryInfo?.flag}</span>
        <ChevronDown size={12} className="opacity-60" aria-hidden />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute left-0 right-0 top-full z-50 mt-1 w-full max-w-xs rounded-lg border border-sand/20 bg-white p-3 shadow-lg sm:right-auto sm:w-64">
            <p className="mb-2 text-xs font-medium text-sand">Localisation</p>
            {/* TODO API: localisation utilisateur (pays/région/ville) */}
            <label className="mb-2 block text-xs text-night">
              Pays
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as typeof country)}
                className="mt-1 w-full rounded border border-sand/30 px-2 py-1.5 text-sm"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="mb-2 block text-xs text-night">
              Région
              <select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  const firstCity = CITIES[e.target.value]?.[0];
                  if (firstCity) setCity(firstCity);
                }}
                className="mt-1 w-full rounded border border-sand/30 px-2 py-1.5 text-sm"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-night">
              Ville
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 w-full rounded border border-sand/30 px-2 py-1.5 text-sm"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </>
      )}
    </div>
  );
}
