"use client";

interface CardFormProps {
  onValidChange?: (valid: boolean) => void;
}

export function CardForm({ onValidChange }: CardFormProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-sand">
        Paiement sécurisé — aucune donnée réelle transmise (mock)
      </p>
      <div>
        <label htmlFor="cardNumber" className="mb-1 block text-sm font-medium">
          Numéro de carte
        </label>
        <input
          id="cardNumber"
          type="text"
          placeholder="4242 4242 4242 4242"
          maxLength={19}
          onChange={(e) => onValidChange?.(e.target.value.replace(/\s/g, "").length >= 16)}
          className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiry" className="mb-1 block text-sm font-medium">
            Expiration
          </label>
          <input
            id="expiry"
            type="text"
            placeholder="MM/AA"
            maxLength={5}
            className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="cvv" className="mb-1 block text-sm font-medium">
            CVV
          </label>
          <input
            id="cvv"
            type="text"
            placeholder="123"
            maxLength={4}
            className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="holder" className="mb-1 block text-sm font-medium">
          Titulaire
        </label>
        <input
          id="holder"
          type="text"
          placeholder="Nom sur la carte"
          className="w-full rounded-lg border border-sand/30 px-4 py-3 focus:border-green-deep focus:outline-none"
        />
      </div>
    </div>
  );
}
