# Module 10 — Litiges / Disputes

> Sprint 4. Rôle : **Acheteur / Vendeur / Livreur / Support**. Backend : oui (`// TODO API`). Dépend de : 05, 06, 08, 09, Socle.
> Infrastructure **critique de confiance et de sécurité financière** : gestion des conflits + médiation + remboursement + traçabilité + anti-fraude.

## 1. Objectif

Gérer tous les conflits (commande, livraison, paiement, produit) entre acheteur, vendeur, livreur et support, avec preuves, chat dédié, médiation neutre, résolution financière et audit complet.

## 2. Rôles concernés (RBAC)

Acheteur/Vendeur/Livreur (parties). **Support/Admin = arbitre neutre** (analyse, décision, remboursement, escalade). Un litige n'est modéré que par le support.

## 3. User stories clés

- En tant qu'**acheteur**, je veux ouvrir un litige avec preuves, afin d'être remboursé si non-livraison.
- En tant que **support**, je veux comparer les preuves et décider, afin de trancher équitablement.
- En tant que **vendeur**, je veux contester avec mes preuves, afin de me défendre.

## 4. Structure & layout

**Queue (liste)** : carte litige = ID, type (commande/livraison/paiement/produit), priorité (low/medium/high/critical), acteurs, commande liée (n°, produit, montant, statut), problème résumé, **statut** (open/mediation/awaiting_evidence/resolved/rejected/refunded), dates + **SLA restant**, indicateurs (urgence, risque fraude, score confiance).

**Détail litige** :
- **Contexte commande** (ID, produits, prix, paiement, adresse, transporteur).
- **Profils impliqués** (acheteur : historique, taux litiges, score confiance ; vendeur : rating, KYC, historique ; livreur : perf, incidents).
- **Description** (texte + catégorie : non_livraison, endommagé, mauvais produit, remboursement, fraude).
- **Preuves multi-format** (`EvidenceUploader`) : images, vidéos, documents, reçus, screenshots chat, preuve GPS — avec zoom, download, **horodatage auto**, vérification intégrité.
- **Chat de litige** (réutilise le module 08) entre support/vendeur/acheteur/livreur, avec messages système et demandes de preuve.
- **Médiation support** : analyser, demander complément, contacter parties, escalader admin ; IA (mock) : analyse fraude, scoring, suggestion décision, résumé.
- **Remboursement** : types (total/partiel/remplacement/crédit/rejet), détails financiers (payé, remboursé, frais plateforme, frais livraison, compensation vendeur), méthodes (Mobile Money, carte, wallet, crédit boutique).
- **Timeline d'audit** (`StatusTimeline`) : chaque événement horodaté + auteur.

**Dashboard litiges (admin/support)** : total, ouverts, taux résolution, délai moyen, taux fraude ; analytics Afrique (pays/zones à risque, vendeurs/livreurs problématiques) ; alertes (pic, fraude, vendeur signalé, livraison en échec répétée).

## 5. Composants requis

- **Réutilisés** : `StatusTimeline`, `Chat` (module 08 réutilisé), `EvidenceUploader`, `DataTable`, `Charts`, `Badge`, `MobileMoneySelector` (remboursement).
- **Spécifiques** : `DisputeQueue`, `DisputeDetail`, `RefundPanel`, `MediationTools`, `DisputeDashboard`.

## 6. Données / types

`Dispute` (type, statut, priorité, evidences, SLA, timeline, resolution, refundAmount). Liens `Order`/`User`/`Seller`/`Driver`. `// TODO API` + `// TODO AI`.

## 7. Règles métier (automatiques)

- **Auto-création** d'un litige si non-livraison après **X jours** (paramétrable).
- Remboursement auto si preuve valide (selon règles) ; sinon médiation.
- Blocage vendeur si fraude répétée ; suspension livreur si incidents fréquents.
- SLA de résolution suivi ; escalade automatique au dépassement.

## 8. États UX

Queue vide : `empty`. Upload preuve : progress + validation format/poids. Décision : confirmation + notification aux parties.

## 9. Contraintes Afrique

Faible connectivité → **upload compressé**, **preuve vocale** possible, mobile-first, chat WhatsApp-like, remboursement **Mobile Money** prioritaire.

## 10. // TODO API / AI

`// TODO API: GET /disputes`, `GET /disputes/:id`, `POST /disputes`, `POST /disputes/:id/evidence`, `POST /disputes/:id/resolve`, `POST /refunds`. `// TODO AI: fraude / scoring / suggestion décision / résumé`.

## 11. Critères d'acceptation

- [ ] Queue + détail complets (contexte, profils, preuves, chat, médiation, remboursement, timeline).
- [ ] Preuves multi-format avec horodatage.
- [ ] Chat de litige réutilise le module 08 (pas de doublon).
- [ ] Remboursement multi-méthode dont Mobile Money.
- [ ] Règles auto (non-livraison → litige) implémentées (mock).
- [ ] Modération réservée au support/admin (RBAC).

## 12. Pièges à éviter

Ne pas réimplémenter un chat. Ne pas exposer la médiation aux parties. Ne pas oublier l'audit trail. Ne pas permettre à un rôle non-support de décider d'un remboursement.
