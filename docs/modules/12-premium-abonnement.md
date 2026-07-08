# Module 12 — Abonnement Premium (Seller Monetization)

> Sprint 6. Rôle : **Vendeur**. Backend : oui (`// TODO API`). Dépend de : 11, Socle.
> **Moteur financier** de l'écosystème (SaaS) : 3 plans, boost visibilité, analytics, badges, priorité algorithmique. Paiement **Mobile Money prioritaire**.

## 1. Objectif

Permettre au vendeur de souscrire un abonnement (Basic/Gold/Elite) pour augmenter sa visibilité, débloquer les analytics, obtenir des badges de confiance et une priorité algorithmique.

## 2. Rôles concernés (RBAC)

Vendeur (souscription/gestion). Admin peut activer/désactiver le système Premium (module 11 Settings).

## 3. User stories clés

- En tant que **vendeur**, je veux comparer les 3 plans clairement, afin de choisir vite.
- En tant que **vendeur**, je veux payer en Mobile Money, afin de souscrire facilement.
- En tant que **vendeur**, je veux upgrade/downgrade/pause, afin de gérer mon engagement.

## 4. Structure & layout

1. **Header (statut actuel)** : plan actuel (🆓 Basic / ⭐ Gold / 💎 Elite), date d'expiration, renouvellement auto ON/OFF, bouton « Gérer l'abonnement », indicateurs rapides (score visibilité, boost actif, revenus estimés, perf boutique).
2. **Comparaison des plans** (`ComparisonTable`) :
   - **Basic (gratuit)** : visibilité standard, mise en avant limitée, analytics basiques, pas de badge, commission standard.
   - **Gold** : boost modéré, badge ⭐ Gold, analytics avancées, promotions sponsorisées, meilleur classement, support prioritaire.
   - **Elite** : visibilité maximale, badge 💎 Elite, top ranking, analytics complètes + IA, boost auto, campagnes marketing, commission réduite, support VIP.
   - Tableau : Feature × (Basic/Gold/Elite) — Visibilité, Analytics, Badge, Ranking, Commission.
3. **Avantages détaillés** : boost visibilité (classement, reco, homepage, section sponsorisé), analytics avancées (ventes temps réel, conversion, origine clients, heatmaps), badges de confiance, priorité algorithmique, marketing boost.
4. **Preview analytics** : graphiques (ventes journalières, top produits, clics, conversion), analytics Afrique (pays/villes/zones/pics), IA insights (produit à potentiel, sous-performant, prix, marketing) — mock.
5. **Paiement** (`MobileMoneySelector` en tête) : MTN/Orange/Moov/Wave/Carte ; facturation mensuel/annuel (réduction) ; renouvellement auto ; confirmation (résumé plan, prix, durée, bouton « Confirmer l'abonnement »).
6. **Gestion** : upgrade, downgrade, cancel, pause, renouvellement auto ON/OFF.
7. **FAQ** + **Conditions** (visibilité, remboursement abonnement, usage badges, anti-fraude ranking).

## 5. Composants requis

- **Réutilisés** : `MobileMoneySelector`, `OtpInput`, `Badge`, `KpiCard`, `Charts`, `Accordion` (FAQ).
- **Spécifiques** : `PlanCard`, `ComparisonTable`, `SubscriptionHeader`, `SubscriptionManage`.

## 6. Données / types

`Plan` (tier, prix mensuel/annuel, features, visibilityBoost, commissionPct), `SellerTier`. `// TODO API: subscriptions`.

## 7. Règles métier

- Le **tier** influence la priorité (search, reco, homepage) et le badge affiché — cohérent avec `deriveBadges` et le ranking Ads (module 13).
- Analytics vendeur du dashboard (module 11) débloquées **uniquement** pour gold/elite.
- Paiement Mobile Money prioritaire + OTP ; jamais de vraie clé.
- Upgrade prend effet immédiat ; downgrade/pause selon règles (fin de période).

## 8. États UX

Chargement plans/preview : skeleton. Paiement : `verifying`/`success`/`failed`. Confirmation d'abonnement claire.

## 9. Contraintes Afrique

**Mobile Money obligatoire**, coût d'abonnement adapté, UX simple (upgrade en 1 clic), optimisation data, confirmation offline possible.

## 10. // TODO API / AI

`// TODO API: GET /plans`, `POST /subscriptions`, `POST /subscriptions/:id/cancel|pause|upgrade`. `// TODO AI: insights vendeur`.

## 11. Critères d'acceptation

- [ ] Header statut + comparaison 3 plans en tableau.
- [ ] Preview analytics (mock) présente.
- [ ] Paiement Mobile Money en tête + OTP.
- [ ] Gestion upgrade/downgrade/pause/renouvellement.
- [ ] Cohérence badge/tier avec ranking & analytics (modules 11/13).

## 12. Pièges à éviter

Ne pas débloquer les analytics à un basic. Ne pas mettre la carte avant Mobile Money. Ne pas dupliquer `MobileMoneySelector`. Ne pas promettre un avantage non implémenté (le marquer `// TODO`).
