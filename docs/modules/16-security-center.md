# Module 16 — Sécurité du compte (Security Center)

> Sprint 7. Rôle : **Tous**. Backend : oui (`// TODO API`). Dépend de : 11, RBAC, Socle.
> Centre de contrôle de la sécurité du compte (buyer/seller/driver/admin) : intrusions, auth, sessions, 2FA, devices, alertes. Focus prioritaire de l'Agent 7.

## 1. Objectif

Protéger les comptes : gérer l'authentification, les sessions, la 2FA, les appareils connectés, surveiller les connexions suspectes, afficher un **score sécurité /100**.

## 2. Rôles concernés (RBAC)

Tous (chacun son compte). L'admin peut avoir une vue de supervision (alertes critiques) mais ne voit pas les secrets des autres.

## 3. User stories clés

- En tant qu'**utilisateur**, je veux activer la 2FA, afin de protéger mon compte.
- En tant qu'**utilisateur**, je veux déconnecter un appareil suspect, afin de reprendre le contrôle.
- En tant qu'**utilisateur**, je veux voir mon score de sécurité, afin de savoir quoi améliorer.

## 4. Structure & layout

1. **Header sécurité** : niveau (🟢 Fort / 🟡 Moyen / 🔴 Faible), dernière connexion (date + localisation), statut 2FA, nb devices connectés.
2. **Changer mot de passe** : actuel + nouveau + confirmation ; contraintes (8–12+ car., maj/min, chiffres, spéciaux recommandés) ; options (forcer déconnexion de tous les appareils, notifier email/SMS, historique des changements).
3. **2FA** : méthodes SMS OTP / Email OTP / App Authenticator ; config (activer/désactiver, méthode principale, **codes de secours**) ; alerte si tentative de désactivation.
4. **Appareils connectés** (`DeviceCard`) : type, OS, navigateur, IP, localisation, dates ; actions (déconnecter, signaler, bloquer, marquer « fiable ») ; détection (connexion inhabituelle, pays différent, VPN suspect).
5. **Sessions** : session actuelle + anciennes + multi-appareils ; actions (logout ciblé, logout global, expiration auto) ; sécurité (expiration 7–30 j, renouvellement token, anti-hijacking).
6. **Alertes de sécurité** : nouvelle connexion, tentative échouée, changement mot de passe, désactivation 2FA, nouvel appareil ; niveau (🟢 normal / 🟡 suspect / 🔴 critique).
7. **Protection intelligente (mock)** : détection login inhabituel, brute force, pays inhabituel → réactions (blocage temporaire, OTP, verrouillage, notif admin).
8. **Historique** : connexions réussies/échouées, changements, activation 2FA, actions admin ; filtres (date/appareil/type).
9. **Paramètres avancés** : logout périodique, vérification email à chaque login, limite de connexions simultanées, mode « sécurité renforcée ».
10. **Score sécurité /100** (`SecurityScoreGauge`) : basé sur 2FA, complexité mot de passe, historique, comportement ; + recommandations.

## 5. Composants requis

- **Réutilisés** : `OtpInput`, `Badge`, `StatusTimeline` (historique), `DataTable`, `SkeletonLoaders`.
- **Spécifiques** : `SecurityHeader`, `PasswordForm`, `TwoFactorPanel`, `DeviceCard`, `SessionRow`, `SecurityScoreGauge`, `SecurityAlerts`.

## 6. Données / types

`SecurityState` (level, score, twoFA, devices, sessions, alerts), `Device`. `// TODO API` + `// TODO AI`.

## 7. Règles métier & sécurité (Agent 7 prioritaire)

- Jamais de secret/token en clair ni en dur. OTP **rate-limité** (anti-brute-force). Sessions expirables + renouvellement sécurisé.
- Changement de mot de passe → option d'invalidation de toutes les sessions.
- Détection de risque + réactions automatiques (mock, mais parcours complet).
- RBAC : chacun ne gère que son compte ; supervision admin limitée aux alertes.

## 8. États UX

Chargement : skeleton. Aucune alerte : `empty` rassurant. Action sensible : modale de confirmation + feedback. Erreur : retry.

## 9. Contraintes Afrique

2FA **SMS** prioritaire (parc mobile), FCFA sans objet ici, mobile-first (actions rapides : logout, changer mot de passe), accès 2FA facile, low-bandwidth.

## 10. // TODO API / AI

`// TODO API: POST /security/password`, `POST /security/2fa`, `GET /security/devices`, `DELETE /security/sessions/:id`, `GET /security/history`. `// TODO AI: détection d'anomalies`.

## 11. Critères d'acceptation

- [ ] Header + niveau + score /100 (`SecurityScoreGauge`).
- [ ] Changement mot de passe avec contraintes + invalidation sessions.
- [ ] 2FA (SMS/Email/App) + codes de secours.
- [ ] Gestion devices (déconnecter/bloquer/fiable) + détection.
- [ ] Gestion sessions (logout ciblé/global).
- [ ] Alertes + historique filtrable.
- [ ] Zéro secret en dur ; OTP rate-limité.

## 12. Pièges à éviter

Ne pas afficher de secret. Ne pas oublier le rate-limiting OTP. Ne pas laisser une session non expirable. Ne pas dupliquer `OtpInput`. Ne pas exposer les comptes d'autrui à un non-admin.
