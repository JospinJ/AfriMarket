"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { BRAND } from "@/lib/constants/design";
import { FOOTER_SOCIAL_LINKS } from "@/lib/constants/footer-nav";
import { CONTACT, buildMailtoUrl, buildSupportWhatsAppUrl } from "@/lib/constants/contact";
import { NewsletterForm } from "@/components/footer/NewsletterForm";
import { AppDownloadBlock } from "@/components/footer/AppDownloadBlock";
import { cn } from "@/lib/utils/cn";

const SOCIAL_ICON_MAP = {
  whatsapp: MessageCircle,
  facebook: Facebook,
  instagram: Instagram,
  email: Mail,
} as const;

export function FooterBrandColumn({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-5", className)}>
      <BrandLogo heightPx={BRAND.logoSizes.footer} showName dark size="lg" />
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">
        Marketplace · Logistique · SaaS
      </p>

      <p className="max-w-sm text-sm leading-relaxed text-white/70">
        La marketplace africaine nouvelle génération — Express, Import et Gros sur chaque produit.
        Mobile Money, livraison moto et confiance acheteur au cœur de l&apos;expérience.
      </p>

      <div className="space-y-2 text-sm text-white/65">
        <a
          href={buildSupportWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-2 transition-colors hover:text-green-300"
        >
          <MessageCircle className="h-4 w-4 shrink-0 text-green-400" aria-hidden />
          WhatsApp · {CONTACT.phoneDisplay}
        </a>
        <a
          href={buildMailtoUrl()}
          className="flex min-h-11 items-center gap-2 transition-colors hover:text-gold"
        >
          <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
          {CONTACT.email}
        </a>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Suivez-nous
        </p>
        <div className="flex flex-wrap gap-2">
          {FOOTER_SOCIAL_LINKS.map((social) => {
            const Icon = SOCIAL_ICON_MAP[social.network];
            const isWhatsApp = social.network === "whatsapp";
            const isEmail = social.network === "email";
            return (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300",
                  isWhatsApp
                    ? "border-green-400/30 bg-green-deep/30 text-green-300 hover:border-green-400/60 hover:bg-green-deep/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]"
                    : isEmail
                      ? "border-gold/30 bg-gold/10 text-gold hover:border-gold/50 hover:bg-gold/20"
                      : "border-white/10 bg-white/5 text-white/80 hover:border-gold/40 hover:bg-gold/10 hover:text-gold",
                )}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="hidden xl:block">
        <NewsletterForm />
      </div>

      <div className="hidden lg:block">
        <AppDownloadBlock />
      </div>
    </div>
  );
}
