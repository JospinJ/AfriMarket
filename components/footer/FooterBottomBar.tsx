"use client";

import Link from "next/link";
import { COUNTRIES } from "@/lib/constants/countries";
import { ROUTES } from "@/lib/constants/routes";

export function FooterBottomBar() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/55 lg:justify-start">
          <span>© {year} AfriMarket Hub — Cameroun & Afrique centrale</span>
          <Link href={ROUTES.legalTerms} className="transition-colors hover:text-gold">
            CGU
          </Link>
          <Link href={ROUTES.legalPrivacy} className="transition-colors hover:text-gold">
            Confidentialité
          </Link>
          <Link href={ROUTES.legal} className="transition-colors hover:text-gold">
            Mentions légales
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
          <span className="mr-1 text-xs text-white/45">Disponible au :</span>
          {COUNTRIES.slice(0, 5).map((country) => (
            <button
              key={country.code}
              type="button"
              className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2 text-sm transition-colors hover:border-gold/30 hover:bg-white/10"
              aria-label={country.name}
              title={country.name}
            >
              {country.flag}
            </button>
          ))}
          <button
            type="button"
            className="flex h-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2 text-xs text-white/70 transition-colors hover:border-gold/30"
            aria-label="Autres pays"
          >
            + Afrique
          </button>
        </div>
      </div>
    </div>
  );
}
