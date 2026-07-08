# Module 15 — Zones de livraison (Delivery Zones)

> Sprint 7. Rôle : **Admin / Livreur**. Backend : oui (`// TODO API`). Dépend de : 11, Socle.
> **Cœur logistique Afrique** : où l'on livre, combien ça coûte, combien de temps, quels types. Consommé par le Checkout (module 05) pour la validation de zone.

## 1. Objectif

Définir et piloter toute la logique logistique : couverture, coûts, délais, types de livraison, activation de zones, analytics — pour une expansion contrôlée et une UX fiable.

## 2. Rôles concernés (RBAC)

- **Admin** : gestion complète (activer/désactiver, frais, délais, restrictions, analytics).
- **Livreur** : consultation des zones/attributions (perso).

## 3. User stories clés

- En tant qu'**admin**, je veux activer une nouvelle ville, afin d'étendre la couverture.
- En tant qu'**admin**, je veux ajuster les frais par zone, afin de rester rentable.
- En tant que **système checkout**, je veux vérifier si une adresse est couverte, afin d'estimer délai/coût.

## 4. Structure & layout

1. **Header global** : nb pays couverts, nb villes, taux de couverture, délai moyen global, coût moyen. **Carte interactive Afrique** (zoomable) : 🟢 couverte / 🟡 partielle / 🔴 non couverte.
2. **Liste pays** (🇨🇲 🇳🇬 🇨🇮 🇬🇭 🇰🇪 🇸🇳 🇩🇿 🇲🇦…) : statut, nb villes actives, délai moyen.
3. **Villes par pays** (ex. Cameroun : Douala, Yaoundé, Bafoussam, Garoua, Bamenda) : statut (active/limitée), délai moyen, coût moyen, volume commandes, dispo livreurs.
4. **Délais** : urbain 24–48 h, périurbain 2–4 j, rural 4–7 j, express same-day (grandes villes).
5. **Frais** (dynamiques) : selon distance, poids, type produit, urgence, zone. Ex. urbain 500–1500 FCFA, inter-ville 1500–4000, rural 3000–8000. Options : gratuit (promo), premium plus rapide, réduit pour abonnés.
6. **Types de livraison** : standard, express, same-day, point relais, **moto** (dominante).
7. **Réseau logistique** : livreurs internes (moto/voiture/coursier), partenaires externes (agences, moto-taxis), attribution (auto/manuel admin, priorité par zone).
8. **Performance & analytics** : délai moyen, taux réussi, taux retard, taux annulation, **heatmap** zones demandées/sous-servies/rentables, analyse par ville (commandes, revenu, coût, délai réel).
9. **Paramètres admin** : activer/désactiver zone, modifier frais/délais, ajouter ville, restrictions (produits interdits/zones bloquées/à risque), automatisation (prix dynamiques, activation selon activité).
10. **Alertes** : surcharge livreurs, retard excessif, manque de couverture, zone inactive, hausse de demande.

## 5. Composants requis

- **Réutilisés** : `GeoMap`, `DataTable`, `Badge` (statut zone), `Charts`, `KpiCard`, `SkeletonLoaders`.
- **Spécifiques** : `ZoneMap`, `CountryList`, `CityTable`, `ZoneSettingsPanel`, `LogisticsAnalytics`, `ZoneAlerts`.

## 6. Données / types

`DeliveryZone` (country, city, status, etaDays, baseFee, types, active). Barème de frais. `// TODO API`.

## 7. Règles métier

- Le Checkout (module 05) **consomme** ces zones pour valider une adresse (délai + coût + dispo).
- Zone désactivée = indisponible au checkout. Restrictions produits par zone respectées.
- Frais calculés selon barème (distance/poids/type/urgence).
- Prix dynamiques/activation auto = mock `// TODO AI`.

## 8. États UX

Carte : skeleton + `dynamic()`. Aucune zone : `empty`. Modification frais : confirmation. Erreur : retry.

## 9. Contraintes Afrique

Géographie réelle Afrique, infrastructure variable (délais larges en rural), **moto dominante**, FCFA, mobile-first (cartes simplifiées), heatmap logistique.

## 10. // TODO API / AI

`// TODO API: GET /delivery/zones`, `POST /delivery/zones`, `PATCH /delivery/zones/:id`, `GET /delivery/analytics`. `// TODO AI: prix dynamiques + expansion recommandée`.

## 11. Critères d'acceptation

- [ ] Carte interactive Afrique + statuts colorés.
- [ ] Liste pays/villes avec statut/délai/coût.
- [ ] 4+ types de livraison dont moto et point relais.
- [ ] Paramètres admin (activer/désactiver/frais/délais/restrictions).
- [ ] Analytics logistiques + alertes.
- [ ] Intégration checkout (validation de zone) documentée.

## 12. Pièges à éviter

Ne pas permettre un checkout sur zone désactivée. Ne pas charger la carte en synchrone. Ne pas dupliquer `GeoMap`/`DataTable`. Ne pas coder en dur des frais (barème paramétrable).
