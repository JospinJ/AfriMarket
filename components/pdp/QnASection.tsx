interface QnAItem {
  id: string;
  question: string;
  answer?: string;
  author: string;
  createdAt: string;
}

const MOCK_QNA: QnAItem[] = [
  {
    id: "q1",
    question: "Est-ce un produit original avec garantie ?",
    answer: "Oui, tous nos produits sont 100% authentiques avec garantie constructeur.",
    author: "Paul M.",
    createdAt: "2026-06-10",
  },
  {
    id: "q2",
    question: "Livraison possible à Bafoussam en mode Express ?",
    answer: "Oui, livraison moto en 2-4 jours ouvrés.",
    author: "Claire N.",
    createdAt: "2026-06-15",
  },
  {
    id: "q3",
    question: "Peut-on payer en plusieurs fois ?",
    author: "Marc T.",
    createdAt: "2026-06-20",
  },
];

export function QnASection() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-night">
        Questions & réponses
      </h2>
      {/* TODO API: GET /products/:id/qna */}
      <ul className="space-y-4">
        {MOCK_QNA.map((item) => (
          <li key={item.id} className="rounded-xl border border-sand/20 bg-white p-4">
            <p className="font-medium text-night">{item.question}</p>
            <p className="mt-1 text-xs text-sand">
              Par {item.author} · {item.createdAt}
            </p>
            {item.answer ? (
              <p className="mt-2 text-sm text-night/80">{item.answer}</p>
            ) : (
              <p className="mt-2 text-sm italic text-sand">En attente de réponse du vendeur</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
