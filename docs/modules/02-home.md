# Module 02 — Page d'accueil (Home)

> Sprint 1. Rôle : **Acheteur**. Backend : mock. Dépend de : 01, Socle.
> **Rappels invariants** : triptyque visible dès la carte produit, badges data-driven, FCFA, mobile-first, design clair côté produit.

## 1. Objectif

Convertir dès l'arrivée : découverte de produits, boutiques, offres, et **recherche locale intelligente** (différenciateur vs Amazon). La Home met en scène le triptyque Express/Import/Gros sur chaque carte produit.

## 2. Rôles concernés

Acheteur (public). Les CTA business (Devenir vendeur/livreur, Premium) restent présents mais secondaires.

## 3. User stories clés

- En tant qu'**acheteur**, je veux voir des produits pertinents près de moi, afin d'acheter local et vite.
- En tant qu'**acheteur**, je veux filtrer transversalement (prix, catégorie, localisation, premium, livraison rapide, note), afin d'affiner.
- En tant qu'**acheteur**, je veux repérer les offres flash et nouveautés, afin de profiter des promos.

## 4. Structure & layout (mobile-first)

Ordre vertical :

1. **Hero / bannières** (Swiper) — promos du moment, CTA.
2. **Barre de filtres transversaux** (sticky sous la navbar) : prix, catégorie, localisation, vendeur premium, livraison rapide, note.
3. **Recherche locale intelligente** : « Produits près de moi », « Vendeurs dans ma ville », « Livraison rapide locale ».
4. **Catégories rapides** (chips/scroll horizontal).
5. **Offres Flash** (countdown, carrousel horizontal, badge ⚡).
6. **Recommandé pour vous** (mock IA `// TODO AI`).
7. **Nouveautés** (badge 🆕).
8. **Boutiques Premium** (carrousel de `SellerBadge`).
9. **Feed produits** — grille responsive : mobile 2 col / tablette 3 / desktop 4–5, scroll infini intelligent (mock).

Chaque **`ProductCard`** affiche : image, titre court, `PriceBlock` **avec `PurchaseModeChip`** (mode sélectionné par défaut = Express), note (`StarRating`), badges dynamiques, actions (voir, ajouter panier, wishlist).

## 5. Composants requis

- **Réutilisés** : `ProductCard`, `PriceBlock`, `PurchaseModeChip`, `Badge`, `StarRating`, `SellerBadge`, filtres (`FiltersBar` partagé), `SkeletonLoaders`.
- **Spécifiques** : `HeroCarousel`, `FlashSaleSection`, `LocalSearchBlock`, `CategoryChips`, `ProductFeed` (infinite scroll).

## 6. Données / types

`Product[]` (mock, chacun avec 3 offres), `Seller[]`, catégories, offres flash. Filtres via `useFiltersStore`. `// TODO API: GET /home/feed`, `// TODO AI: recommandations`.

## 7. Règles métier

- Tout prix affiché passe par `PriceBlock` + mode. Aucune carte sans mode.
- Badges dérivés (`deriveBadges`) : flash_sale si `originalPrice > price`, new si < 30 j, fast_delivery si Express ≤ 2 j, etc. Jamais posés à la main.
- Le filtre transversal s'applique à **toutes** les sections produits de la Home.

## 8. États UX

Feed : skeleton au chargement, `empty` (« Aucun produit pour ces filtres » + reset), `error` (retry). Countdown flash : géré côté client.

## 9. Contraintes Afrique

Recherche locale mise en avant, FCFA, images lazy-loadées, scroll infini économe (pagination mock), premières cartes prioritaires (LCP).

## 10. // TODO API / AI

`// TODO API: GET /home/feed`, `GET /flash-sales`, `GET /stores/premium`. `// TODO AI: recommandations "Pour vous"`.

## 11. Critères d'acceptation

- [ ] Toute `ProductCard` rend un prix **avec** son mode (test d'invariant).
- [ ] Filtres transversaux fonctionnels et appliqués à toutes les sections.
- [ ] Recherche locale présente et visible.
- [ ] Grille responsive 2/3/4–5 colonnes ; scroll infini mock sans jank.
- [ ] Offres flash avec countdown ; badges data-driven.
- [ ] LCP < 2,5 s (3G simulée) sur le premier écran.

## 12. Pièges à éviter

Pas de prix « nu ». Pas de badge décoratif. Ne pas recharger toute la page au changement de filtre (state client). Ne pas dupliquer `ProductCard`.
