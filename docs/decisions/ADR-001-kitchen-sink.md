# ADR-001 — Kitchen-sink vs Storybook

Date : 2026-07-05

**Contexte** : Sprint 0 exige une démo des composants partagés.

**Options** : A) Storybook B) Page `/_kitchen-sink`

**Décision** : Page `/_kitchen-sink` dans l'app Next.js.

**Justification** : Moins de dépendances, même stack, accessible en dev/preview sans outil séparé.

**Conséquences** : Pas de Storybook en v1 ; composants testés via Vitest + kitchen-sink.

**Statut** : Actif
