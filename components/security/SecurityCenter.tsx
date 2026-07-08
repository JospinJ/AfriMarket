"use client";

import { SecurityScoreGauge } from "@/components/security/SecurityScoreGauge";
import { TwoFactorPanel } from "@/components/security/TwoFactorPanel";
import { DeviceCard } from "@/components/security/DeviceCard";
import { PasswordForm } from "@/components/security/PasswordForm";
import { mockSecurityState } from "@/lib/mocks/security";

export function SecurityCenter() {
  const state = mockSecurityState;

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="font-display text-2xl font-bold text-night">Centre de sécurité</h1>
        <p className="mt-1 text-sm text-sand">Protégez votre compte et vos paiements</p>
      </header>
      <SecurityScoreGauge score={state.score} level={state.level} />
      <TwoFactorPanel enabled={state.twoFA.enabled} method={state.twoFA.method} />
      <PasswordForm />
      <section>
        <h2 className="font-display text-lg font-semibold text-night mb-4">Appareils connectés</h2>
        <div className="space-y-3">
          {state.devices.map((d) => (
            <DeviceCard key={d.id} device={d} />
          ))}
        </div>
      </section>
      {state.alerts.length > 0 && (
        <section>
          <h2 className="font-display text-lg font-semibold text-night mb-4">Alertes récentes</h2>
          <ul className="space-y-2">
            {state.alerts.map((a, i) => (
              <li key={i} className="rounded-lg border border-sand/20 bg-white px-4 py-3 text-sm">
                <span className={a.risk === "critical" ? "text-terracotta" : a.risk === "suspect" ? "text-gold" : "text-night"}>
                  {a.kind}
                </span>
                <span className="ml-2 text-xs text-sand">
                  {new Date(a.at).toLocaleString("fr-FR")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {/* TODO API: GET /security/state → SecurityState */}
    </div>
  );
}
