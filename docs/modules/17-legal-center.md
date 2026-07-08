# Module 17 — Page Légale (Legal Center)

> Sprint 8. Rôle : **Tous**. Backend : contenu statique. Dépend de : 01, Socle.
> **Socle invisible mais essentiel** : encadrer légalement, protéger la plateforme, informer des droits/obligations, assurer conformité (RGPD-like + réglementation locale Afrique).

## 1. Objectif

Centraliser CGU, politique de confidentialité, politique de remboursement, responsabilités et contact légal, dans un document scrollable clair, avec accordéons, recherche interne et version PDF téléchargeable.

## 2. Rôles concernés

Tous (lecture). Certains renvois sont contextualisés (vendeur/livreur/acheteur) mais le contenu est public.

## 3. User stories clés

- En tant qu'**utilisateur**, je veux lire la politique de remboursement, afin de connaître mes droits.
- En tant qu'**utilisateur**, je veux chercher un terme dans le document légal, afin de trouver vite.
- En tant qu'**utilisateur**, je veux télécharger les CGU en PDF, afin de les conserver.

## 4. Structure & layout

**3 blocs principaux** + sections secondaires, avec **table des matières** (ancrages) et **accordéons**.

1. **CGU** : acceptation (usage = acceptation, compte valide, âge minimum), règles d'utilisation (infos exactes, pas de fraude/usurpation, usage légal, respect), règles marketplace (plateforme = intermédiaire, vendeurs responsables de leurs produits, acheteurs vérifient), livraison (délais estimés non garantis, responsabilité partagée, zones définies), limitation de responsabilité, interdictions (produits illégaux, contrefaçon, fraude, spam, harcèlement), sanctions (suspension, suppression, blocage paiement, poursuites).
2. **Confidentialité** : données collectées (perso, transactionnelles, techniques, comportementales), utilisation (reco, sécurité, livraison, pub ciblée, analytics), protection (chiffrement, stockage sécurisé, accès limité, audit), partage (vendeurs/livreurs/prestataires paiement/autorités), cookies & tracking, **droits utilisateur** (accès, modification, suppression, export).
3. **Remboursement** : cas acceptés (non livré, endommagé, non conforme, erreur vendeur), refus (changement d'avis hors politique, produit utilisé, dommage utilisateur, délai dépassé), délais (24 h–7 j, validation support), méthodes (**Mobile Money**, carte, wallet, crédit boutique), processus (demande → preuve → analyse → validation/rejet), litiges associés (renvoi module 10).

**Sections secondaires** : responsabilités (vendeurs/livreurs/plateforme), contact légal (email juridique, formulaire, siège optionnel, médiation), conformité (protection données, lois locales Afrique, conformité Mobile Money, traçabilité).

## 5. Composants requis

- **Réutilisés** : `Accordion`, `TableOfContents` (ancrages), `SearchBar` (recherche interne), `Badge`.
- **Spécifiques** : `LegalDocument`, `LegalSection`, `PdfDownloadButton`.

## 6. Données / types

Contenu structuré (sections/sous-sections), statique/mock. Pas de type métier complexe. Génération PDF via le skill/outil approprié côté build.

## 7. Règles métier

- Contenu cohérent avec les autres modules (remboursement ↔ module 10, confidentialité ↔ module 16, livraison ↔ module 15).
- Mentions clés mises en évidence ; ancres cliquables ; version PDF disponible.
- Textes i18n-ready (FR par défaut, structure EN).

## 8. États UX

Document long : navigation par TOC + accordéons repliés par défaut sur mobile. Recherche : surlignage des résultats. Chargement PDF : feedback.

## 9. Contraintes Afrique

Conformité **réglementation locale + Mobile Money**, mobile-first (accordéons), lisibilité (contraste AA), FCFA dans les exemples de remboursement.

## 10. // TODO API / AI

Aucun backend requis. `// TODO`: générer le PDF au build ; brancher le formulaire de contact légal (`// TODO API: POST /legal/contact`).

## 11. Critères d'acceptation

- [ ] 3 blocs (CGU / Confidentialité / Remboursement) + sections secondaires.
- [ ] TOC + accordéons + recherche interne.
- [ ] Version PDF téléchargeable.
- [ ] Cohérence avec modules 10/15/16.
- [ ] Contraste AA, mobile-first, i18n-ready.

## 12. Pièges à éviter

Ne pas contredire les règles des autres modules. Ne pas rendre le document illisible sur mobile (accordéons). Ne pas oublier les droits utilisateur (accès/suppression/export). Ne pas dupliquer `Accordion`/`SearchBar`.
