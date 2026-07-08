import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocre: "var(--ocre)",
        terracotta: "var(--terracotta)",
        sand: "var(--sand)",
        "noble-brown": "var(--noble-brown)",
        copper: "var(--copper)",
        "green-savanna": "var(--green-savanna)",
        "green-deep": "var(--green-deep)",
        "green-forest": "var(--green-forest)",
        "green-agri": "var(--green-agri)",
        sunset: "var(--sunset)",
        gold: "var(--gold)",
        amber: "var(--amber)",
        "brand-orange": "var(--brand-orange)",
        "brand-orange-hover": "var(--brand-orange-hover)",
        "brand-orange-muted": "var(--brand-orange-muted)",
        "brand-orange-dark": "var(--brand-orange-dark)",
        "brand-green": "var(--brand-green)",
        "brand-green-hover": "var(--brand-green-hover)",
        "brand-green-muted": "var(--brand-green-muted)",
        primary: {
          DEFAULT: "var(--brand-orange)",
          hover: "var(--brand-orange-hover)",
          muted: "var(--brand-orange-muted)",
          foreground: "var(--night)",
        },
        secondary: {
          DEFAULT: "var(--brand-green)",
          hover: "var(--brand-green-hover)",
          muted: "var(--brand-green-muted)",
          foreground: "#ffffff",
        },
        night: "var(--night)",
        bronze: "var(--bronze)",
        ivory: "var(--ivory)",
        "surface-light": "var(--surface-light)",
        "surface-white": "var(--surface-white)",
        dash: {
          bg: "var(--dash-bg)",
          sidebar: "var(--dash-sidebar)",
          "sidebar-hover": "var(--dash-sidebar-hover)",
          accent: "var(--dash-accent)",
          "accent-hover": "var(--dash-accent-hover)",
          header: "var(--dash-header)",
          border: "var(--dash-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "8px",
        "2xl": "16px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "savanna-drift": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(8px)" },
        },
        "coastal-wave": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-4px) scale(1.01)" },
        },
        "footer-wave-slow": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-14px)" },
        },
        "footer-wave-medium": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
        },
        "footer-wave-fast": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-6px)" },
        },
        "sunrise-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "savanna-drift": "savanna-drift 8s ease-in-out infinite",
        "coastal-wave": "coastal-wave 6s ease-in-out infinite",
        "footer-wave-slow": "footer-wave-slow 8s ease-in-out infinite",
        "footer-wave-medium": "footer-wave-medium 5.5s ease-in-out infinite",
        "footer-wave-fast": "footer-wave-fast 4s ease-in-out infinite",
        "sunrise-glow": "sunrise-glow 5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "shine-sweep": "shine-sweep 1.2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
