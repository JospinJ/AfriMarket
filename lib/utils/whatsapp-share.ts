import { ROUTES } from "@/lib/constants/routes";

/** URL absolue stable SSR/client — définir NEXT_PUBLIC_SITE_URL en prod. */
export function getAbsoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (base) return `${base}${normalized}`;
  return normalized;
}

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Message identique serveur + client (chemin relatif si pas de SITE_URL). */
export function buildProductWhatsAppMessage(
  title: string,
  priceLabel: string,
  productSlug: string
): string {
  const productUrl = getAbsoluteUrl(ROUTES.product(productSlug));
  return `${title} — ${priceLabel} — ${productUrl}`;
}

/** Au clic client : URL absolue avec origin courante (meilleur partage WhatsApp). */
export function buildProductWhatsAppMessageClient(
  title: string,
  priceLabel: string,
  productSlug: string
): string {
  const path = ROUTES.product(productSlug);
  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${path}`
      : getAbsoluteUrl(path);
  return `${title} — ${priceLabel} — ${productUrl}`;
}

export function openWhatsAppShare(message: string): void {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}
