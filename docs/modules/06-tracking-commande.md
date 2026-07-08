# Module 06 — Tracking commande

> Sprint 3. Rôle : **Acheteur**. Backend : partiel (`// TODO API`). Dépend de : 05, Socle.
> Page de **réassurance** : suivre en temps réel, estimer l'arrivée, contacter livreur/support. **Fallback SMS obligatoire** (connectivité variable).

## 1. Objectif

Transparence totale post-achat : où est le colis, quand il arrive, comment contacter, comment annuler (avant expédition).

## 2. Rôles concernés

Acheteur (vue). Le livreur alimente le statut via son dashboard (module 11). Support accessible.

## 3. User stories clés

- En tant qu'**acheteur**, je veux voir la progression et l'ETA, afin de m'organiser.
- En tant qu'**acheteur**, je veux contacter le livreur sur WhatsApp, afin de préciser l'adresse.
- En tant qu'**acheteur**, je veux annuler avant expédition, afin de changer d'avis à temps.

## 4. Structure & layout

1. **Header commande** : n° commande, date, **statut global** (ex. 🟡 En cours de livraison), vendeur(s), montant, nb d'articles, adresse.
2. **Timeline 5 étapes** : `Confirmée → Préparée → Expédiée → En livraison → Livrée` (icônes ; vert = fait, jaune = en cours, gris = à venir). Vertical mobile / horizontal desktop.
3. **Carte GPS live** : position livreur (icône moto/voiture), route, point de livraison, **ETA** (« Arrivée estimée : 18 min »). **Fallback SMS** si GPS indisponible + mises à jour périodiques.
4. **Info livreur** (`DriverCard`) : nom, photo, note, véhicule, actions (appeler, message, **WhatsApp**).
5. **Détails commande** : produits (image, nom, qté, mode, prix, vendeur), multi-vendeurs (statut par boutique), résumé prix.
6. **Adresse de livraison** : destinataire, téléphone, quartier, instructions/repère.
7. **Actions** : contacter support, contacter livreur, **annuler (avant expédition uniquement)**, modifier instructions.

**Sticky bottom bar mobile** : Appeler support · Suivre livreur · Chat vendeur. Carte fullscreen swipeable ; timeline collapsible.

## 5. Composants requis

- **Réutilisés** : `StatusTimeline`, `DriverCard`, `PriceBlock`, `PurchaseModeChip`, `SkeletonLoaders`, `GeoMap`.
- **Spécifiques** : `TrackingHeader`, `LiveMap` (dynamic), `TrackingActions`, `SmsFallbackNotice`.

## 6. Données / types

`DeliveryTracking` (5 steps, driver, position, ETA, otpCode), `Order`, `Driver`. `// TODO API: position live` + `// TODO API: canal SMS`.

## 7. Règles métier

- **Annulation possible uniquement avant `shipped`.** Après, l'action est masquée/désactivée.
- ETA dynamique ; en zone rurale, ETA large accepté.
- Validation livraison à la réception : **OTP** / code unique / signature digitale.
- Notifications temps réel (statut) sur push + SMS + WhatsApp.

## 8. États UX

Chargement carte : skeleton + message. GPS indisponible : bascule explicite « Suivi par SMS ». Erreur : retry. Commande livrée : état final + CTA (laisser un avis → module 09).

## 9. Contraintes Afrique

GPS intermittent → **fallback SMS** garanti, mises à jour périodiques (économie data), WhatsApp livreur dominant, livraison moto, COD suivi par OTP.

## 10. // TODO API / AI

`// TODO API: GET /orders/:id/tracking`, `GET /drivers/:id/position`, `POST /orders/:id/cancel`, `POST /notifications/sms`. `// TODO AI: détection retard + compensation`.

## 11. Critères d'acceptation

- [ ] Timeline 5 étapes avec états colorés corrects.
- [ ] Carte live + ETA ; **fallback SMS** visible et fonctionnel (mock).
- [ ] `DriverCard` avec WhatsApp.
- [ ] Annulation seulement avant expédition (règle respectée).
- [ ] Multi-vendeurs : statut par boutique.
- [ ] Carte lourde chargée en `dynamic()`.

## 12. Pièges à éviter

Ne pas rendre l'annulation possible après expédition. Ne pas dépendre uniquement du GPS. Ne pas charger la carte en synchrone. Ne pas dupliquer `StatusTimeline`.
