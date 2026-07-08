# Module 14 — Analytics Ads (Ads Performance Dashboard)

> Sprint 6. Rôle : **Vendeur / Admin**. Backend : oui (`// TODO API`). Dépend de : 13, 11, Socle.
> Page **business-critical** : mesurer, optimiser le budget, comprendre le ROI. Transforme la marketplace en plateforme data-driven.

## 1. Objectif

Permettre aux vendeurs (et admin) de mesurer la performance des campagnes, optimiser les budgets, identifier les produits rentables et contrôler le ROI.

## 2. Rôles concernés (RBAC)

- **Seller normal (basic)** : analytics **basiques**.
- **Seller premium** : analytics **complètes**.
- **Admin** : accès global au système Ads.

## 3. User stories clés

- En tant que **vendeur**, je veux voir le ROI par campagne, afin de savoir où investir.
- En tant que **vendeur premium**, je veux les insights IA, afin d'optimiser mes horaires/images.
- En tant qu'**admin**, je veux la vue globale Ads, afin de piloter la monétisation.

## 4. Structure & layout

1. **Header campagne sélectionnée** : nom, statut (🟢 Active / 🟡 Pause / 🔴 Terminée), période (début→fin), budget total investi, budget restant.
2. **KPI cards (4–6)** : coût total ads, impressions, CTR, conversions, revenue généré, **ROI** (= revenus/coût ×100).
3. **Graphique temporel** (line, jour par jour) : impressions, clics, ventes, dépenses → repérer les pics.
4. **Analytics produits sponsorisés** (table) : image, nom, prix, budget alloué, clics, conversions, ROI produit.
5. **Sources de trafic** (pie) : Home, Recherche, Catégorie, Boutique, Reco IA.
6. **Comportement utilisateurs** : temps moyen sur produit sponsorisé, taux d'abandon, scroll depth, add-to-cart depuis pub.
7. **Répartition appareils** : 📱 Mobile (dominant), 💻 Desktop, 📟 Tablette.
8. **Analytics géographiques** (map/list Afrique) : pays/villes/régions performants.
9. **Coût par résultat** : CPC, CPA, CPM.
10. **IA insights (mock)** : « performe mieux 18h–22h », « mobiles convertissent 2× », « produit X CTR faible → changer image ».
11. **Top produits ads** (best performer 🏆) / **produits faibles** (CTR/conversion faibles → suggestions).
12. **Audience targeting** (option avancée) : âge/sexe/pays/intérêts/comportement.
13. **Gestion budget** : quotidien/total, auto-stop, optimisation auto.
14. **Comparaison campagnes** (A vs B vs C, ROI comparé).
15. **Alertes** : budget bientôt épuisé, CTR faible, campagne performante → augmenter, produit refusé.

## 5. Composants requis

- **Réutilisés** : `KpiCard`, `Charts` (line/pie/bar), `DataTable`, `GeoMap`, `Badge`, `SkeletonLoaders`.
- **Spécifiques** : `AdsHeader`, `AdsInsights`, `CampaignComparison`, `AdsAlerts`, `DeviceBreakdown`.

## 6. Données / types

`AdCampaign.metrics` + agrégats (par produit, source, appareil, géo). `// TODO API` + `// TODO AI`.

## 7. Règles métier (RBAC)

- Niveau de détail selon le rôle/tier (basic = KPI de base ; premium = complet + insights IA ; admin = global).
- ROI/ROAS calculés de façon cohérente avec le module 13.
- Alertes déclenchées par seuils sur les données (pas décoratives).

## 8. États UX

Pas de campagne : `empty` (« Créez une campagne pour voir les analytics »). Chargement : skeleton. Erreur : retry.

## 9. Contraintes Afrique

Répartition **mobile dominante** mise en avant, analytics par pays Afrique, performance Mobile Money users, charts légers, mobile-first, dark/light mode.

## 10. // TODO API / AI

`// TODO API: GET /ads/analytics?campaignId=`, `GET /ads/analytics/global` (admin). `// TODO AI: insights automatiques + alertes intelligentes`.

## 11. Critères d'acceptation

- [ ] Header campagne + 4–6 KPI dont ROI.
- [ ] Graph temporel + table produits sponsorisés.
- [ ] Sources trafic + répartition appareils + géo Afrique.
- [ ] Niveau d'accès selon RBAC (basic/premium/admin).
- [ ] Alertes data-driven.
- [ ] Insights IA mockés et marqués.

## 12. Pièges à éviter

Ne pas donner les analytics complètes à un basic. Ne pas dupliquer KpiCard/Charts/GeoMap. Ne pas inventer des insights non liés aux données mock.
