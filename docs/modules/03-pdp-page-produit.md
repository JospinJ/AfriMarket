# Module 03 — Page Produit (PDP)

> Sprint 2. Rôle : **Acheteur**. Backend : mock. Dépend de : 01, 02, Socle.
> **Point de décision** de l'écosystème : maximiser la conversion. **Les 3 modes d'achat sont obligatoires et centraux.**

## 1. Objectif

Permettre à l'acheteur de décider : acheter / comparer / sauvegarder. Page ultra-visuelle, persuasive, orientée achat immédiat, mobile-first.

## 2. Rôles concernés

Acheteur. Section vendeur intégrée (renvoie au Store Front, module 07).

## 3. User stories clés

- En tant qu'**acheteur**, je veux comparer Express vs Import vs Gros (prix/délai/MOQ), afin de choisir mon mode.
- En tant qu'**acheteur**, je veux partager le produit sur WhatsApp, afin de demander un avis.
- En tant qu'**acheteur** mobile, je veux une barre d'action fixe en bas, afin d'acheter sans scroller.

## 4. Structure & layout (ordre vertical mobile)

1. **Galerie** : images HD (zoom hover / pinch mobile), vidéo si dispo, 360° (option), fullscreen, swipe. Badges (🔥 Promo, ⭐ Best Seller, 🚚 Fast delivery).
2. **Nom + marque** (titre SEO).
3. **Sélecteur de mode d'achat (⚡ Express / 🌍 Import / 🏭 Gros)** — composant central : chaque mode montre **prix + délai + (MOQ si Gros)**. Le mode sélectionné pilote le `PriceBlock` et l'ajout au panier.
4. **PriceBlock** : prix courant, prix barré, `-X%`, économie totale (ex. `25 000 FCFA` ~~`35 000 FCFA`~~ `-30 %`).
5. **Stock** : en stock / rupture / urgence (« Plus que 3 restants ») selon l'offre du mode choisi.
6. **Info vendeur** : nom boutique, badges (⭐ vérifié, 👑 premium), note, taux de réponse, pays/ville.
7. **Social proof** : note moyenne (`StarRating`), nb d'avis, nb de ventes, nb de vues, taux de satisfaction.
8. **Livraison** : délai estimé dynamique selon localisation + mode, coût (gratuit/payant), options.
9. **Zone d'action** : `Acheter maintenant` (checkout direct), `Ajouter au panier`, `❤️ Wishlist`, `🔗 Partage (WhatsApp dominant, Facebook, TikTok, lien copiable)`.
10. **Variantes** : chips sélectionnables (taille/couleur/modèle), stock par variante.
11. **Détails techniques** : description, spécifications, matériaux, dimensions, compatibilité.
12. **Offres & promotions** : flash sale, coupon, bundle, livraison gratuite conditionnelle.
13. **Recommandations IA (mock)** : « Produits similaires », « Fréquemment achetés ensemble », « Pour vous ».
14. **Section vendeur** : mini-boutique + produits du vendeur + « Voir la boutique ».
15. **Garanties & confiance** : retour 7–30 j, paiement sécurisé, authentification produit, support.
16. **Q&A** : questions utilisateurs + réponses vendeur, FAQ dynamique.

**Sticky bottom bar mobile** : ❤️ Wishlist · 🛒 Panier · 🟢 Acheter.
**Desktop** : résumé produit **sticky** (prix + mode + CTA) à droite pendant le scroll.

## 5. Composants requis

- **Réutilisés** : `PriceBlock`, `PurchaseModeChip`, `StarRating`, `SellerBadge`, `Badge`, `StatusTimeline` (livraison estimée), `ProductCard` (recommandations), `SkeletonLoaders`.
- **Spécifiques** : `ProductGallery` (zoom/360°), `PurchaseModeSelector`, `VariantPicker`, `SellerMiniCard`, `QnASection`, `StickyBuyBar`.

## 6. Données / types

`Product` (3 offres + variantes + specs), `Seller`, avis liés (module 09), recommandations mock. Mode courant dans `usePurchaseModeStore` (propagé jusqu'au checkout). `// TODO AI: recommandations`, `// TODO API: GET /products/:slug`.

## 7. Règles métier

- Le prix, le délai, le stock et l'ajout au panier dépendent **du mode sélectionné**.
- Mode **Gros** : afficher le MOQ ; l'ajout au panier impose `quantity ≥ moq`.
- Économie calculée via `computeSaving`.
- Le mode choisi est mémorisé et transmis au panier/checkout (pas de changement silencieux).

## 8. États UX

Galerie/reco : skeleton. Rupture : CTA « Prévenez-moi » (mock) + désactivation achat. Avis vides : `empty`. Erreur chargement : `error` + retry.

## 9. Contraintes Afrique

Partage **WhatsApp dominant**, FCFA, livraison moto mentionnée, images compressées, Mobile Money évoqué dès la zone d'achat.

## 10. // TODO API / AI

`// TODO API: GET /products/:slug`, `POST /wishlist`, `GET /products/:id/qna`. `// TODO AI: similaires / bundles / "pour vous"`.

## 11. Critères d'acceptation

- [ ] Les 3 modes affichés avec prix + délai (+ MOQ pour Gros) ; sélection pilote tout.
- [ ] Aucun prix sans mode ; `Product` a 3 offres (invariant).
- [ ] Sticky buy bar mobile + résumé sticky desktop.
- [ ] Partage WhatsApp présent et dominant.
- [ ] Variantes avec stock par variante ; MOQ respecté en Gros.
- [ ] Galerie zoom + swipe ; lazy loading.

## 12. Pièges à éviter

Ne pas figer le prix sur un seul mode. Ne pas oublier le MOQ en Gros. Ne pas dupliquer `StarRating`/`SellerBadge`. Ne pas alourdir la galerie (360° en `dynamic()`).
