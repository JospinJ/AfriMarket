/** Variantes Framer Motion — design system motion premium AfriMarket Hub. */

export const easePremium = [0.22, 1, 0.36, 1] as const;
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easePremium },
  }),
};

export const fadeUpBlur = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, delay, ease: easeOutExpo },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay, ease: easePremium },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: easeOutExpo },
  }),
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -56 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: easePremium },
  }),
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 56 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: easePremium },
  }),
};

export const revealScale = {
  hidden: { opacity: 0, scale: 0.85, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: easeOutExpo },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export type RevealVariant =
  | "fadeUp"
  | "fadeUpBlur"
  | "fadeIn"
  | "scaleIn"
  | "slideLeft"
  | "slideRight"
  | "revealScale";

export const revealVariants = {
  fadeUp,
  fadeUpBlur,
  fadeIn,
  scaleIn,
  slideLeft: slideFromLeft,
  slideRight: slideFromRight,
  revealScale,
} as const satisfies Record<RevealVariant, object>;
