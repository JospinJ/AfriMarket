export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export const mockLegalDocument = {
  title: "Conditions Générales d'Utilisation",
  updatedAt: "2026-01-15",
  sections: [
    {
      id: "intro",
      title: "1. Introduction",
      content:
        "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme AfriMarket Hub, marketplace africain opérant principalement au Cameroun. En utilisant nos services, vous acceptez ces conditions.",
    },
    {
      id: "services",
      title: "2. Services proposés",
      content:
        "AfriMarket Hub propose une marketplace combinant les modes d'achat Express (stock local), Import (livraison internationale) et Gros (quantités minimales). Nous facilitons les transactions entre acheteurs, vendeurs et livreurs via Mobile Money et autres moyens de paiement.",
    },
    {
      id: "paiement",
      title: "3. Paiements",
      content:
        "Les paiements s'effectuent en FCFA. Mobile Money (MTN, Orange Money, Moov, Airtel, Wave) est le moyen de paiement privilégié. Les transactions sont sécurisées par vérification OTP. AfriMarket Hub agit en tant qu'intermédiaire de paiement.",
    },
    {
      id: "litiges",
      title: "4. Litiges et remboursements",
      content:
        "En cas de litige (non-livraison, produit endommagé, article incorrect), l'acheteur peut ouvrir un dossier via son espace. Notre équipe support arbitre sous 7 jours ouvrés. Les remboursements sont effectués sur le moyen de paiement d'origine.",
    },
    {
      id: "donnees",
      title: "5. Protection des données",
      content:
        "Vos données personnelles sont traitées conformément à la réglementation en vigueur. Nous ne vendons pas vos données. Vous pouvez exercer vos droits d'accès et de suppression via le Centre de sécurité.",
    },
    {
      id: "contact",
      title: "6. Contact",
      content:
        "Pour toute question : jiresnana@gmail.com ou WhatsApp +237 6 80 69 57 54. Siège social : Douala, Cameroun.",
    },
  ] satisfies LegalSection[],
};

// TODO API: GET /legal/cgu → LegalDocument
