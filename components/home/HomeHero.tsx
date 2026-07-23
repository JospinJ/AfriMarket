"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  Play,
  Pause,
  Sparkles,
  Store,
  ShoppingBag,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { HeroImmersiveBackdrop } from "@/components/home/HeroImmersiveBackdrop";
import { BRAND, MARKETING_STATS } from "@/lib/constants/design";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

/* ────────────────────────────────────────────────────────────
   SLIDES — chaque slide = une intention commerciale forte.
   Images Unsplash (libres de droits, hôte déjà autorisé dans
   next.config.mjs). Le paramètre `q`/`w` optimise le poids ;
   next/image sert ensuite AVIF/WebP responsive automatiquement.
   Pour changer un visuel : remplacez simplement `image`.
   ──────────────────────────────────────────────────────────── */

const UNSPLASH = (id: string, w = 1920, fit: "crop" | "max" = "crop") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=${fit}&w=${w}&q=85`;

/** Dégradé de secours (base64) le temps que l'image charge → pas de flash noir. */
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PGZpbHRlciBpZD0iYiI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNiKSIgZmlsbD0iIzBiMTIyMCIvPjwvc3ZnPg==";

type CTA = { label: string; href: string; icon?: ComponentType<{ className?: string }> };

interface HeroSlide {
  id: string;
  eyebrow: string;
  eyebrowIcon: ComponentType<{ className?: string }>;
  titleTop: string;
  titleAccent: string;
  subtitle: string;
  primary: CTA;
  secondary: CTA;
  image: string;
  imageAlt: string;
  /** cover = plein écran recadré ; contain = image entière visible. */
  imageFit?: "cover" | "contain";
  /** split = image à droite, texte à gauche (meilleur aperçu en contain). */
  imageLayout?: "fullscreen" | "split";
  /** Point focal CSS — utile pour garder un visage visible avec object-cover. */
  imagePosition?: string;
  /** Affiche le sujet en entier (visage, sourire) sans recadrage agressif. */
  preserveSubject?: boolean;
  /** Teinte d'ambiance projetée sur le visuel (identité africaine premium). */
  tint: string;
}

const PREMIUM_HERO_IMAGE =
  "https://media.gettyimages.com/id/2187408419/fr/photo/tablette-bureau-et-femme-noire-en-affaires-la-nuit-pour-rechercher-ou-examiner-la-conception.jpg?s=612x612&w=0&k=20&c=b_u5M7UO71xRzBzi7-8-Lo_EsOioGnzIRLVbs9NuZfI=";

/** Slide « L'Afrique commerce, l'Afrique grandit » — entrepreneurs en collaboration. */
const MARKET_HERO_IMAGE = "https://media.gettyimages.com/id/1783928623/fr/photo/managing-risks-for-your-team-in-decision-making-for-project-management-a-female-business.jpg?s=612x612&w=0&k=20&c=Z-JUNPfjRbJ-XVvVvL7bmQqbDFPnQtCNbvdp8SGrJzQ=";
  
const FLASH_HERO_IMAGE = "/images/hero/file.svg";

const SLIDES: HeroSlide[] = [
  {
    id: "flash",
    eyebrow: "Offres Flash · 24 h",
    eyebrowIcon: Zap,
    titleTop: "Jusqu'à −70 %",
    titleAccent: "sur des milliers de produits",
    subtitle:
      "Ventes flash quotidiennes, stock local et livraison express 24–72 h dans vos villes. Les meilleurs prix du continent, chaque jour.",
    primary: { label: "Profiter des offres", href: ROUTES.flashSales, icon: Zap },
    secondary: { label: "Voir les tendances", href: ROUTES.topSellers, icon: TrendingUp },
    image: FLASH_HERO_IMAGE,
    imageAlt:
      "Femme africaine souriante faisant ses achats en ligne avec son smartphone et sa carte bancaire",
    imageFit: "contain",
    preserveSubject: true,
    imagePosition: "center center",
    tint: "from-night/88 via-night/45 to-night/70",
  },
  {
    id: "market",
    eyebrow: BRAND.tagline,
    eyebrowIcon: Sparkles,
    titleTop: "L'Afrique commerce,",
    titleAccent: "l'Afrique grandit",
    subtitle: BRAND.heroSubtitle,
    primary: { label: "Commencer à acheter", href: ROUTES.flashSales, icon: ShoppingBag },
    secondary: { label: "Ouvrir ma boutique", href: ROUTES.registerSeller, icon: Store },
    image: MARKET_HERO_IMAGE,
    imageAlt:
      "Deux femmes entrepreneures africaines collaborant autour d'une tablette en environnement professionnel",
    imagePosition: "center center",
    preserveSubject: true,
    tint: "from-green-forest/75 via-night/55 to-night/95",
  },
  {
    id: "premium",
    eyebrow: "Vendeurs Premium · Gold & Elite",
    eyebrowIcon: Crown,
    titleTop: "Des boutiques d'élite,",
    titleAccent: "un service d'exception",
    subtitle:
      "Vendeurs vérifiés, visibilité renforcée, analytics et livraison prioritaire. Rejoignez les entrepreneurs qui font grandir l'Afrique.",
    primary: { label: "Devenir vendeur", href: ROUTES.becomeSeller, icon: Store },
    secondary: { label: "Passer Premium", href: ROUTES.premium, icon: Crown },
    image: PREMIUM_HERO_IMAGE,
    imageAlt:
      "Femme entrepreneure africaine consultant sa tablette dans un bureau moderne la nuit",
    imagePosition: "center 35%",
    tint: "from-amber/55 via-night/50 to-night/95",
  },
  {
    id: "logistics",
    eyebrow: "Logistique panafricaine",
    eyebrowIcon: Truck,
    titleTop: "Express, Import & Gros —",
    titleAccent: "livrés jusqu'à vous",
    subtitle:
      "48 villes connectées, livraison moto et réseau de partenaires locaux. Achetez ici, importez au meilleur prix, recevez vite.",
    primary: { label: "Découvrir les offres", href: ROUTES.flashSales, icon: ArrowRight },
    secondary: { label: "Devenir livreur", href: ROUTES.becomeDriver, icon: Truck },
    image: UNSPLASH("1586528116311-ad8dd3c8310d"),
    imageAlt: "Livraison logistique urbaine en Afrique",
    tint: "from-secondary/70 via-night/55 to-night/95",
  },
];

const AUTOPLAY_MS = 6500;
const SWIPE_THRESHOLD = 50;

/**
 * Image de fond du hero avec fallback automatique.
 * Si l'URL Unsplash échoue (ID retiré, réseau), on bascule sur un
 * visuel de secours (picsum, hôte autorisé) → jamais d'image cassée.
 */
function HeroImage({
  src,
  alt,
  priority,
  fallbackSeed,
  objectFit = "cover",
  objectPosition = "center",
  fullBleed = false,
  preserveSubject = false,
}: {
  src: string;
  alt: string;
  priority: boolean;
  fallbackSeed: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  fullBleed?: boolean;
  preserveSubject?: boolean;
}) {
  const [current, setCurrent] = useState(src);
  useEffect(() => setCurrent(src), [src]);
  const isLocalAsset = current.startsWith("/");
  const imageSizes = fullBleed ? "100vw" : "(max-width: 1024px) 100vw, 58vw";
  const imageClass =
    preserveSubject || objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className="relative h-full w-full">
      {preserveSubject && (
        <Image
          src={current}
          alt=""
          fill
          aria-hidden
          unoptimized={isLocalAsset || current.endsWith(".svg")}
          sizes={imageSizes}
          className="scale-110 object-cover opacity-35 blur-2xl"
          style={{ objectPosition }}
        />
      )}
      <Image
        src={current}
        alt={alt}
        fill
        priority={priority}
        unoptimized={isLocalAsset || current.endsWith(".svg")}
        sizes={imageSizes}
        placeholder={isLocalAsset ? "empty" : "blur"}
        blurDataURL={isLocalAsset ? undefined : BLUR}
        className={cn("relative z-[1]", imageClass)}
        style={{ objectPosition }}
        onError={() => {
          if (isLocalAsset) return;
          setCurrent(`https://picsum.photos/seed/${fallbackSeed}/1920/1080`);
        }}
      />
    </div>
  );
}

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HomeHero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slide = SLIDES[index]!;
  const count = SLIDES.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count]
  );
  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  // Défilement automatique (pause au survol / focus / réduction de mouvement)
  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [next, paused, prefersReducedMotion, index]);

  // Parallax au scroll — le contenu remonte doucement, l'opacité fond.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  // Support tactile mobile
  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) (delta < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * 60,
      scale: prefersReducedMotion ? 1 : 1.03,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * -60,
      scale: prefersReducedMotion ? 1 : 1.02,
    }),
  };

  const PrimaryIcon = slide.primary.icon ?? ArrowRight;
  const SecondaryIcon = slide.secondary.icon;
  const EyebrowIcon = slide.eyebrowIcon;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-night"
      aria-roledescription="carrousel"
      aria-label="Sélection AfriMarket Hub"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      tabIndex={0}
    >
      <div
        className="relative min-h-[min(85dvh,760px)] overflow-hidden bg-night sm:min-h-[min(90dvh,760px)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── Couche visuelle immersive : Ken Burns + profondeur + atmosphère ── */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            aria-hidden
          >
            <HeroImmersiveBackdrop
                scrollProgress={scrollYProgress}
                prefersReducedMotion={prefersReducedMotion}
                imageLayout={slide.imageLayout}
                gentleMotion={slide.preserveSubject}
                softMotion={
                  slide.preserveSubject ||
                  slide.imageFit === "contain" ||
                  slide.imageLayout === "split"
                }
              >
                <HeroImage
                  src={slide.image}
                  alt={slide.imageAlt}
                  priority={index === 0}
                  fallbackSeed={slide.id}
                  objectFit={slide.imageFit}
                  objectPosition={slide.imagePosition}
                  fullBleed={slide.imageLayout !== "split"}
                  preserveSubject={slide.preserveSubject}
                />
              </HeroImmersiveBackdrop>

            {/* Teinte d'ambiance + lisibilité du texte */}
            <div className={cn("absolute inset-0 bg-gradient-to-r", slide.tint)} />
            {slide.imageLayout !== "split" && (
              <div
                className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/50"
                aria-hidden
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Ambiance africaine premium (motifs subtils + halos) ── */}
        <div className="pointer-events-none absolute inset-0 bg-motif-adinkra opacity-30" aria-hidden />
        <div
          className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 animate-glow-pulse rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-1/4 left-1/3 h-56 w-56 animate-coastal-wave rounded-full bg-secondary/15 blur-3xl"
          aria-hidden
        />

        {/* ── Contenu éditorial ── */}
        <motion.div
          className="relative mx-auto flex min-h-[min(85dvh,760px)] max-w-7xl flex-col justify-center px-4 py-14 sm:min-h-[min(90dvh,760px)] sm:px-6 sm:py-16 md:px-10 md:py-20 lg:max-w-[60%] lg:py-24"
          style={{ y: contentY, opacity }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.p
                variants={itemVariants}
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold text-primary shadow-glow-orange"
              >
                <EyebrowIcon className="h-3.5 w-3.5" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
                {slide.eyebrow}
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="font-display text-[clamp(1.75rem,6vw,3.75rem)] font-bold leading-[1.08] tracking-tight"
              >
                <span className="text-white">{slide.titleTop}</span>
                <br />
                <span className="text-gradient-africa">{slide.titleAccent}</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-5 max-w-lg text-base leading-relaxed text-white/85 md:text-lg"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div variants={itemVariants} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Button asChild className="h-12 w-full px-8 text-base shadow-glow-orange sm:w-auto">
                    <Link href={slide.primary.href}>
                      {slide.primary.label}
                      <PrimaryIcon className="ml-2 h-5 w-5" aria-hidden />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="secondary"
                    className="h-12 w-full px-8 text-base backdrop-blur-sm sm:w-auto"
                  >
                    <Link href={slide.secondary.href}>
                      {SecondaryIcon ? <SecondaryIcon className="mr-2 h-5 w-5" aria-hidden /> : null}
                      {slide.secondary.label}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Contrôles carrousel ── */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass-dark text-white transition-all hover:bg-primary/80 hover:shadow-glow-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-[480px]:flex sm:left-3 sm:h-12 sm:w-12 md:left-5"
          aria-label="Slide précédent"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass-dark text-white transition-all hover:bg-primary/80 hover:shadow-glow-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-[480px]:flex sm:right-3 sm:h-12 sm:w-12 md:right-5"
          aria-label="Slide suivant"
        >
          <ChevronRight size={22} />
        </button>

        {/* ── Indicateurs modernes + lecture/pause ── */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all duration-500",
                  i === index ? "w-10 bg-white/25" : "w-2 bg-white/40 hover:bg-white/70"
                )}
                aria-label={`Aller au slide ${i + 1} : ${s.eyebrow}`}
                aria-current={i === index}
              >
                {i === index &&
                  (prefersReducedMotion || paused ? (
                    <span className="absolute inset-0 rounded-full bg-primary" aria-hidden />
                  ) : (
                    <motion.span
                      key={`p-${index}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      aria-hidden
                    />
                  ))}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="flex h-7 w-7 items-center justify-center rounded-full glass-dark text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={paused ? "Lancer le défilement" : "Mettre en pause"}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>

      {/* ── Barre de confiance / statistiques ── */}
      <div className="relative border-t border-white/8 bg-night/90 backdrop-blur-md">
        <div className="absolute inset-0 bg-motif-kente opacity-50" aria-hidden />
        <dl className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
          {MARKETING_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="group px-4 py-6 text-center transition-colors hover:bg-white/5 sm:px-8 sm:py-7"
            >
              <dt className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                {stat.label}
              </dt>
              <dd className="mt-1.5 font-display text-xl font-bold tabular-nums sm:text-2xl">
                <AnimatedCounter value={stat.value} className="text-gradient-sunrise" />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>

      {/* Annonce le slide courant aux lecteurs d'écran */}
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} sur {count} : {slide.titleTop} {slide.titleAccent}
      </p>
    </section>
  );
}
