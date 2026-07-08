# Module 08 — Messages / Chat

> Sprint 4. Rôle : **Tous**. Backend : oui (`// TODO API`). Dépend de : 01, 05, 06, 07, Socle.
> **Centre nerveux de la marketplace** : pas un simple messaging, mais un CRM + logistique + support + tracking intégrés. Type WhatsApp/Messenger, orienté action.

## 1. Objectif

Hub de communication temps réel entre : Acheteur↔Vendeur, Acheteur↔Support, Acheteur↔Livreur, Vendeur↔Livreur, Support↔tous. Chaque message peut déclencher une action (voir commande, suivre livraison, contacter livreur, ouvrir litige).

## 2. Rôles concernés (RBAC)

Tous. Le **rôle** de chaque interlocuteur est affiché (badge buyer/seller/driver/support). Support peut modérer, escalader, ajouter admin.

## 3. User stories clés

- En tant qu'**acheteur**, je veux envoyer un vocal au vendeur, afin de communiquer sans taper.
- En tant que **vendeur**, je veux voir la commande liée à la conversation, afin de répondre avec contexte.
- En tant que **support**, je veux créer un ticket depuis un chat, afin de tracer un problème.

## 4. Structure — 3 zones

1. **Sidebar (conversations)** : avatar, statut en ligne, nom boutique/livreur, dernier message, heure, badge non-lus, indication contexte (commande liée). Filtres : Tous / Acheteurs / Vendeurs / Livraisons / Support / Non lus. Search (utilisateur/boutique/commande).
2. **Zone chat** : messages (avatar, nom, **badge rôle**, contenu, heure, statut envoyé ✔ / livré ✔✔ / vu 👁). Types supportés : texte, emoji, image, vidéo, **vocal**, localisation GPS, lien produit cliquable, statut commande intégré, fichier facture, sticker. Actions message : répondre, réagir, copier, signaler, supprimer (selon rôle), épingler (seller/support). Barre input : texte, emoji, 📎 upload, 🎤 micro, 📷 caméra, ➤ envoyer.
3. **Panel contexte (droite)** : profil interlocuteur (nom, rôle, statut, note, badges) ; si vendeur → boutique + produits récents + « voir boutique » ; si commande liée → ID, statut, montant, produits, bouton tracking ; si livraison → livreur, mini-carte GPS, ETA ; si support → ticket ID, priorité, catégorie.

**Mobile** : sidebar et panel en drawers ; zone chat plein écran.

## 5. Composants requis

- **Réutilisés** : `RoleBadge`, `StatusTimeline` (contexte commande), `GeoMap` (mini), `SellerBadge`, `StarRating`, `SkeletonLoaders`.
- **Spécifiques** : `ConversationSidebar`, `ChatWindow`, `MessageBubble`, `MediaMessage`, `VoiceMessage`, `ChatInputBar`, `ContextPanel`.

## 6. Données / types

`Conversation`, `Message` (type, contenu, statut, auteur+rôle), lien optionnel vers `Order`/`DeliveryTracking`/`Seller`/`Dispute`. `// TODO API` (temps réel : WebSocket/polling).

## 7. Règles métier & sécurité

- **Chat contextuel** : une conversation peut être liée à commande / livraison / boutique / paiement / litige → propose des actions rapides.
- Sécurité : chiffrement (Agent 7), signalement abus, blocage utilisateur, filtrage contenu, **historique audit** côté admin.
- IA optionnelle (mock) : réponses rapides vendeur, traduction (français/anglais/pidgin), résumé conversation, détection fraude → `// TODO AI`.
- Support : création ticket depuis chat + escalade + ajout admin.

## 8. États UX

Liste vide : `empty`. Chargement historique : skeleton. Envoi : optimistic UI + statut. Offline : file d'attente + sync (mode offline).

## 9. Contraintes Afrique

**Vocaux prioritaires** (écriture difficile), **WhatsApp-like**, faible bande passante (compression images auto), mode offline sync, langues locales.

## 10. // TODO API / AI

`// TODO API: GET /conversations`, `GET /conversations/:id/messages`, `POST /messages`, temps réel. `// TODO AI: réponses rapides / traduction / résumé / détection fraude`.

## 11. Critères d'acceptation

- [ ] 3 zones (sidebar / chat / panel contexte).
- [ ] Badges de rôle sur chaque message.
- [ ] Types riches dont **vocal** et localisation.
- [ ] Panel contexte lié (commande/livraison/boutique/litige) avec actions.
- [ ] Filtres + search sidebar.
- [ ] Signalement + blocage disponibles.

## 12. Pièges à éviter

Ne pas oublier le vocal (prioritaire). Ne pas afficher un chat sans contexte actionnable. Ne pas dupliquer la mini-timeline/carte. Ne pas charger tout l'historique d'un coup (pagination).
