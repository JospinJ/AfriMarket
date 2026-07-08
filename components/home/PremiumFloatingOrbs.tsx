"use client";

import { useMemo, useRef, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import {
  getPremiumFloatingItems,
  getPremiumFloatingIds,
  mergePremiumOrbLayout,
  ORBIT_DURATION_S,
  type PremiumFloatingItem,
  type PremiumFloatingOrbItem,
} from "@/lib/utils/premium-floating";
import { usePremiumSurprise } from "@/hooks/usePremiumSurprise";
import { PremiumOrbCard } from "@/components/home/PremiumOrbCard";

interface PremiumFloatingOrbsProps {
  items?: PremiumFloatingItem[];
  className?: string;
}

export function PremiumFloatingOrbs({ items: itemsProp, className }: PremiumFloatingOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1, once: false });

  const items = useMemo(
    () => (itemsProp ? mergePremiumOrbLayout(itemsProp) : getPremiumFloatingItems(4)),
    [itemsProp],
  );
  const premiumIds = useMemo(() => getPremiumFloatingIds(items), [items]);
  const surpriseId = usePremiumSurprise({ ids: premiumIds, enabled: isInView });

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute right-0 top-1/2 z-10 -translate-y-1/2",
        "max-[480px]:right-[-8%] max-[480px]:scale-[0.72] max-[480px]:origin-center",
        "sm:right-[1%] sm:scale-90 md:right-[2%] md:scale-100",
        className,
      )}
      aria-label="Produits Premium en vedette"
      role="list"
    >
      <div
        className="premium-orbit-system relative"
        style={
          {
            "--orbit-radius": "clamp(88px, 18vw, 210px)",
            "--orbit-duration": `${ORBIT_DURATION_S}s`,
          } as CSSProperties
        }
      >
        <div className="premium-orbit-track">
          {items.map((item, i) => (
            <PremiumOrbSlot
              key={item.id}
              item={item}
              index={i}
              isSurprise={surpriseId === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PremiumOrbSlot({
  item,
  index,
  isSurprise,
}: {
  item: PremiumFloatingOrbItem;
  index: number;
  isSurprise: boolean;
}) {
  return (
    <div
      role="listitem"
      className="premium-orbit-slot pointer-events-none absolute inset-0"
      style={{ "--orbit-angle": `${item.orbitAngle}deg` } as CSSProperties}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="premium-orbit-slot-inner pointer-events-auto"
      >
        <PremiumOrbCard item={item} isSurprise={isSurprise} size="lg" />
      </motion.div>
    </div>
  );
}
