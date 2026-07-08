# Module 01 — Navbar + Footer (navigation globale)

> Sprint 1. Rôle : **Tous**. Backend : mock. Dépend de : Socle.
> **Rappels invariants** : triptyque (badges data-driven), RBAC (zone utilisateur), Afrique (langue/pays, WhatsApp), design sobre (footer sombre + motifs ≤ 10 %), stack imposée.

## 1. Objectif

La navbar est **l'élément le plus travaillé visuellement** de la plateforme : elle doit donner accès **en ≤ 2 clics** à un produit, une catégorie, le panier, le compte, une boutique, les offres, Premium, la candidature vendeur et la candidature livreur. Le footer est une **zone de conversion silencieuse** (business + confiance + app + engagement).

## 2. Rôles concernés (RBAC)

- **Non connecté** : boutons Connexion / Inscription.
- **Connecté** : avatar + prénom + menu (profil, commandes, favoris, adresses, portefeuille, paramètres, déconnexion).
- Le menu utilisateur affiche les entrées **selon le rôle** (ex. « Ma boutique » pour seller, « Mes livraisons » pour driver) via `useRole()`.

## 3. User stories clés

- En tant qu'**acheteur**, je veux rechercher un produit/boutique/catégorie depuis n'importe quelle page, afin de trouver vite.
- En tant qu'**acheteur**, je veux voir mon panier (nombre + sous-total) en permanence, afin de suivre mon achat.
- En tant que **visiteur**, je veux repérer « Devenir vendeur/livreur » et « Premium », afin de m'engager.

## 4. Structure & layout par breakpoint

### Navbar (sticky, hauteur 70–90 px, ombre au scroll, glassmorphism léger ou fond clair)

**Desktop (≥ 1024px)** — 2 lignes :
- Ligne 1 : `[Logo + Nom]` `[📍 Livrer à Yaoundé, Cameroun]` · `[Barre de recherche centrale large]` · `[🌐 Langue] [🔔 Notif] [❤️ Favoris] [⚖️ Comparateur] [🛒 Panier (n) sous-total] [Zone utilisateur]`
- Ligne 2 : `[≡ Catégories → Mega Menu]` · `[Offres Flash] [Nouveautés] [Boutiques Premium] [Devenir Vendeur] [Devenir Livreur] [Aide]` · `[⭐ Premium]`

**Mobile (< 768px)** — header compact : `[Logo] [Recherche] [🔔] [🛒] [☰ Hamburger]`. Le hamburger ouvre un menu **slide depuis la gauche** : Accueil, Catégories, Offres Flash, Boutiques Premium, Devenir vendeur, Devenir livreur, Mon compte, Paramètres.

### Barre de recherche (élément principal)

- Sélecteur `[Tous ▾ | Produits | Boutiques | Catégories]` + champ (placeholder « Rechercher un produit, une boutique ou une catégorie… ») + bouton loupe.
- **Au focus** : panneau de suggestions (mock) — Recherches populaires, Produits populaires, Catégories populaires, Boutiques populaires. `// TODO API: GET /search/suggestions?q=`.
- **Recherche locale** intégrée : « produits près de moi », « vendeurs dans ma ville », « livraison rapide locale ».

### Mega Menu catégories (multi-colonnes)

Électronique (Smartphones, Tablettes, Ordinateurs, Accessoires) · Mode (Homme, Femme, Enfant) · Maison (Cuisine, Salon, Décoration) · Automobile (Pièces, Accessoires) · Agriculture (Semences, Outils, Équipements) · Santé (Produits médicaux, Bien-être) · Supermarché (Alimentaire, Boissons).

### Footer (fond sombre `--night`, accents dorés/verts, motifs 5–10 %) — 6 zones

1. **CTA business** : Devenir vendeur (« Ouvrez votre boutique gratuitement » → Créer une boutique), Devenir livreur (« Gagnez de l'argent avec vos trajets » → Postuler), Premium (« Boostez vos ventes » → Découvrir).
2. **App mobile** : Google Play + App Store (placeholders) + **QR code** + mini-mockup téléphone.
3. **Navigation secondaire** : Marketplace (Produits, Catégories, Offres flash, Nouveautés) · Vendeurs (Devenir vendeur, Boutiques premium, Top vendeurs) · Livraison (Devenir livreur, Suivi commande, Zones couvertes) · Support (Aide, FAQ, Contact, Centre de support).
4. **Confiance & sécurité** : 🔐 Paiement sécurisé · 🛡 Protection acheteur · ✔ Vendeurs vérifiés · 🔁 Retour & remboursement · 📦 Livraison garantie (icônes + texte court).
5. **Réseau & engagement** : réseaux (Facebook, Instagram, TikTok, WhatsApp business) · Newsletter (email + bouton) · Langue & pays (🇨🇲 🇳🇬 🇸🇳 🇨🇮 🌍).
6. **Branding final** : logo + slogan « Le commerce africain nouvelle génération » + copyright + CGU + confidentialité.

**Mobile** : zones du footer en **accordéon** ; CTA business visibles en premier ; app download éventuellement sticky.

## 5. Composants requis

- **Réutilisés (shared)** : `Badge` (Premium), `SearchBar`, `CartMini`, `Accordion` (footer mobile), `RoleGuard` (entrées de menu par rôle).
- **Spécifiques** : `Navbar`, `MegaMenu`, `LocationSelector`, `SearchSuggestions`, `UserMenu`, `MobileDrawer`, `Footer`, `NewsletterForm`, `AppDownloadBlock` (QR).

## 6. Données / types

`User` (rôle → menu), `Cart` (nombre + sous-total via `useCartStore`), catégories depuis `lib/constants/categories.ts`, suggestions mock. Localisation : `Address`/`GeoPoint`. `// TODO API: localisation utilisateur`.

## 7. Règles métier

- Panier : `count` et `subtotal` dérivés du store, formatés `formatFCFA`. Ex. « 🛒 Panier (3) · 125 000 FCFA ».
- Badge Premium visible pour tous ; au clic → présentation Basic/Gold/Elite (renvoie au module 12).
- Sélecteur de localisation : pays → région → ville (cascade).
- Langue : Français / English (structure i18n-ready, pas de traduction exhaustive requise en v1).

## 8. États UX

- Recherche : suggestions en `loading` (skeleton), `empty` (« Aucune suggestion »), `error` (retry discret).
- Notifications/favoris/panier vides : état `empty` explicite avec CTA.

## 9. Contraintes Afrique

Mobile-first strict (header compact), langue/pays visibles, WhatsApp dans les réseaux, images du footer légères. Navbar performante (sticky sans jank au scroll).

## 10. // TODO API / AI

- `// TODO API: GET /search/suggestions`, `// TODO API: localisation (pays/région/ville)`, `// TODO API: GET /notifications/count`, `// TODO API: POST /newsletter`.

## 11. Critères d'acceptation

- [ ] Navbar sticky, 70–90 px, ombre au scroll, sans jank.
- [ ] Toute action clé accessible en ≤ 2 clics (vérifié : produit, catégorie, panier, compte, boutique, offres, Premium, vendeur, livreur).
- [ ] Recherche : 3 portées + autocomplete + suggestions mock au focus.
- [ ] Mega menu complet (7 familles) ; drawer mobile slide-gauche.
- [ ] Menu utilisateur adapté au rôle (RoleGuard).
- [ ] Footer : 6 zones présentes, fond sombre, motifs ≤ 10 %, accordéon mobile.
- [ ] Panier affiche nombre + sous-total en `formatFCFA`.

## 12. Pièges à éviter

Ne pas surcharger la navbar (garder la recherche dominante). Ne pas cacher le panier/compte sur mobile. Ne pas mettre de motifs sur du texte à lire. Ne pas dupliquer `Badge`/`SearchBar` déjà partagés.
