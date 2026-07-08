# Module 04 — Panier (Cart)

> Sprint 2. Rôle : **Acheteur**. Backend : mock. Dépend de : 03, Socle.
> Point critique du tunnel : confirmer l'intention, augmenter le panier moyen, réduire l'abandon, préparer le checkout. **Multi-vendeurs** géré proprement.

## 1. Objectif

Afficher et gérer le panier, avec validation stock/MOQ, séparation multi-vendeurs, coupon, recommandations, et CTA « Passer la commande » toujours visible.

## 2. Rôles concernés

Acheteur.

## 3. User stories clés

- En tant qu'**acheteur**, je veux ajuster les quantités avec validation stock/MOQ, afin d'éviter les erreurs.
- En tant qu'**acheteur**, je veux comprendre que mon panier contient plusieurs vendeurs, afin d'anticiper des livraisons distinctes.
- En tant qu'**acheteur**, je veux appliquer un coupon, afin de réduire le total.

## 4. Structure & layout

**Desktop** : 2 colonnes — gauche (liste produits) / droite (**résumé sticky**).
**Mobile** : colonne unique + **résumé sticky en bas** (total + bouton checkout).

**Carte produit du panier** : image, nom, vendeur (`SellerBadge`), variante, **mode d'achat (chip)**, disponibilité, prix unitaire, promo, total ligne, `QuantityStepper` (➖/input/➕ avec validation stock + MOQ), actions (supprimer, sauvegarder pour plus tard, → wishlist), estimation livraison par vendeur.

**Multi-vendeurs** : séparation automatique par boutique (bandeau « Votre panier contient N vendeurs différents »), livraison/délai par vendeur.

**Résumé (sticky)** : sous-total, livraison estimée (standard/express), taxes/frais éventuels, réduction coupon, **total final** large et visible, CTA `Passer la commande`.

**Sections complémentaires** : code promo (input + appliquer + validation), recommandations (« Fréquemment achetés ensemble », même vendeur, IA mock), nudge d'optimisation (« Ajoutez 2 000 FCFA pour la livraison gratuite »).

## 5. Composants requis

- **Réutilisés** : `PriceBlock`, `PurchaseModeChip`, `QuantityStepper` (MOQ), `SellerBadge`, `OrderSummary`, `ProductCard` (reco), `SkeletonLoaders`.
- **Spécifiques** : `CartItemRow`, `MultiVendorGroup`, `CouponInput`, `CartSummarySticky`, `CartUpsell`.

## 6. Données / types

`Cart`, `CartItem[]` (avec `mode`, `quantity`), groupés par `sellerId`. `useCartStore` (add/remove/update/coupon). `// TODO API: POST /coupons/validate`.

## 7. Règles métier

- `quantity` respecte le stock ; en mode **Gros**, `quantity ≥ moq` (bloquer sinon, message clair).
- Total ligne = `unitPrice × quantity − promo`. Sous-total = somme des lignes.
- Livraison estimée par vendeur (multi-vendeurs = plusieurs délais).
- Coupon : `%`, montant fixe, ou livraison gratuite ; détecter expiré/invalide.
- Panier **sauvegardé automatiquement** (persistance store) + synchro multi-device (mock).
- Gestion d'erreurs live : produit retiré du stock, prix changé, quantité indisponible → mise à jour + notification.

## 8. États UX

Panier vide : `empty` illustré + CTA « Découvrir des produits ». Chargement reco : skeleton. Coupon invalide : message d'erreur inline.

## 9. Contraintes Afrique

FCFA partout, livraison moto/point relais évoquée, Mobile Money annoncé au checkout, mobile-first (résumé sticky bas), WhatsApp checkout possible (option).

## 10. // TODO API / AI

`// TODO API: POST /coupons/validate`, `GET /cart` (sync). `// TODO AI: recommandations panier`.

## 11. Critères d'acceptation

- [ ] Chaque ligne montre le **mode d'achat** et un prix ; jamais de prix nu.
- [ ] Validation stock + MOQ (Gros) opérationnelle et bloquante.
- [ ] Multi-vendeurs : séparation visuelle + délais distincts.
- [ ] Résumé sticky (desktop droite / mobile bas) ; CTA toujours visible.
- [ ] Coupon appliqué/refusé avec feedback.
- [ ] Panier persistant après refresh.

## 12. Pièges à éviter

Ne pas fusionner des vendeurs différents dans une seule livraison. Ne pas permettre `quantity < moq` en Gros. Ne pas perdre le mode d'achat choisi au PDP. Ne pas recalculer via des valeurs non typées.
