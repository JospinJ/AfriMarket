import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { AuthCookieSync } from "@/components/shared/AuthCookieSync";
import { GlobalOverlays } from "@/components/shared/GlobalOverlays";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";
import { BRAND } from "@/lib/constants/design";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata = {
  title: "AfriMarket",
  description: BRAND.tagline,
  icons: { icon: BRAND.logoSrc, apple: BRAND.logoSrc },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable} overflow-x-clip`}>
      <body className="max-w-full overflow-x-clip font-sans antialiased">
        <LocaleProvider>
          <NotificationProvider>
            <MotionProvider>
              <AuthCookieSync />
              <GlobalOverlays />
              {children}
            </MotionProvider>
          </NotificationProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
