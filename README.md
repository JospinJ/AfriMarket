# AfriMarket Hub

Marketplace africain (Cameroun) — Next.js 14, TypeScript strict, Tailwind, Shadcn, Zustand.

## Démarrage

```bash
npm install --strict-ssl=false   # si problème certificat réseau
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Routes principales

| Route | Module |
|-------|--------|
| `/` | Home |
| `/products/[slug]` | PDP |
| `/cart` | Panier |
| `/checkout` | Checkout (5 étapes) |
| `/orders/[id]/tracking` | Tracking |
| `/stores/[slug]` | Boutique vendeur |
| `/admin`, `/seller`, `/driver`, `/buyer`, `/support` | Dashboards RBAC |
| `/messages` | Chat |
| `/legal` | Centre légal |
| `/kitchen-sink` | Démo composants partagés |

## Scripts

- `npm run dev` — développement
- `npm run build` — build production
- `npm run test` — tests Vitest (invariants triptyque, RBAC, helpers)

## Architecture

- `app/(marketing)/` — pages publiques
- `app/(shop)/` — parcours achat
- `app/(dashboard)/` — espaces par rôle (middleware RBAC)
- `components/shared/` — composants métier réutilisables
- `lib/mocks/` — données mockées typées
- `store/` — Zustand (panier, mode d'achat, rôle, filtres)

## Invariants

1. Triptyque Express / Import / Gros — aucun prix sans mode
2. RBAC strict — 4 rôles
3. Mobile Money d'abord, FCFA, WhatsApp-first
4. Design « Afrique moderne » sobre
5. Stack imposée (voir `.cursor/rules/`)

## TODO API

Les intégrations backend réelles sont marquées `// TODO API` dans `services/` et les composants concernés. Aucune vraie passerelle de paiement en v1.

## Référentiel

Voir `00-INDEX-REFERENTIEL.md` et `PROMPT-MAITRE-AFRIMARKET-HUB.md`.
