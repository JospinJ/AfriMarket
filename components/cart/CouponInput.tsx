"use client";

import { useState } from "react";
import { validateCoupon } from "@/services/checkout";
import { useCartStore } from "@/store/useCartStore";

export function CouponInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const setCoupon = useCartStore((s) => s.setCoupon);
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setMessage(null);
    try {
      const result = await validateCoupon(code, getSubtotal());
      if (result.valid) {
        setCoupon(code.toUpperCase());
        setMessage({ type: "success", text: `Réduction appliquée : -${result.discount} FCFA` });
      } else {
        setCoupon(undefined);
        setMessage({ type: "error", text: result.message ?? "Code invalide" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="coupon" className="text-sm font-medium text-night">
        Code promo
      </label>
      <div className="flex gap-2">
        <input
          id="coupon"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ex: AFRICA10"
          className="flex-1 rounded-lg border border-sand/30 px-3 py-2 text-sm focus:border-green-deep focus:outline-none"
        />
        <button
          type="button"
          disabled={loading}
          onClick={handleApply}
          className="rounded-lg bg-night px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "..." : "Appliquer"}
        </button>
      </div>
      {message && (
        <p
          className={`text-sm ${message.type === "success" ? "text-green-deep" : "text-terracotta"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
