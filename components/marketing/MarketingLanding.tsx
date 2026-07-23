import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingHeroImage } from "@/components/marketing/LandingHeroImage";
import { cn } from "@/lib/utils/cn";
import { BRAND } from "@/lib/constants/design";

export interface LandingFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface LandingPageProps {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
  /** Bannière complète (texte déjà dans l'image) — affichage intégral sans crop */
  heroFullBanner?: boolean;
  motif?: "kente" | "bogolan" | "ndop" | "adinkra" | "kuba";
  features: LandingFeature[];
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  stats?: { value: string; label: string }[];
}

const MOTIF_CLASS = {
  kente: "bg-motif-kente",
  bogolan: "bg-motif-bogolan",
  ndop: "bg-motif-ndop",
  adinkra: "bg-motif-adinkra",
  kuba: "bg-motif-kuba",
} as const;

export function MarketingLanding({
  eyebrow,
  title,
  description,
  heroImage,
  heroImageAlt,
  heroImageWidth,
  heroImageHeight,
  heroFullBanner = false,
  motif = "kente",
  features,
  primaryAction,
  secondaryAction,
  stats,
}: LandingPageProps) {
  return (
    <div className="overflow-hidden">
      {heroFullBanner && heroImageWidth && heroImageHeight ? (
        <section className="relative bg-night">
          <Link href={primaryAction.href} className="block" aria-label={heroImageAlt}>
            <div className="relative mx-auto max-w-7xl">
              <LandingHeroImage
                src={heroImage}
                alt={heroImageAlt}
                width={heroImageWidth}
                height={heroImageHeight}
                priority
                sizes="100vw"
                softMotion={false}
                objectFit="contain"
                className="min-h-[min(90vh,900px)]"
                imageClassName="max-h-[min(90vh,900px)]"
              />
            </div>
          </Link>
        </section>
      ) : (
      <section className="relative bg-night">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid min-h-[420px] md:grid-cols-2 md:min-h-[480px]">
            <div className="relative z-10 flex flex-col justify-center px-6 py-12 md:px-10 lg:px-16">
              <p className="text-sm font-medium uppercase tracking-widest text-gold">{eyebrow}</p>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-lg text-base text-white/75 md:text-lg">{description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-hover">
                  <Link href={primaryAction.href}>{primaryAction.label}</Link>
                </Button>
                {secondaryAction && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/25 bg-transparent text-white hover:bg-white/10"
                  >
                    <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="relative flex min-h-[240px] items-center justify-center bg-night md:min-h-full">
              {heroImageWidth && heroImageHeight ? (
                <LandingHeroImage
                  src={heroImage}
                  alt={heroImageAlt}
                  width={heroImageWidth}
                  height={heroImageHeight}
                  priority
                  sizes="50vw"
                  softMotion
                  objectFit="contain"
                  className="min-h-[240px] md:min-h-full"
                  imageClassName="max-h-[min(70vh,560px)]"
                />
              ) : (
                <LandingHeroImage
                  src={heroImage}
                  alt={heroImageAlt}
                  priority
                  sizes="50vw"
                  softMotion
                  objectFit="contain"
                  className="min-h-[240px] md:min-h-full"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night via-night/40 to-transparent md:from-night/80 md:via-transparent" />
            </div>
          </div>
        </div>
        <div className={cn("absolute inset-0 pointer-events-none opacity-40", MOTIF_CLASS[motif])} aria-hidden />
      </section>
      )}

      {/* Stats */}
      {stats && stats.length > 0 && (
        <section className="border-b border-sand/15 bg-surface-light">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 sm:gap-6 sm:px-6">
            {stats.map((s) => (
              <div key={s.label} className="min-w-0 text-center">
                <dd className="break-words font-display text-xl font-bold text-primary sm:text-2xl">{s.value}</dd>
                <dt className="mt-1 text-xs text-sand">{s.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-night md:text-3xl">
            Construisez votre avenir économique
          </h2>
          <p className="mt-3 text-sand">
            Innovation africaine, entrepreneuriat et solidarité communautaire au cœur de chaque
            fonctionnalité.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-sand/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="absolute inset-0 bg-motif-bogolan opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              <div className="relative">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange-muted text-primary">
                  <feature.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-night">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Vision */}
      <section className="bg-night bg-motif-adinkra">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <blockquote className="font-display text-xl font-medium italic text-white/90 md:text-2xl">
            &ldquo;{BRAND.vision}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-gold">— Le futur de l&apos;Afrique se construit ici</p>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-sunrise p-8 text-center md:p-12">
          <div className="absolute inset-0 bg-motif-kente opacity-30" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Prêt à rejoindre le marché numérique de l&apos;Afrique ?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/85">
              {BRAND.heroSubtitle}
            </p>
            <Button asChild className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary-hover">
              <Link href={primaryAction.href}>{primaryAction.label}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
