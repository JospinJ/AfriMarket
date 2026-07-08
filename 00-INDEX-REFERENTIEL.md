# 📚 RÉFÉRENTIEL AFRIMARKET HUB — INDEX MAÎTRE

> Point d'entrée unique du référentiel de pilotage IA du projet **AfriMarket Hub**.
> Ce référentiel est conçu pour piloter une équipe de sous-agents IA (Cursor, Claude, ou tout environnement multi-agents) **depuis la réflexion stratégique jusqu'à la livraison en production**, sans zone d'ombre.

---

## 0. Comment utiliser ce référentiel

Ce référentiel se lit et s'applique dans un ordre précis. Un agent (ou un humain) qui rejoint le projet **doit** suivre cet ordre :

1. **Lire d'abord** [`PROMPT-MAITRE-AFRIMARKET-HUB.md`](./PROMPT-MAITRE-AFRIMARKET-HUB.md) — le cerveau du projet : vision, stratégie, rôles des agents, méthodologie, contrôle qualité. **Aucune ligne de code ne doit être écrite avant d'avoir lu ce document en entier.**
2. **Charger les règles Cursor** dans [`.cursor/rules/`](./.cursor/rules/) — elles s'appliquent automatiquement à chaque génération et sont **non-négociables**.
3. **Consulter le socle partagé** [`docs/glossaire-et-modele-donnees.md`](./docs/glossaire-et-modele-donnees.md) — vocabulaire, types TypeScript de référence, conventions de nommage. Toute divergence par rapport à ce document est un bug.
4. **Ouvrir la fiche du module** sur lequel on travaille dans [`docs/modules/`](./docs/modules/) — chaque fiche est une spécification actionnable et contraignante.

> ⚠️ **Règle d'or** : un agent ne reçoit **que** le contexte dont il a besoin (le prompt maître, les règles Cursor, le socle partagé, et **la seule fiche du module traité**). Ne jamais injecter les 17 fiches à la fois — cela dilue la qualité (voir section « Gestion du contexte » du prompt maître).

---

## 1. Arborescence du référentiel

```
AfriMarket-Hub/
├── 00-INDEX-REFERENTIEL.md              ← vous êtes ici
├── PROMPT-MAITRE-AFRIMARKET-HUB.md      ← prompt d'orchestration (le cerveau)
│
├── .cursor/
│   └── rules/                           ← règles appliquées automatiquement par Cursor
│       ├── 00-contexte-projet.mdc       (alwaysApply — vision + non-négociables)
│       ├── 01-stack-technique.mdc       (stack imposée, TS strict, arborescence)
│       ├── 02-rbac-roles.mdc            (4 rôles + matrice de permissions)
│       ├── 03-design-system.mdc         (tokens, style « Afrique moderne »)
│       ├── 04-contraintes-afrique.mdc   (Mobile Money, WhatsApp, FCFA, low-bandwidth)
│       ├── 05-triptyque-achat.mdc       (Express / Import / Gros — le fil rouge)
│       ├── 06-conventions-code.mdc      (nommage, structure, interdits)
│       ├── 07-definition-of-done.mdc    (critères de livraison + QA)
│       └── 08-plan-execution.mdc        (roadmap, dépendances, statut modules)
│
└── docs/
    ├── glossaire-et-modele-donnees.md   ← socle partagé (types, entités, vocabulaire)
    └── modules/                         ← 17 fiches-modules détaillées et contraignantes
        ├── 01-navbar-footer.md
        ├── 02-home.md
        ├── 03-pdp-page-produit.md
        ├── 04-cart-panier.md
        ├── 05-checkout-paiement.md
        ├── 06-tracking-commande.md
        ├── 07-store-front-boutique.md
        ├── 08-chat-messages.md
        ├── 09-reviews-avis.md
        ├── 10-litiges-disputes.md
        ├── 11-dashboards.md
        ├── 12-premium-abonnement.md
        ├── 13-ads-manager.md
        ├── 14-ads-analytics.md
        ├── 15-delivery-zones.md
        ├── 16-security-center.md
        └── 17-legal-center.md
```

---

## 2. Les 17 modules en un coup d'œil

| # | Module | Fiche | Rôle principal | Backend réel requis ? |
|---|--------|-------|----------------|:---:|
| 1 | Navbar + Footer | [01](./docs/modules/01-navbar-footer.md) | Tous | Non (mock) |
| 2 | Page d'accueil (Home) | [02](./docs/modules/02-home.md) | Acheteur | Non (mock) |
| 3 | Page Produit (PDP) | [03](./docs/modules/03-pdp-page-produit.md) | Acheteur | Non (mock) |
| 4 | Panier (Cart) | [04](./docs/modules/04-cart-panier.md) | Acheteur | Non (mock) |
| 5 | Checkout / Paiement | [05](./docs/modules/05-checkout-paiement.md) | Acheteur | Partiel (`// TODO API`) |
| 6 | Tracking commande | [06](./docs/modules/06-tracking-commande.md) | Acheteur | Partiel (`// TODO API`) |
| 7 | Boutique Vendeur | [07](./docs/modules/07-store-front-boutique.md) | Acheteur / Vendeur | Non (mock) |
| 8 | Messages / Chat | [08](./docs/modules/08-chat-messages.md) | Tous | Oui (`// TODO API`) |
| 9 | Reviews / Avis | [09](./docs/modules/09-reviews-avis.md) | Tous | Oui (`// TODO API`) |
| 10 | Litiges / Disputes | [10](./docs/modules/10-litiges-disputes.md) | Acheteur/Vendeur/Livreur/Support | Oui (`// TODO API`) |
| 11 | Dashboards par rôle | [11](./docs/modules/11-dashboards.md) | Tous | Oui (`// TODO API`) |
| 12 | Abonnement Premium | [12](./docs/modules/12-premium-abonnement.md) | Vendeur | Oui (`// TODO API`) |
| 13 | Ads Manager | [13](./docs/modules/13-ads-manager.md) | Vendeur / Admin | Oui (`// TODO API`) |
| 14 | Analytics Ads | [14](./docs/modules/14-ads-analytics.md) | Vendeur / Admin | Oui (`// TODO API`) |
| 15 | Zones de livraison | [15](./docs/modules/15-delivery-zones.md) | Admin / Livreur | Oui (`// TODO API`) |
| 16 | Security Center | [16](./docs/modules/16-security-center.md) | Tous | Oui (`// TODO API`) |
| 17 | Page Légale | [17](./docs/modules/17-legal-center.md) | Tous | Non (contenu statique) |

---

## 3. Les 5 invariants du projet (à ne JAMAIS violer)

Ces 5 règles sont rappelées dans chaque document. Toute génération qui en viole une est **rejetée d'office** :

1. **Triptyque d'achat** — Tout produit affiché montre ses **3 modes** (⚡ Express / 🌍 Import / 🏭 Gros). Aucun prix sans mode associé. → `.cursor/rules/05-triptyque-achat.mdc`
2. **RBAC strict** — Les 4 rôles (Admin, Vendeur, Livreur, Acheteur) et leur matrice de permissions ne sont jamais contournés, ni côté UI ni côté route. → `.cursor/rules/02-rbac-roles.mdc`
3. **Contraintes Afrique** — Mobile Money d'abord, WhatsApp-first, FCFA par défaut, mobile-first strict, low-bandwidth. → `.cursor/rules/04-contraintes-afrique.mdc`
4. **Design « Afrique moderne, sobre »** — Style suggestif (motifs 5–10 % d'opacité), jamais folklorique ; la lisibilité e-commerce prime là où l'argent est en jeu. → `.cursor/rules/03-design-system.mdc`
5. **Stack imposée** — Next.js 14+ App Router, TypeScript strict, Tailwind + Shadcn, Zustand. Aucune alternative sans validation de l'Agent 0. → `.cursor/rules/01-stack-technique.mdc`

---

## 4. Statut de complétude (à maintenir par l'Agent 0)

| Livrable | Statut | Dernière MAJ |
|----------|:------:|:---:|
| Prompt maître | ✅ Rédigé | 2026-07-05 |
| Règles Cursor (9) | ✅ Rédigées | 2026-07-05 |
| Glossaire + modèle de données | ✅ Rédigé | 2026-07-05 |
| Fiches-modules (17) | ✅ Rédigées | 2026-07-05 |
| Code du projet | ✅ Sprint 0–8 livrés | 2026-07-05 |

> L'Agent 0 met à jour ce tableau à chaque fin de sprint. « ✅ Rédigé » concerne la **spécification** ; l'implémentation du code se suit dans la roadmap du prompt maître (§ Roadmap & Sprints).
