"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_META } from "@/lib/constants/images";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/shared/HeroVisual";

const SLIDES = [
  {
    id: 1,
    meta: HERO_META.hero1,
    title: "Innovation logistique africaine",
    subtitle: "Express 24–72 h — stock local, livraison moto dans vos villes",
    cta: "Voir les offres",
    href: "/flash-sales",
    bg: "from-secondary/85 via-night/60 to-night/90",
  },
  {
    id: 2,
    meta: HERO_META.hero2,
    title: "Commerce transfrontalier",
    subtitle: "Import à prix réduits — connectez l'Afrique aux marchés mondiaux",
    cta: "Découvrir",
    href: "/?mode=import",
    bg: "from-primary/75 via-night/50 to-night/90",
  },
  {
    id: 3,
    meta: HERO_META.hero3,
    title: "Entrepreneuriat Premium",
    subtitle: "Gold & Elite — visibilité, analytics et leadership continental",
    cta: "Passer Premium",
    href: "/premium",
    bg: "from-amber/65 via-gold/30 to-night/90",
  },
] as const;

const AUTOPLAY_MS = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, paused, index]);

  const slide = SLIDES[index]!;
  const { meta } = slide;
  const isFullBanner = !meta.showOverlay;

  return (
    <section
      className="relative overflow-hidden rounded-2xl bg-night shadow-premium-lg"
      aria-label="Promotions"
      aria-roledescription="carrousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          {isFullBanner ? (
            <Link
              href={slide.href}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={meta.alt}
            >
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
              >
                <HeroVisual
                  src={meta.src}
                  width={meta.width}
                  height={meta.height}
                  alt={meta.alt}
                  maxHeight="min(85vh, 900px)"
                />
              </motion.div>
            </Link>
          ) : (
            <div className="relative">
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
              >
                <HeroVisual
                  src={meta.src}
                  width={meta.width}
                  height={meta.height}
                  alt={meta.alt}
                  maxHeight="min(72vh, 640px)"
                />
              </motion.div>
              <div className={cn("absolute inset-0 bg-gradient-to-r", slide.bg)} />
              <div className="absolute inset-0 bg-motif-kuba opacity-15" aria-hidden />

              <motion.div
                className="absolute inset-0 flex flex-col justify-center px-14 sm:px-10 md:px-14"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
                }}
              >
                {[
                  <span
                    key="tag"
                    className="mb-3 inline-block w-fit rounded-full glass-dark px-3 py-1 text-xs font-semibold text-primary"
                  >
                    Offre du moment
                  </span>,
                  <h2
                    key="title"
                    className="max-w-xl font-display text-2xl font-bold leading-tight text-white md:text-4xl"
                  >
                    {slide.title}
                  </h2>,
                  <p
                    key="subtitle"
                    className="mt-3 max-w-md text-sm leading-relaxed text-white/88 md:text-base"
                  >
                    {slide.subtitle}
                  </p>,
                  <div key="cta" className="mt-6 w-fit">
                    <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="h-11 px-6 shadow-glow-orange">
                        <Link href={slide.href}>{slide.cta}</Link>
                      </Button>
                    </motion.div>
                  </div>,
                ].map((child) => (
                  <motion.div
                    key={child.key}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    {child}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass-dark text-white transition-all hover:bg-primary/80 hover:shadow-glow-orange min-[480px]:flex sm:left-3 sm:h-12 sm:w-12"
        aria-label="Slide précédent"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass-dark text-white transition-all hover:bg-primary/80 hover:shadow-glow-orange min-[480px]:flex sm:right-3 sm:h-12 sm:w-12"
        aria-label="Slide suivant"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "relative h-1.5 overflow-hidden rounded-full transition-all duration-400",
              i === index ? "w-10 bg-white/25 shadow-glow-orange" : "w-1.5 bg-white/40 hover:bg-white/70"
            )}
            aria-label={`Aller au slide ${i + 1}`}
            aria-current={i === index}
          >
            {i === index &&
              (prefersReducedMotion || paused ? (
                <span className="absolute inset-0 rounded-full bg-primary" aria-hidden />
              ) : (
                <motion.span
                  key={`progress-${index}`}
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
    </section>
  );
}
