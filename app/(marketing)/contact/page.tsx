import { InfoPage } from "@/components/marketing/InfoPage";
import { CONTACT, buildMailtoUrl, buildSupportWhatsAppUrl } from "@/lib/constants/contact";
import { ROUTES } from "@/lib/constants/routes";

export const metadata = { title: "Contact — AfriMarket Hub" };

export default function ContactPage() {
  return (
    <InfoPage
      title="Nous contacter"
      description="Notre équipe répond via WhatsApp en priorité, puis par SMS et e-mail."
      primaryAction={{
        label: "WhatsApp",
        href: buildSupportWhatsAppUrl(),
      }}
      secondaryAction={{ label: "Retour à l'aide", href: ROUTES.help }}
    >
      <p className="text-sm">
        <strong>E-mail :</strong>{" "}
        <a href={buildMailtoUrl()} className="text-green-deep hover:underline">
          {CONTACT.email}
        </a>
        <br />
        <strong>WhatsApp :</strong>{" "}
        <a
          href={buildSupportWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-deep hover:underline"
        >
          {CONTACT.phoneDisplay}
        </a>
        <br />
        <strong>Horaires :</strong> {CONTACT.businessHours}
      </p>
    </InfoPage>
  );
}
