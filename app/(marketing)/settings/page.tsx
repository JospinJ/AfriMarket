"use client";

import Link from "next/link";
import { Bell, Globe, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/hooks/useRole";
import { ROUTES } from "@/lib/constants/routes";

const SETTINGS_SECTIONS = [
  {
    id: "notifications",
    title: "Notifications",
    description: "WhatsApp, SMS et alertes commandes",
    icon: Bell,
  },
  {
    id: "language",
    title: "Langue",
    description: "Français (par défaut)",
    icon: Globe,
  },
  {
    id: "security",
    title: "Sécurité",
    description: "2FA, appareils et score de confiance",
    icon: Shield,
  },
  {
    id: "mobile",
    title: "Application mobile",
    description: "Bientôt disponible",
    icon: Smartphone,
  },
];

export default function SettingsPage() {
  const { role } = useRole();
  const securityHref = `/${role}/security`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-night">Paramètres</h1>
        <p className="mt-2 text-sand">Personnalisez votre expérience AfriMarket Hub.</p>
      </header>

      <div className="space-y-3">
        {SETTINGS_SECTIONS.map((section) => {
          const isSecurity = section.id === "security";
          const content = (
            <div className="flex items-center gap-4 rounded-xl border border-sand/15 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-deep/10 text-green-deep">
                <section.icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-night">{section.title}</p>
                <p className="text-sm text-sand">{section.description}</p>
              </div>
              {isSecurity && (
                <span className="text-sm font-medium text-green-deep">Configurer →</span>
              )}
            </div>
          );

          if (isSecurity) {
            return (
              <Link key={section.id} href={securityHref}>
                {content}
              </Link>
            );
          }

          return <div key={section.id}>{content}</div>;
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href={ROUTES.home}>Retour à l&apos;accueil</Link>
        </Button>
      </div>
      {/* TODO API: PATCH /user/settings → { notifications, language } */}
    </div>
  );
}
