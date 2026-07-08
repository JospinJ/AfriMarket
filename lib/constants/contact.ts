/** Coordonnées officielles — source de vérité (WhatsApp-first). */

export const CONTACT = {
  /** Numéro local Cameroun (sans indicatif) */
  whatsappLocal: "680695754",
  /** Format wa.me / E.164 sans + */
  whatsappE164: "237680695754",
  email: "jiresnana@gmail.com",
  phoneDisplay: "+237 6 80 69 57 54",
  phoneTel: "+237680695754",
  businessHours: "Lun–Sam, 8h–20h (WAT)",
} as const;

export function buildSupportWhatsAppUrl(
  message = "Bonjour AfriMarket Hub, j'ai besoin d'aide.",
): string {
  return `https://wa.me/${CONTACT.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject?: string): string {
  if (!subject) return `mailto:${CONTACT.email}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}
