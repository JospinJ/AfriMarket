"use client";

import type { Address, CountryCode } from "@/types/common";

interface AddressFormProps {
  address: Partial<Address>;
  onChange: (address: Partial<Address>) => void;
  errors?: string[];
}

const COUNTRIES: { code: CountryCode; label: string }[] = [
  { code: "CM", label: "Cameroun" },
  { code: "CI", label: "Côte d'Ivoire" },
  { code: "SN", label: "Sénégal" },
];

export function AddressForm({ address, onChange, errors }: AddressFormProps) {
  const update = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
            Nom complet
          </label>
          <input
            id="fullName"
            type="text"
            value={address.fullName ?? ""}
            onChange={(e) => update("fullName", e.target.value)}
            className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={address.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="6XX XXX XXX"
            className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="mb-1 block text-sm font-medium">
            Pays
          </label>
          <select
            id="country"
            value={address.country ?? "CM"}
            onChange={(e) => update("country", e.target.value)}
            className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium">
            Ville
          </label>
          <input
            id="city"
            type="text"
            value={address.city ?? ""}
            onChange={(e) => update("city", e.target.value)}
            className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="district" className="mb-1 block text-sm font-medium">
          Quartier
        </label>
        <input
          id="district"
          type="text"
          value={address.district ?? ""}
          onChange={(e) => update("district", e.target.value)}
          className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="landmark" className="mb-1 block text-sm font-medium">
          Repère (optionnel)
        </label>
        <input
          id="landmark"
          type="text"
          value={address.landmark ?? ""}
          onChange={(e) => update("landmark", e.target.value)}
          placeholder="Maison verte, portail rouge..."
          className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="instructions" className="mb-1 block text-sm font-medium">
          Instructions livraison
        </label>
        <textarea
          id="instructions"
          value={address.instructions ?? ""}
          onChange={(e) => update("instructions", e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
        />
      </div>
      {errors && errors.length > 0 && (
        <ul className="space-y-1 text-sm text-terracotta">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
