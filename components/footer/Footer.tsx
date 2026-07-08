"use client";

import { ROUTES } from "@/lib/constants/routes";
import {
  FOOTER_BUY_LINKS,
  FOOTER_NAV_GROUPS,
  FOOTER_SELL_LINKS,
  FOOTER_SUPPORT_LINKS,
} from "@/lib/constants/footer-nav";
import { FooterBrandColumn } from "@/components/footer/FooterBrandColumn";
import { FooterBottomBar } from "@/components/footer/FooterBottomBar";
import { FooterCtaGrid } from "@/components/footer/FooterCtaGrid";
import {
  FooterNavAccordionSection,
  FooterNavColumn,
} from "@/components/footer/FooterNavColumn";
import { FooterPaymentsBand } from "@/components/footer/FooterPaymentsBand";
import { FooterPaymentsColumn } from "@/components/footer/FooterPaymentsColumn";
import { FooterTrustStrip } from "@/components/footer/FooterTrustStrip";
import { AppDownloadBlock } from "@/components/footer/AppDownloadBlock";
import { NewsletterForm } from "@/components/footer/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      {/* Motif discret + dégradé premium */}
      <div className="pointer-events-none absolute inset-0 bg-motif-kuba opacity-[0.07]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-green-deep/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        {/* CTA business — vendeur, livreur, premium */}
        <FooterCtaGrid />

        {/* Bandeau confiance */}
        <div className="mt-10 lg:mt-12">
          <FooterTrustStrip />
        </div>

        {/* Paiements — section hero */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 lg:mt-12 lg:p-8">
          <FooterPaymentsBand />
        </div>

        {/* Navigation — desktop 5 colonnes */}
        <div className="mt-12 hidden gap-8 xl:grid xl:grid-cols-5 xl:gap-10">
          <FooterBrandColumn />
          <FooterNavColumn title="Acheter" links={FOOTER_BUY_LINKS} />
          <FooterNavColumn title="Vendre" links={FOOTER_SELL_LINKS} />
          <FooterNavColumn title="Support" links={FOOTER_SUPPORT_LINKS} />
          <FooterPaymentsColumn />
        </div>

        {/* Navigation — mobile / tablette accordéons */}
        <div className="mt-10 xl:hidden">
          <FooterBrandColumn className="mb-6 border-b border-white/10 pb-8" />
          {FOOTER_NAV_GROUPS.map((group, index) => (
            <FooterNavAccordionSection
              key={group.id}
              title={group.title}
              links={group.links}
              defaultOpen={index === 0}
            />
          ))}
          <FooterNavAccordionSection
            title="Paiements acceptés"
            links={[
              { label: "Orange Money · MTN · Moov", href: ROUTES.checkout },
              { label: "Visa · Mastercard · Amex", href: ROUTES.checkout },
              { label: "UBA · Ecobank · SG · Afriland", href: ROUTES.checkout },
            ]}
          />
          <div className="mt-6 space-y-6 border-t border-white/10 pt-6 lg:hidden">
            <NewsletterForm />
            <AppDownloadBlock />
          </div>
        </div>

        {/* Barre légale */}
        <div className="mt-12 lg:mt-14">
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  );
}
