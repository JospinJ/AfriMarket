# Module 11 — Dashboards par rôle

> Sprint 5. Rôle : **Tous** (5 déclinaisons). Backend : oui (`// TODO API`). Dépend de : 01, RBAC, Socle.
> **Structure UI commune**, contenu **adaptatif RBAC**. Ce que tu construis = Marketplace + Logistique + SaaS + Analytics Engine.

## 1. Objectif

Fournir à chaque rôle son espace de pilotage : Admin, Vendeur, Livreur, Acheteur, Support — avec une architecture UI unifiée et des permissions strictes (analytics conditionnelles).

## 2. Rôles concernés (RBAC — central ici)

La **sidebar** et les pages sont générées selon le rôle et le tier. Aucune entrée vers une page interdite. Voir `.cursor/rules/02-rbac-roles.mdc`.

## 3. Structure UI commune (tous les dashboards)

```
┌──────────────────────────────────────────────┐
│ TOP BAR (search global, notif, messages,     │
│          langue/devise, profil, quick set.)  │
├───────────────┬──────────────────────────────┤
│ SIDEBAR       │ MAIN CONTENT                 │
│ (RBAC)        │ KPI cards / charts / tables  │
│               │ / actions rapides            │
└───────────────┴──────────────────────────────┘
```

Blocs du main : **KPI cards** (titre, valeur, tendance %, icône), **charts** (line/bar/pie/geo), **data tables** (filtrables, triables, paginées, row actions), **actions rapides** (boutons/forms).

## 4. Déclinaisons par rôle

**ADMIN** — Sidebar : Dashboard, Users (Buyers/Sellers/Delivery), Marketplace (Products/Categories/Reports), Finance (Transactions/Commissions), Analytics, Moderation, Settings.
- Overview : KPI (total users, active sellers, orders today, revenue, disputes), charts (revenue line, sales by country map Afrique, orders funnel), tables (latest users/orders, flagged products).
- Users : tabs Buyers/Sellers/Delivery, table filtrable, ban/activate, **badge KYC**.
- Finance : transactions, éditeur de règles de commission, file de payouts, breakdown revenus.
- Analytics full : revenue trend, country map, dominance catégories, funnel, rétention.
- Settings : commission %, frais livraison, toggle KYC, Premium ON/OFF, config reco IA.

**VENDEUR** — Sidebar : Dashboard, Products, Orders, Revenue, Marketing, **Analytics (Premium only)**, Store Profile, Settings.
- Overview : KPI (revenue today, orders pending, conversion, rating).
- Products : grille/table, add product, indicateur stock, toggle promo.
- Orders : new/processing/shipped/delivered ; ligne = client, produit, statut, action (accept/ship).
- Revenue : chart, bouton payout, historique.
- Analytics (**gold/elite uniquement**) : best sellers, traffic source, conversion/produit, paniers abandonnés.
- Store Profile : bannière, logo, description, badges.

**LIVREUR** — Sidebar : Dashboard, Deliveries, Earnings, Performance, Map, Settings.
- Overview : livraisons du jour, revenus, distance, rating.
- Deliveries : **Available** (accept, distance, paiement) + **Active** (carte GPS, tracking, contact client).
- Earnings : par livraison, chart hebdo, payout. Performance : on-time rate, rating, cancellation rate.

**ACHETEUR** — Sidebar : Home, Orders, Wishlist, Payments, Tracking, Profile, Settings.
- Home : reco IA, produits vus, deals. Orders : actives/historique/retour. Wishlist : produits/boutiques suivis. Tracking : carte live (réutilise module 06).

**SUPPORT** — Sidebar : Tickets, Disputes, Users reports, Moderation, Logs. Queue de tickets, assign agent, resolve/escalate (réutilise module 10).

## 5. Composants requis

- **Réutilisés** : `KpiCard`, `DataTable`, `Charts`, `GeoMap`, `Sidebar`, `RoleGuard`, `Badge`, `StatusTimeline`, `SkeletonLoaders`, `StarRating`.
- **Spécifiques** : `DashboardTopBar`, `DashboardSidebar` (RBAC), et pages par rôle.

## 6. Données / types

`User`/`Role`/`SellerTier`, `Order`, `Seller`, `Driver`, agrégats KPI. `// TODO API` pour chaque widget de données.

## 7. Règles métier (RBAC)

- Analytics : Admin = full ; Vendeur = **Premium only** ; Livreur = limité (perso) ; Acheteur = aucune.
- Gérer utilisateurs = Admin seul. Créer produit = Vendeur seul. Accepter livraison = Livreur seul. Modérer = Support/Admin.
- Sidebar générée par permissions ; routes protégées par middleware + `RoleGuard`.

## 8. États UX

Widgets : skeleton / `empty` (« Pas encore de données ») / `error` (retry). Tables volumineuses paginées.

## 9. Contraintes Afrique

Langue/devise dans la top bar, FCFA, mobile-first (sidebar en drawer sur mobile), charts légers, cartes en `dynamic()`.

## 10. // TODO API / AI

`// TODO API: GET /dashboard/:role/overview`, endpoints par widget. `// TODO AI: reco acheteur, insights vendeur`.

## 11. Critères d'acceptation

- [ ] Structure commune (top bar + sidebar RBAC + main KPI/charts/tables/actions).
- [ ] 5 déclinaisons présentes et distinctes.
- [ ] Analytics vendeur **masquées** si non Premium (UI **et** route).
- [ ] Sidebar sans lien interdit ; middleware actif.
- [ ] Composants partagés (KpiCard/DataTable/Charts) réutilisés partout.

## 12. Pièges à éviter

Ne pas exposer d'analytics à un vendeur basic. Ne pas recréer KpiCard/DataTable par dashboard. Ne pas router côté client sans guard serveur. Ne pas charger toutes les données d'un coup.
