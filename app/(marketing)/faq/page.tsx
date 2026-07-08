import { InfoPage } from "@/components/marketing/InfoPage";
import { ROUTES } from "@/lib/constants/routes";

export const metadata = { title: "FAQ — AfriMarket Hub" };

const FAQ_ITEMS = [
  {
    q: "Quels sont les modes d'achat ?",
    a: "Express (24–72 h, stock local), Import (10–25 j, prix réduit) et Gros (MOQ, prix usine).",
  },
  {
    q: "Comment payer ?",
    a: "Mobile Money en priorité (MTN, Orange Money), puis carte, paiement à la livraison ou portefeuille.",
  },
  {
    q: "Comment suivre ma commande ?",
    a: "Via la page de suivi avec votre numéro de commande, ou par SMS si la connexion est faible.",
  },
];

export default function FaqPage() {
  return (
    <InfoPage
      title="Questions fréquentes"
      description="Les réponses aux questions les plus courantes."
      secondaryAction={{ label: "Contacter le support", href: ROUTES.contact }}
    >
      <dl className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q}>
            <dt className="font-semibold">{item.q}</dt>
            <dd className="mt-1 text-sm text-sand">{item.a}</dd>
          </div>
        ))}
      </dl>
    </InfoPage>
  );
}
