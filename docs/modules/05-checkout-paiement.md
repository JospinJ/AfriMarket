# Module 05 — Checkout / Paiement

> Sprint 3. Rôle : **Acheteur**. Backend : partiel (`// TODO API`). Dépend de : 04, 15, Socle.
> Dernière étape avant validation : **ultra simple, ultra sécurisée, ultra rapide, Mobile Money d'abord.** Zone à design **neutre** (confiance maximale).

## 1. Objectif

Finaliser l'achat sans friction, sécuriser le paiement, gérer multi-méthodes et multi-vendeurs, confirmer livraison + identité.

## 2. Rôles concernés

Acheteur. (Agent 5 backend + Agent 7 sécurité fortement impliqués.)

## 3. User stories clés

- En tant qu'**acheteur**, je veux payer en Mobile Money avec OTP, afin de régler comme d'habitude.
- En tant qu'**acheteur**, je veux voir un résumé clair (produits, livraison, total), afin de valider en confiance.
- En tant qu'**acheteur**, je veux une confirmation par SMS/WhatsApp, afin d'être rassuré.

## 4. Structure — flow en 5 étapes

`1. Adresse → 2. Livraison → 3. Paiement → 4. Résumé → 5. Confirmation`

**Layout** : gauche (infos/étape courante) / droite (**résumé sticky**). Mobile : une colonne + résumé sticky bas.

1. **Adresse** : choix adresse enregistrée ou nouvelle (`AddressForm` : nom, **téléphone**, pays, ville, quartier, rue/repère, instructions), géolocalisation optionnelle (pin), validation zone (via module 15).
2. **Livraison** : standard / express / moto / point relais / COD — délai + coût + dispo par zone.
3. **Paiement** (cœur) — ordre imposé :
   - 🟢 **Mobile Money** (défaut) : `MobileMoneySelector` (MTN/Orange/Moov/Airtel/Wave) → numéro → **OTP** (envoi, saisie, timeout, retry) → confirmation.
   - 💳 **Carte** (numéro, expiration, CVV, titulaire).
   - 💵 **COD** (selon vendeur, confirmation SMS, restrictions produits chers).
   - 🏦 **Wallet interne** (solde, cashback) + paiement hybride (Mobile Money + wallet, carte + coupon).
4. **Résumé** : produits (image, nom, qté, mode, prix), sous-total, remise, frais livraison, taxes, **total** mis en avant, adresse + délai.
5. **Confirmation** : succès (n° commande, résumé, suivi, retour accueil) / échec (retry, changer méthode, support).

**CTA final** : `💳 Payer maintenant` — grand, sticky mobile, désactivé si erreur/validation manquante.

## 5. Composants requis

- **Réutilisés** : `MobileMoneySelector`, `OtpInput`, `AddressForm`, `OrderSummary`, `PriceBlock`, `PurchaseModeChip`.
- **Spécifiques** : `CheckoutStepper`, `DeliveryMethodPicker`, `CardForm`, `PaymentMethodTabs`, `CheckoutSuccess`, `CheckoutFailure`.

## 6. Données / types

`Order`, `Address`, `PaymentMethod`, `MobileMoneyPayment` (otpRequired = true). Mode d'achat repris du panier. `// TODO API` sur chaque étape serveur.

## 7. Règles métier & sécurité (Agent 7)

- **Vérifications obligatoires avant paiement** : adresse valide, téléphone valide (`validatePhone` par pays), stock encore dispo, prix non modifié depuis le panier.
- **OTP obligatoire** pour Mobile Money ; timeout + retry limités (rate-limiting).
- Aucune vraie clé/passerelle : tout est mocké `// TODO API` avec signature.
- Multi-vendeurs : **split logique** des paiements/commandes côté backend.
- Session de paiement limitée dans le temps ; anti-fraude basique ; pas de secret en dur.
- Confirmation **multi-canal** : SMS (fallback garanti) + WhatsApp + push.

## 8. États UX

Validation temps réel par champ (pas de reload). Paiement : `verifying` (spinner), `success`, `failed`, `timeout`. Erreurs claires et actionnables.

## 9. Contraintes Afrique

Mobile Money **en premier**, COD fréquent, UX low-bandwidth (validation client), SMS fallback, WhatsApp support intégré, FCFA.

## 10. // TODO API / AI

`// TODO API: POST /checkout/validate`, `POST /payments/mobile-money`, `POST /payments/otp/verify`, `POST /orders`. `// TODO AI: suggestion livraison/paiement`.

## 11. Critères d'acceptation

- [ ] 5 étapes claires ; résumé sticky.
- [ ] Mobile Money en tête + OTP complet (timeout/retry).
- [ ] Vérifications pré-paiement bloquantes (adresse/téléphone/stock/prix).
- [ ] Multi-vendeurs : split logique.
- [ ] Confirmation multi-canal (au moins SMS + WhatsApp mockés).
- [ ] CTA désactivé tant que l'étape n'est pas valide.
- [ ] Zéro secret en dur ; tout paiement `// TODO API`.

## 12. Pièges à éviter

Ne pas placer la carte avant Mobile Money. Ne pas sauter l'OTP. Ne pas oublier le fallback SMS. Ne pas recharger la page entre étapes. Ne pas exposer de fausse clé « réaliste ».
