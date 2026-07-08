# Module 13 — Publicité / Sponsoring (Ads Manager)

> Sprint 6. Rôle : **Vendeur / Admin**. Backend : oui (`// TODO API`). Dépend de : 11, 12, Socle.
> **Ad Manager type Amazon Ads / Meta Ads** intégré : moteur de revenus publicitaires + ciblage + IA d'optimisation.

## 1. Objectif

Permettre au vendeur de booster ses produits : créer une campagne (budget, durée, ciblage), prévisualiser, suivre en live (impressions/CTR/conversions/ROI), facturer, optimiser (IA mock). Permissions RBAC strictes.

## 2. Rôles concernés (RBAC)

- **Seller basic** : campagnes **limitées** (budget/placements restreints, ciblage simple).
- **Seller premium (gold/elite)** : campagnes avancées + ciblage complet.
- **Admin** : contrôle global du système Ads + modération.

## 3. User stories clés

- En tant que **vendeur**, je veux sponsoriser un produit avec un budget quotidien, afin d'augmenter mes ventes.
- En tant que **vendeur premium**, je veux cibler par ville et comportement, afin d'optimiser le ROI.
- En tant qu'**admin**, je veux modérer les campagnes, afin d'éviter les abus.

## 4. Structure & layout

1. **Sélection produit à sponsoriser** : liste produits vendeur (image, prix, stock, perf actuelle), statut d'éligibilité, bouton « Sponsoriser », score de potentiel IA.
2. **Création campagne** :
   - **Budget** : total, quotidien, CPC, CPM, auto-optimisation ON/OFF, coût estimé/jour.
   - **Durée** : 1/7/14/30 j ou personnalisée, campagne continue.
   - **Objectif** : ventes / clics / visibilité / branding / add-to-cart.
   - **Stratégie d'enchères** : auto (IA) / manuel.
   - **Ciblage** : géo (pays/région/ville/rural-urbain), démo (âge/genre/langue/type user), comportement (a vu produit similaire, a ajouté au panier, acheteur récent, visiteur actif), IA targeting (lookalike, intention d'achat).
3. **Types de publicité** : produit boosté (haut de recherche + badge « Sponsorisé » + homepage), bannière home, reco IA (« Pour vous »), search ads, shop ads (boutique entière).
4. **Prévisualisation** : estimation impressions/jour, clics, conversions, CPA estimé (simulation type Google Ads).
5. **Performance live** : impressions, clics, CTR, conversions, ventes, **ROI/ROAS** ; graph temps réel (clics vs ventes), heatmap trafic.
6. **Gestion campagnes** : pause, modifier budget/ciblage, arrêter, dupliquer ; statuts (active/paused/ended/rejected/in_review).
7. **Facturation** : budget consommé/restant, CPC/CPA réels, historique, méthodes (**Mobile Money**, carte, wallet).
8. **IA optimisation (mock)** : ajustement budget auto, ciblage intelligent, suggestion produits, prédiction ROI, meilleures heures.
9. **Modération (admin)** : validation produit sponsorisé, détection fraude clics, blocage campagnes abusives, vérification contenu.

## 5. Composants requis

- **Réutilisés** : `MobileMoneySelector`, `KpiCard`, `Charts`, `DataTable`, `Badge`, `ProductCard` (sélection).
- **Spécifiques** : `CampaignForm`, `TargetingPanel`, `AdTypePicker`, `CampaignPreview`, `CampaignLivePanel`, `AdsModeration` (admin).

## 6. Données / types

`AdCampaign` (objective, placements, budget, targeting, metrics, status). `// TODO API` + `// TODO AI`.

## 7. Règles métier (RBAC + limites)

- Limites de budget/ciblage/placements **selon le tier** (basic limité, premium complet, admin total).
- Budget minimum requis ; produits autorisés uniquement ; interdiction de contenu trompeur ; respect politique marketplace.
- Auto-stop si budget atteint. Le tier influence aussi le ranking (cohérent avec module 12).
- Paiement Mobile Money prioritaire ; jamais de vraie clé.

## 8. États UX

Sélection vide : `empty` (« Aucun produit éligible »). Création : validation par étape. Live : skeleton puis mise à jour. Campagne refusée : motif affiché.

## 9. Contraintes Afrique

**Mobile Money prioritaire**, optimisation low-bandwidth, images compressées, UX simple (1 clic sponsorisation), data optimisée, ciblage géo Afrique.

## 10. // TODO API / AI

`// TODO API: GET /ads/eligible-products`, `POST /ads/campaigns`, `GET /ads/campaigns/:id/live`, `POST /ads/payments`. `// TODO AI: optimisation, lookalike, prédiction ROI`.

## 11. Critères d'acceptation

- [ ] Flux complet : sélection → création (budget/ciblage/objectif) → preview → live → facturation.
- [ ] Limites RBAC par tier (basic vs premium vs admin) appliquées (UI **et** route).
- [ ] Ciblage géo/démo/comportemental présent.
- [ ] Paiement Mobile Money en tête.
- [ ] Modération admin disponible.
- [ ] Hooks IA mockés et marqués.

## 12. Pièges à éviter

Ne pas donner le ciblage complet à un basic. Ne pas dupliquer KpiCard/Charts. Ne pas facturer sans Mobile Money. Ne pas simuler une vraie régie payante.
