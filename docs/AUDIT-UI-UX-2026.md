# Audit UI/UX & Motion — AfriMarket Hub

_Rôle : Senior UI/UX · Motion Designer · Frontend Architect_
_Date : 6 juillet 2026 · Stack : Next.js 14 (App Router) · Tailwind · Framer Motion · Radix · Swiper · Zustand_

---

## 1. Synthèse

Le frontend n'est pas un « point de départ » : c'est déjà une base **haut de gamme**. Le design system motion est mature et cohérent — glassmorphism, ombres premium multi-couches, cartes 3D en perspective, balayages de lumière (shine), orbes premium en orbite, marquees, compteurs animés, squelettes shimmer et **support complet de `prefers-reduced-motion`**. La majorité des « améliorations attendues » du brief existent déjà et sont bien exécutées.

Le travail à plus fort impact n'était donc **pas** d'ajouter des animations partout (risque de saturation), mais de **combler les rares manques réels** et de **connecter les interactions incomplètes**. C'est ce qui a été fait.

**Verdict :** interface déjà compétitive à l'échelle internationale. Les ajouts ci-dessous la rendent plus « vivante » sur les points que l'utilisateur touche le plus (cartes produits, favoris, carrousel) sans alourdir ni casser l'accessibilité.

---

## 2. État des lieux — ce qui est déjà excellent

| Domaine | Constat |
|---|---|
| **Design tokens** | Palette africaine complète (terre / nature / soleil / prestige) en variables CSS, motifs wax/kente/kuba/bogolan/adinkra en fond léger. |
| **Ombres & profondeur** | 4 niveaux `shadow-premium-*` + glows orange/vert. Excellent rendu de profondeur. |
| **Cartes produits** | Perspective 3D, shine sweep, zoom image, overlay dégradé, actions au survol, feedback « Ajouté ! ». |
| **Animations au scroll** | Système `RevealOnScroll` + `PremiumSection` avec 7 variantes (`fadeUpBlur`, `revealScale`, `slideLeft`…) et stagger. Déjà appliqué sur toute la home. |
| **Hero** | Parallaxe au scroll (`useScroll`/`useTransform`), orbes flottants premium en orbite, compteurs animés, glows qui respirent. |
| **Skeletons** | `HomePageSkeleton`, `SkeletonLoaders` avec shimmer — chargement premium déjà en place. |
| **Accessibilité motion** | Bloc `@media (prefers-reduced-motion: reduce)` global qui neutralise animations et transitions. |
| **Perf** | `memo` sur `ProductCard`, `useDeferredValue` sur le filtrage home, `IntersectionObserver` pour le lazy-load du feed. |

---

## 3. Manques réels identifiés (avant intervention)

1. **« Cadeau Surprise » absent des cartes produits.** Le hook `usePremiumSurprise` existait mais n'était branché **que** sur les orbes flottants du hero. Les cartes produits Premium — l'endroit le plus visible — n'en bénéficiaient pas. → **Manque #1, fort impact.**
2. **Wishlist non interactive.** Le cœur « Favoris » n'existait que comme lien de navbar ; aucune action « ajouter aux favoris » sur les cartes, et la page `/favorites` était un simple placeholder statique. → **Interaction incomplète.**
3. **Carrousel hero basique.** Simple fondu d'opacité entre slides : pas d'entrée animée du texte, pas d'indicateur de progression d'autoplay, pas de pause au survol, pas d'effet Ken Burns. → **Occasion manquée de « vivant ».**
4. **Feedback panier perfectible.** Bon état « Ajouté ! », mais sans éclat visuel au clic.

---

## 4. Recommandations priorisées par impact

| Priorité | Amélioration | Impact | Effort | Statut |
|---|---|---|---|---|
| **P0** | Effet « Cadeau Surprise » sur cartes Premium (bounce + halo + scintillement, rare & aléatoire) | Très élevé | Moyen | ✅ Implémenté |
| **P0** | Wishlist fonctionnelle (cœur sur carte + compteur navbar + page favoris réelle) | Élevé | Moyen | ✅ Implémenté |
| **P1** | Carrousel hero : entrée staggerée du contenu, Ken Burns, barre de progression, pause au survol | Élevé | Faible | ✅ Implémenté |
| **P1** | Éclat au clic « Ajouter au panier » | Moyen | Faible | ✅ Implémenté |
| **P2** | Étendre l'effet surprise aux sections « Recommandés » / « Nouveautés » de la home | Moyen | Faible | ○ Recommandé |
| **P2** | Transition de page (App Router `template.tsx` + fade/slide) | Moyen | Faible | ○ Recommandé |
| **P3** | Effet magnétique/tilt au curseur sur les cartes (desktop uniquement) | Faible | Moyen | ○ Optionnel |
| **P3** | Haptique légère (`navigator.vibrate`) sur mobile au « Ajouter » | Faible | Faible | ○ Optionnel |

---

## 5. Ce qui a été implémenté

### 5.1 Effet « Cadeau Surprise » (P0)

Objectif du brief : _« l'utilisateur doit avoir l'impression qu'une opportunité spéciale vient d'apparaître »_ — élégant, jamais agressif, rare.

- **Coordination par la grille** : `ProductFeed` calcule les IDs des produits de vendeurs **Gold/Elite** et passe par `usePremiumSurprise` (intervalle aléatoire 4,5–9,5 s) pour désigner **une seule** carte à la fois. L'effet ne se déclenche **que lorsque la grille est visible** (nouveau hook `useOnScreen`) — zéro coût hors écran.
- **Animation composite** sur la carte désignée :
  - léger **rebond** (bounce) via Framer Motion (`scale`/`y` avec easing élastique) ;
  - **halo lumineux** doré animé (bordure en dégradé + glow), placé hors du conteneur clippé pour une vraie lueur externe ;
  - **balayage de brillance** (sheen) qui traverse la carte ;
  - **4 particules scintillantes** (Sparkles) ;
  - **pastille « Offre surprise »** avec icône cadeau.
- **Réservé au Premium** et **désactivé si `prefers-reduced-motion`** (garde `useReducedMotion`).

Fichiers : `hooks/usePremiumSurprise.ts` (réutilisé), `hooks/useOnScreen.ts` (nouveau), `components/shared/ProductCard.tsx`, `components/home/ProductFeed.tsx`, `app/globals.css`.

### 5.2 Wishlist fonctionnelle (P0)

- **Nouveau store** `useFavoritesStore` (Zustand + persist `localStorage`).
- **Bouton cœur** en haut à droite de chaque carte, avec animation `heart-pop` au clic et remplissage terracotta à l'état actif.
- **Compteur live** sur le cœur de la navbar (badge `badge-bump`), synchronisé avec les cartes.
- **Page `/favorites` réelle** : grille de produits sauvegardés avec reveal staggeré, ou état vide soigné.

Fichiers : `store/useFavoritesStore.ts` (nouveau), `components/marketing/FavoritesContent.tsx` (nouveau), `app/(marketing)/favorites/page.tsx`, `components/navbar/Navbar.tsx`, `components/shared/ProductCard.tsx`.

### 5.3 Carrousel hero premium (P1)

- **Entrée staggerée** du contenu (tag → titre → sous-titre → CTA) à chaque slide.
- **Ken Burns** : léger zoom lent de l'image (désactivé en reduced-motion).
- **Barre de progression d'autoplay** intégrée à la puce active.
- **Pause au survol / focus** (accessibilité clavier) + `aria-roledescription="carrousel"` et `aria-current`.

Fichier : `components/home/HeroCarousel.tsx`.

### 5.4 Micro-interaction panier (P1)

- **Éclat** (`cart-burst`) au clic sur « Ajouter », en complément du feedback « Ajouté ! » existant.

### 5.5 Accessibilité motion globale (bonus)

- **Nouveau `MotionProvider`** (`<MotionConfig reducedMotion="user">`) monté à la racine : **toutes** les animations Framer Motion de l'app (existantes comprises) respectent désormais la préférence système « réduire les animations ». Auparavant seul le CSS était couvert ; les animations JS Framer (entrées `whileInView`, hero, compteurs…) ne l'étaient pas.

Fichiers : `components/shared/MotionProvider.tsx` (nouveau), `app/layout.tsx`.

---

## 6. Performance & accessibilité

- **Reduced-motion** : couverture désormais **complète** — CSS (`@media prefers-reduced-motion`) **et** JS via le nouveau `MotionProvider` global + gardes `useReducedMotion` locales. Les particules et l'éclat sont carrément masqués (`display:none`).
- **Coût maîtrisé** : l'effet surprise ne tourne que grille visible ; animations en `transform`/`opacity` (compositables GPU) ; aucune boucle JS de rendu.
- **Perf de rendu** : sélecteur favori par-produit (`s.ids.includes(id)` → booléen) pour éviter de re-rendre toute la grille à chaque toggle ; `memo` conservé et étendu (`isSurprise`).
- **A11y** : `aria-label`/`aria-pressed` sur le cœur, `aria-current` sur les puces, focus visibles préservés, cibles tactiles ≥ 40 px.

---

## 7. Prochaines étapes recommandées (non bloquantes)

1. Étendre l'effet surprise aux grilles « Recommandés » et « Nouveautés » de la home (réutiliser le pattern `ProductFeed`).
2. Ajouter une **transition de page** globale (`app/template.tsx`) pour lisser la navigation.
3. Connecter la wishlist et le panier au backend une fois l'API disponible (les `// TODO API` sont déjà balisés).
4. Mesurer en conditions réelles (Lighthouse / WebPageTest sur réseau lent — contrainte Afrique) après branchement des vraies images.

---

_Note : la vérification `tsc`/`build` locale n'a pas pu être exécutée dans cet environnement (sandbox indisponible). Les changements ont été relus manuellement pour la cohérence TypeScript ; lancer `npm run lint` et `npm run build` avant merge._
