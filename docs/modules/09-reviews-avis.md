# Module 09 — Reviews / Avis

> Sprint 4. Rôle : **Tous**. Backend : oui (`// TODO API`). Dépend de : 03, 05, 06, 07, Socle.
> **Système de réputation** type Amazon + Uber + Jumia combiné : produit + vendeur + livraison, avec IA anti-fraude et analytics.

## 1. Objectif

Construire la confiance : évaluer produit, vendeur et livraison ; filtrer les vendeurs frauduleux ; alimenter la recommandation. Pilier anti-fraude + moteur de conversion.

## 2. Rôles concernés (RBAC)

Tous peuvent lire. Un acheteur **verified** peut noter ce qu'il a acheté. Vendeur/livreur peuvent répondre. Support/Admin modèrent.

## 3. User stories clés

- En tant qu'**acheteur vérifié**, je veux noter le produit avec photos, afin d'aider les autres.
- En tant que **vendeur**, je veux répondre à un avis, afin de traiter une insatisfaction.
- En tant que **support**, je veux masquer un faux avis, afin de préserver la confiance.

## 4. Structure — 3 onglets

`⭐ Produit | 🏪 Vendeur | 🚚 Livraison` + (pour admin) **Dashboard global des avis**.

**Review produit** : auteur (avatar, nom, **badge achat vérifié**), note globale, critères (qualité, conformité, rapport qualité/prix, satisfaction), commentaire (+ emojis, traduction option IA), médias (photos/vidéos UGC), contexte (commande ID, date, variante), actions (👍 utile, 🚨 signaler, réponse vendeur). Stats : note moyenne, distribution étoiles, taux satisfaction, taux retour. Filtres : récents, utiles, avec images, 1★–5★, acheteurs vérifiés.

**Review vendeur** : critères (communication, respect délais, qualité, fiabilité, service), recommandation oui/non, stats (rating global, temps réponse moyen, taux livraison réussie, taux retour, satisfaction), badges (⭐ Verified, 👑 Premium, 💎 Elite, ⚠️ Risk).

**Review livraison** : livreur (nom, photo, véhicule), critères (rapidité, respect délai, état colis, communication, professionnalisme), détails (départ, destination, distance, durée réelle vs estimée), stats (rating, taux à temps, zones performantes, taux incidents), badges (⚡ Fast, 🛡 Reliable, ⭐ Top Rated, ⚠️ Under Review).

**Dashboard global (admin)** : total reviews, satisfaction moyenne, taux vérifiés, taux incidents, analytics par pays/ville/boutique/catégorie, IA (sentiment analysis, détection fake, score confiance).

## 5. Composants requis

- **Réutilisés** : `StarRating`, `VerifiedBuyerBadge`, `SellerBadge`, `Badge`, `DataTable` (dashboard), `Charts`, `SkeletonLoaders`.
- **Spécifiques** : `ReviewTabs`, `ReviewCard`, `RatingDistribution`, `ReviewFilters`, `ReviewMediaGallery`, `ModerationPanel`.

## 6. Données / types

`ProductReview`, `SellerReview`, `DeliveryReview` (voir glossaire), liés à `Order`/`Product`/`Seller`/`Driver`. `// TODO API: GET/POST /reviews`.

## 7. Règles métier & modération

- Un avis n'est **verified** que s'il est lié à une commande réelle de l'auteur.
- Modération : supprimer, masquer, bannir, marquer suspect, vérifier preuve d'achat.
- **IA anti-fraude (mock `// TODO AI`)** : détection spam, fake reviews, insultes, manipulation de note.
- Interactions : 👍/👎, réponse (vendeur/support), signalement, partage.

## 8. États UX

Liste vide : `empty` (« Soyez le premier à donner votre avis »). Chargement : skeleton. Envoi avis : validation (note requise) + feedback.

## 9. Contraintes Afrique

**Avis vocaux** 🎤, images compressées, multi-langue, mobile-first, offline review sync, simplicité d'écriture.

## 10. // TODO API / AI

`// TODO API: GET /reviews?kind=&targetId=`, `POST /reviews`, `POST /reviews/:id/report`, `POST /reviews/:id/reply`. `// TODO AI: sentiment / fake detection / trust score`.

## 11. Critères d'acceptation

- [ ] 3 onglets (produit/vendeur/livraison) structurés distinctement.
- [ ] Badge **achat vérifié** conditionné à une commande.
- [ ] Distribution étoiles + stats par type.
- [ ] Filtres avancés (dont « avec images », « vérifiés »).
- [ ] Modération (actions admin) + hooks IA mockés.
- [ ] Support des médias et vocaux.

## 12. Pièges à éviter

Ne pas afficher « vérifié » sans commande liée. Ne pas dupliquer `StarRating`. Ne pas mélanger les 3 types dans une même structure. Ne pas exposer la modération à des non-admins.
