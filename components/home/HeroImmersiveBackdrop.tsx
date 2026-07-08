"use client";

import { type ReactNode } from "react";
import { type MotionValue, motion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const PARTICLES = [
  { left: "18%", top: "22%", delay: "0s", size: 3 },
  { left: "72%", top: "18%", delay: "1.2s", size: 2 },
  { left: "85%", top: "55%", delay: "2.4s", size: 4 },
  { left: "42%", top: "68%", delay: "0.8s", size: 2 },
  { left: "58%", top: "38%", delay: "1.8s", size: 3 },
  { left: "28%", top: "48%", delay: "3s", size: 2 },
] as const;

interface HeroImmersiveBackdropProps {
  children: ReactNode;
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean | null;
  immersive?: boolean;
  /** Zoom Ken Burns atténué (slides split / contain). */
  softMotion?: boolean;
  /** Mouvement minimal — préserve visage / sujet (pas de zoom agressif). */
  gentleMotion?: boolean;
  imageLayout?: "fullscreen" | "split";
  className?: string;
}

export function HeroImmersiveBackdrop({
  children,
  scrollProgress,
  prefersReducedMotion,
  immersive = true,
  softMotion = false,
  gentleMotion = false,
  imageLayout = "fullscreen",
  className,
}: HeroImmersiveBackdropProps) {
  const reduced = prefersReducedMotion ?? false;
  const active = immersive && !reduced;

  const scrollScale = useTransform(
    scrollProgress,
    [0, 1],
    gentleMotion ? [1, 1.05] : [1, 1.18],
  );
  const scrollY = useTransform(scrollProgress, [0, 1], ["0%", "18%"]);
  const scrollFog = useTransform(scrollProgress, [0, 0.85], [0.18, 0.45]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className={cn(
          "absolute inset-0 will-change-transform",
          imageLayout === "split" && "left-[8%] right-0 sm:left-[12%] lg:left-[38%]",
        )}
        style={active ? { y: scrollY, scale: scrollScale } : undefined}
      >
        <div
          className={cn(
            "hero-immersive-stage absolute inset-0",
            active && (softMotion ? "hero-immersive-ken-burns--soft" : "hero-immersive-ken-burns"),
          )}
        >
          <div
            className={cn(
              "hero-immersive-drift absolute",
              gentleMotion ? "inset-0" : "inset-[-4%]",
              active && !gentleMotion && "hero-immersive-drift--active",
            )}
          >
            <div className="relative h-full w-full">{children}</div>
          </div>
        </div>
      </motion.div>

      {/* Mise au point progressive — flou léger sur les bords (desktop) */}
      {active && (
        <div
          className="pointer-events-none absolute inset-0 hidden backdrop-blur-[2.5px] md:block [mask-image:radial-gradient(ellipse_62%_58%_at_52%_42%,transparent_48%,black_100%)]"
          aria-hidden
        />
      )}

      {/* Révélation progressive — vignette cinéma */}
      <div
        className={cn(
          "hero-immersive-vignette pointer-events-none absolute inset-0",
          !active && "opacity-70",
        )}
        aria-hidden
      />

      {/* Brouillard atmosphérique */}
      <motion.div
        className="hero-immersive-fog pointer-events-none absolute inset-0"
        style={active ? { opacity: scrollFog } : { opacity: 0.22 }}
        aria-hidden
      />

      {/* Faisceau lumineux dynamique */}
      {active && (
        <div className="hero-immersive-light pointer-events-none absolute inset-0" aria-hidden />
      )}

      {/* Particules discrètes */}
      {active && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="hero-immersive-particle absolute rounded-full bg-primary/80"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Grain cinéma très léger */}
      {active && (
        <div className="hero-immersive-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />
      )}
    </div>
  );
}
