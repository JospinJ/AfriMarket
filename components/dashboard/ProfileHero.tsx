"use client";

import { MapPin, Phone, Calendar, BadgeCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/hooks/useRole";
import { mockUsers } from "@/lib/mocks/sellers";
import { COUNTRIES } from "@/lib/constants/countries";
import { ROUTES } from "@/lib/constants/routes";

const ROLE_LABELS = {
  buyer: "Acheteur",
  seller: "Vendeur",
  driver: "Livreur",
  admin: "Administrateur",
} as const;

const TIER_LABELS = {
  basic: "Basic",
  gold: "Gold",
  elite: "Elite",
} as const;

export function ProfileHero() {
  const { role, tier, userId, isSupport } = useRole();
  const user = mockUsers.find((u) => u.id === userId);

  if (!user) return null;

  const country = COUNTRIES.find((c) => c.code === user.country);
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const memberSince = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="overflow-hidden rounded-lg border border-dash-border bg-white shadow-sm">
      <div className="h-1 bg-dash-accent" aria-hidden />
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-dash-accent text-xl font-bold text-night sm:h-[72px] sm:w-[72px] sm:text-2xl"
            aria-hidden
          >
            {user.firstName.charAt(0)}
            {user.lastName?.charAt(0) ?? ""}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-sand">
              Bienvenue
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-bold text-night sm:text-2xl">
                {displayName}
              </h1>
              {user.kycStatus === "verified" && (
                <span className="inline-flex items-center gap-1 rounded bg-brand-green-muted px-2 py-0.5 text-xs font-medium text-secondary">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                  Vérifié
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded border border-dash-border bg-dash-bg px-2.5 py-0.5 text-xs font-medium text-night">
                {ROLE_LABELS[role]}
              </span>
              {role === "seller" && tier && (
                <span className="rounded border border-primary/40 bg-brand-orange-muted px-2.5 py-0.5 text-xs font-semibold text-brand-orange-dark">
                  {TIER_LABELS[tier]}
                </span>
              )}
              {isSupport && (
                <span className="rounded border border-terracotta/30 bg-terracotta/10 px-2.5 py-0.5 text-xs font-medium text-terracotta">
                  Support
                </span>
              )}
            </div>

            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-sand sm:flex-row sm:flex-wrap sm:gap-x-4">
              <li className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                +237 {user.phone}
              </li>
              {user.city && (
                <li className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {user.city}, {country?.name ?? user.country}
                </li>
              )}
              <li className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Depuis {memberSince}
              </li>
            </ul>
          </div>
        </div>

        <Link
          href={ROUTES.settings}
          className="inline-flex shrink-0 items-center gap-1 self-start rounded-md border border-dash-border bg-dash-bg px-4 py-2 text-sm font-medium text-night transition-colors hover:border-dash-accent hover:text-[#c45500] sm:self-center"
        >
          Gérer le compte
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
