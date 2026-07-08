# Module 07 — Boutique Vendeur (Store Front)

> Sprint 2. Rôle : **Acheteur / Vendeur**. Backend : mock. Dépend de : 02, 03, Socle.
> **Mini-Shopify public** intégré : vendre, rassurer, valoriser la marque, fidéliser.

## 1. Objectif

Vitrine publique du vendeur : convertir les visiteurs en acheteurs récurrents, renforcer la confiance (badges + reviews), valoriser la boutique.

## 2. Rôles concernés

Acheteur (vue publique). Le vendeur voit sa propre boutique (édition via son dashboard, module 11).

## 3. User stories clés

- En tant qu'**acheteur**, je veux parcourir les produits d'un vendeur et ses promos, afin d'acheter groupé.
- En tant qu'**acheteur**, je veux suivre la boutique, afin d'être notifié des nouveautés/flash sales.
- En tant qu'**acheteur**, je veux contacter le vendeur sur WhatsApp, afin de poser une question.

## 4. Structure & layout

1. **Header boutique** : bannière (full width desktop / crop mobile), logo (overlay), nom (SEO), **badges** (⭐ Verified, 👑 Premium, 💎 Elite, 🚀 Top Rated, 🇨🇲 Local), stats rapides (note, nb produits, commandes livrées, followers, temps réponse), actions rapides (❤️ suivre, 💬 contacter, 🔗 partager, 📌 enregistrer).
2. **Navigation interne (tabs)** : 🛍 Produits · 🔥 Promotions · ⭐ Best Sellers · 🆕 Nouveautés · 🏷 Collections · ℹ️ À propos.
3. **Filtres produits dédiés** + recherche interne boutique (autocomplete produits vendeur).
4. **Grille produits** (`ProductCard`, mobile 2 / tablette 3 / desktop 4–5) — **prix avec mode d'achat**.
5. **Promotions** (countdown, scroll horizontal), **Best Sellers** (classement auto, badge Top Seller), **Nouveautés** (tri chrono), **Collections** (mini-landing par collection).
6. **À propos** : description, histoire, localisation, spécialité, politiques livraison/retour, langues.
7. **Livraison** : zones, délais moyens, transporteurs, express possible, coût moyen.
8. **Contact** : chat direct, **WhatsApp** (dominant), email, temps de réponse.
9. **Reviews boutique** (`SellerReview`) : note globale, histogramme étoiles, avis, tri.
10. **Analytics publiques limitées** (si le vendeur autorise) : top produits, satisfaction, nb clients.
11. **Follow system** + **cross-selling** (produits similaires du vendeur, bundles).

**Sticky bottom bar mobile** : 🛍 Produits · ❤️ Suivre · 💬 Contacter · 🔍 Rechercher.

## 5. Composants requis

- **Réutilisés** : `ProductCard`, `PriceBlock`, `PurchaseModeChip`, `SellerBadge`, `StarRating`, `FollowButton`, `Accordion` (à propos), `SkeletonLoaders`.
- **Spécifiques** : `StoreHeader`, `StoreTabs`, `StoreFilters`, `CollectionCard`, `StoreReviews`, `StorePublicAnalytics`.

## 6. Données / types

`Seller`, `Product[]` (du vendeur), `SellerReview[]`, collections. `useFiltersStore` (scopé boutique). `// TODO API: GET /stores/:slug`.

## 7. Règles métier

- Badges vendeur dérivés (tier, KYC, note) — jamais arbitraires.
- Follow : notifications nouveautés/promos/flash (mock).
- Analytics publiques affichées **seulement** si le vendeur les a activées.
- Toute carte produit respecte le triptyque.

## 8. États UX

Grille : skeleton / `empty` (« Cette boutique n'a pas encore de produits ») / `error`. Onglet vide : message dédié.

## 9. Contraintes Afrique

**WhatsApp-first** pour le contact, FCFA, livraison locale (moto), badges de confiance mis en avant, images légères.

## 10. // TODO API / AI

`// TODO API: GET /stores/:slug`, `POST /stores/:id/follow`, `GET /stores/:id/reviews`. `// TODO AI: cross-selling`.

## 11. Critères d'acceptation

- [ ] Header complet (bannière/logo/badges/stats/actions).
- [ ] Tabs fonctionnels + filtres + recherche interne.
- [ ] Grille responsive ; prix **avec mode**.
- [ ] Follow + contact WhatsApp.
- [ ] Reviews boutique avec histogramme.
- [ ] Analytics publiques conditionnées à l'autorisation vendeur.

## 12. Pièges à éviter

Ne pas exposer d'analytics privées. Ne pas dupliquer `ProductCard`/`SellerBadge`. Ne pas poser de badge non justifié par une donnée.
