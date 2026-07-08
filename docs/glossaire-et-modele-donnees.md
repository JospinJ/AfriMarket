# 📖 SOCLE PARTAGÉ — Glossaire, modèle de données & conventions

> **Statut : source de vérité.** Ce document est le **seul** contexte partagé accessible par tous les agents en permanence (avec les règles Cursor). Toute divergence de vocabulaire ou de type par rapport à ce document est un **bug**. Un agent ne redéfinit jamais un type présent ici ; il l'importe.

---

## 1. Glossaire métier

| Terme | Définition |
|---|---|
| **Triptyque d'achat** | Les 3 modes d'approvisionnement simultanés d'un produit : Express, Import, Gros. |
| **Express** | Mode « stock local », livraison 24–72 h, prix le plus élevé. |
| **Import** | Mode « prix réduit », délai 10–25 jours (import type Temu/AliExpress). |
| **Gros** | Mode « prix usine », soumis à un **MOQ** (Alibaba-like). |
| **MOQ** | *Minimum Order Quantity* — quantité minimale de commande, obligatoire en mode Gros. |
| **Offer** | Une des 3 offres d'un produit (mode + prix + délai + stock + MOQ éventuel). |
| **RBAC** | *Role-Based Access Control* — contrôle d'accès par rôle (admin, seller, driver, buyer). |
| **SellerTier** | Niveau d'abonnement vendeur : basic, gold, elite. |
| **COD** | *Cash On Delivery* — paiement à la livraison. |
| **Mobile Money** | Paiement mobile (MTN, Orange Money, Moov, Airtel, Wave). |
| **OTP** | *One-Time Password* — code à usage unique (validation paiement, 2FA). |
| **KYC** | *Know Your Customer* — vérification d'identité vendeur/livreur (donnée sensible). |
| **Verified Buyer** | Acheteur ayant réellement acheté le produit qu'il évalue. |
| **Dispute / Litige** | Conflit ouvert autour d'une commande/livraison/paiement. |
| **SLA** | *Service Level Agreement* — délai limite (ex. résolution d'un litige). |
| **Store Front** | Vitrine publique d'un vendeur (mini-boutique intégrée). |
| **ETA** | *Estimated Time of Arrival* — heure/délai estimé de livraison. |
| **Ads Campaign** | Campagne publicitaire de sponsoring d'un produit ou d'une boutique. |
| **CTR / CPC / CPM / CPA / ROI / ROAS** | Indicateurs publicitaires (voir module Ads Analytics). |
| **Delivery Zone** | Zone géographique de couverture logistique (pays/ville) avec statut/délai/coût. |
| **Security Score** | Score /100 de robustesse d'un compte (2FA, mot de passe, historique). |

---

## 2. Types TypeScript de référence (`types/`)

> Ces interfaces sont le **contrat** que tous les mocks et services respectent. Les compléter est permis ; les contredire est interdit.

### 2.1 Primitives & communs

```ts
export type Money = number;               // toujours en FCFA (entier)
export type ISODate = string;             // "2026-07-05T10:00:00Z"
export type UUID = string;

export type CountryCode = "CM" | "NG" | "CI" | "SN" | "GH" | "KE" | "DZ" | "MA";
export type Currency = "FCFA";            // devise par défaut, non substituée en v1

export interface GeoPoint { lat: number; lng: number; }
export interface Address {
  id: UUID;
  fullName: string;
  phone: string;                          // format local validé par pays
  country: CountryCode;
  city: string;
  district: string;                       // quartier
  street?: string;
  landmark?: string;                      // repère ("maison verte portail rouge")
  geo?: GeoPoint;
  instructions?: string;
}
```

### 2.2 Utilisateurs & RBAC

```ts
export type Role = "admin" | "seller" | "driver" | "buyer";
export type SellerTier = "basic" | "gold" | "elite";

export interface User {
  id: UUID;
  role: Role;
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
  phone: string;
  email?: string;
  country: CountryCode;
  city?: string;
  createdAt: ISODate;
  kycStatus?: "none" | "pending" | "verified" | "rejected"; // seller/driver
  sellerTier?: SellerTier;                 // si role === "seller"
  isSupport?: boolean;                     // capacité de modération (admin)
}
```

### 2.3 Produit & triptyque (INVARIANT #1)

```ts
export type PurchaseMode = "express" | "import" | "gros";

export interface Offer {
  mode: PurchaseMode;
  price: Money;
  originalPrice?: Money;                   // pour l'économie / le -X%
  deliveryEtaDays: [number, number];       // [min,max] ; express [1,3], import [10,25]
  stock: number;
  moq?: number;                            // OBLIGATOIRE si mode === "gros"
}

export interface ProductVariant {
  id: UUID;
  label: string;                           // "Rouge / L"
  attributes: Record<string, string>;      // { couleur:"rouge", taille:"L" }
  stockByMode?: Partial<Record<PurchaseMode, number>>;
}

export interface Product {
  id: UUID;
  slug: string;
  title: string;
  brand?: string;
  categoryId: string;
  sellerId: UUID;
  images: string[];
  videoUrl?: string;
  has360?: boolean;
  offers: Offer[];                         // TOUJOURS 3 : express, import, gros
  variants?: ProductVariant[];
  rating: { average: number; count: number };
  soldCount?: number;
  viewsCount?: number;
  badges?: BadgeType[];                     // dérivés de données, pas arbitraires
  specs?: Record<string, string>;
  createdAt: ISODate;
}

// helper attendu (lib/utils) — un produit valide a exactement 3 modes
export const PRODUCT_MODES: PurchaseMode[] = ["express", "import", "gros"];
```

### 2.4 Badges dynamiques (data-driven)

```ts
export type BadgeType =
  | "trending" | "flash_sale" | "new" | "premium_seller" | "verified" | "fast_delivery";

// Règles de dérivation (exemples — jamais posés arbitrairement) :
// flash_sale  → offer.originalPrice && offer.price < offer.originalPrice
// new         → createdAt < 30 jours
// fast_delivery → express.deliveryEtaDays[1] <= 2
// premium_seller → seller.sellerTier in ["gold","elite"]
// verified    → seller.kycStatus === "verified"
// trending    → soldCount / viewsCount au-dessus d'un seuil
```

### 2.5 Vendeur & boutique

```ts
export interface Seller {
  id: UUID;
  userId: UUID;
  storeName: string;
  storeSlug: string;
  logoUrl?: string;
  bannerUrl?: string;
  tier: SellerTier;
  kycStatus: "none" | "pending" | "verified" | "rejected";
  rating: { average: number; count: number };
  responseRatePct?: number;
  responseTimeMins?: number;
  followersCount?: number;
  deliveredOrders?: number;
  country: CountryCode;
  city?: string;
  badges?: ("verified" | "premium" | "elite" | "top_rated" | "local")[];
}
```

### 2.6 Panier & commande

```ts
export interface CartItem {
  productId: UUID;
  sellerId: UUID;
  variantId?: UUID;
  mode: PurchaseMode;                      // mode choisi, propagé jusqu'au checkout
  quantity: number;                        // ≥ moq si mode === "gros"
  unitPrice: Money;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  // le panier est groupé par sellerId à l'affichage (multi-vendeurs)
}

export type OrderStatus =
  | "confirmed" | "prepared" | "shipped" | "in_delivery" | "delivered"
  | "cancelled" | "disputed";

export type PaymentMethod =
  | "mobile_money" | "card" | "cod" | "wallet";

export interface Order {
  id: UUID;
  buyerId: UUID;
  items: CartItem[];
  subtotal: Money;
  deliveryFee: Money;
  discount: Money;
  total: Money;
  currency: Currency;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  address: Address;
  createdAt: ISODate;
  // multi-vendeurs : split logique par sellerId au backend
}
```

### 2.7 Paiement Mobile Money

```ts
export type MobileMoneyOperator = "mtn" | "orange" | "moov" | "airtel" | "wave";

export interface MobileMoneyPayment {
  operator: MobileMoneyOperator;
  phone: string;
  otpRequired: true;                       // toujours true
  status: "idle" | "otp_sent" | "verifying" | "success" | "failed" | "timeout";
}
// Opérateurs disponibles par pays : voir lib/constants/operators.ts
```

### 2.8 Tracking & livraison

```ts
export interface Driver {
  id: UUID; userId: UUID; name: string; photoUrl?: string;
  vehicle: "moto" | "velo" | "voiture";
  rating: { average: number; count: number };
  onTimeRatePct?: number;
}

export interface TrackingStep {
  key: OrderStatus;                        // confirmed → prepared → shipped → in_delivery → delivered
  label: string; done: boolean; at?: ISODate;
}

export interface DeliveryTracking {
  orderId: UUID;
  steps: TrackingStep[];                   // 5 étapes
  driver?: Driver;
  driverPosition?: GeoPoint;               // // TODO API (live) + fallback SMS
  etaMinutes?: number;
  otpCode?: string;                        // confirmation à la réception
}
```

### 2.9 Reviews (3 types)

```ts
export type ReviewKind = "product" | "seller" | "delivery";

export interface ReviewBase {
  id: UUID; kind: ReviewKind; authorId: UUID;
  rating: number;                          // 1..5
  comment?: string; mediaUrls?: string[]; voiceUrl?: string;
  verifiedPurchase: boolean; orderId?: UUID;
  helpfulCount?: number; reported?: boolean; createdAt: ISODate;
}
export interface ProductReview extends ReviewBase { kind: "product"; productId: UUID; criteria?: { quality:number; conformity:number; valueForMoney:number }; }
export interface SellerReview  extends ReviewBase { kind: "seller";  sellerId: UUID; criteria?: { communication:number; delays:number; service:number }; }
export interface DeliveryReview extends ReviewBase { kind: "delivery"; driverId: UUID; criteria?: { speed:number; packaging:number; communication:number }; }
```

### 2.10 Litiges

```ts
export type DisputeType = "not_delivered" | "damaged" | "wrong_item" | "refund" | "fraud";
export type DisputeStatus = "open" | "mediation" | "awaiting_evidence" | "resolved" | "rejected" | "refunded";
export type Resolution = "full_refund" | "partial_refund" | "replacement" | "store_credit" | "rejected";

export interface Dispute {
  id: UUID; type: DisputeType; status: DisputeStatus;
  priority: "low" | "medium" | "high" | "critical";
  orderId: UUID; buyerId: UUID; sellerId: UUID; driverId?: UUID;
  evidences: { url:string; kind:"image"|"video"|"doc"|"voice"; at:ISODate }[];
  slaDeadline?: ISODate;
  timeline: { at: ISODate; actor: Role; action: string }[];
  resolution?: Resolution; refundAmount?: Money; createdAt: ISODate;
}
```

### 2.11 Premium & Ads

```ts
export interface Plan {
  tier: SellerTier;                        // basic | gold | elite
  monthlyPrice: Money; yearlyPrice: Money;
  features: string[]; visibilityBoost: number; commissionPct: number;
}

export type AdObjective = "sales" | "clicks" | "visibility" | "branding" | "add_to_cart";
export type AdPlacement = "home" | "search" | "category" | "recommendations" | "store";
export type CampaignStatus = "active" | "paused" | "ended" | "rejected" | "in_review";

export interface AdCampaign {
  id: UUID; sellerId: UUID; productId?: UUID;
  objective: AdObjective; placements: AdPlacement[];
  budgetTotal: Money; budgetDaily?: Money; spent: Money;
  startAt: ISODate; endAt?: ISODate; status: CampaignStatus;
  targeting: { countries?: CountryCode[]; cities?: string[]; ageRange?: [number,number];
               gender?: "m"|"f"|"all"; interests?: string[]; behavior?: string[] };
  metrics?: { impressions:number; clicks:number; conversions:number;
              revenue:Money; ctr:number; roi:number };
}
```

### 2.12 Delivery Zones & Security

```ts
export interface DeliveryZone {
  id: UUID; country: CountryCode; city: string;
  status: "covered" | "partial" | "uncovered";
  etaDays: [number, number]; baseFee: Money;
  types: ("standard"|"express"|"same_day"|"pickup_point")[];
  active: boolean;
}

export interface Device {
  id: UUID; type:"mobile"|"desktop"|"tablet"; os:string; browser:string;
  ip:string; location?:string; lastActiveAt:ISODate; trusted:boolean;
}
export interface SecurityState {
  level: "strong" | "medium" | "weak"; score: number; // /100
  twoFA: { enabled:boolean; method?:"sms"|"email"|"app" };
  devices: Device[]; sessions: { id:UUID; current:boolean; createdAt:ISODate }[];
  alerts: { at:ISODate; kind:string; risk:"normal"|"suspect"|"critical" }[];
}
```

---

## 3. Conventions de nommage (rappel)

| Élément | Convention | Exemple |
|---|---|---|
| Composant | `PascalCase.tsx` | `PriceBlock.tsx` |
| Hook | `useCamelCase` | `useRole` |
| Store Zustand | `useXxxStore` | `useCartStore` |
| Type/Interface | `PascalCase` (sans `I`) | `Order`, `AdCampaign` |
| Union de littéraux | `PascalCase` | `type Role = ...` |
| Helper / util | `kebab-case.ts` | `format-fcfa.ts` |
| Constante | `UPPER_SNAKE_CASE` | `PRODUCT_MODES` |
| Route dashboard | segment par rôle | `app/(dashboard)/seller/...` |

---

## 4. Helpers attendus (`lib/utils/`)

- `formatFCFA(amount: Money): string` → `"1 250 000 FCFA"` (espace insécable).
- `validatePhone(phone: string, country: CountryCode): boolean`.
- `computeSaving(offer: Offer): { amount: Money; percent: number } | null`.
- `assertThreeOffers(product: Product): void` — lève si `offers.length !== 3` ou modes manquants.
- `deriveBadges(product: Product, seller: Seller): BadgeType[]` — badges data-driven.
- `operatorsForCountry(country: CountryCode): MobileMoneyOperator[]`.

---

## 5. Composants partagés attendus (`components/shared/`) — anti-duplication

`PriceBlock`, `PurchaseModeChip`, `ProductCard`, `Badge`, `StarRating`, `SellerBadge`, `VerifiedBuyerBadge`,
`MobileMoneySelector`, `OtpInput`, `AddressForm`, `OrderSummary`, `QuantityStepper` (MOQ),
`StatusTimeline`, `KpiCard`, `DataTable`, `Charts`, `GeoMap`, `RoleGuard`, `Sidebar`, `Accordion`,
`SkeletonLoaders`, `FollowButton`, `SecurityScoreGauge`, `EvidenceUploader`, `DriverCard`, `ContextPanel`.

> Avant de créer un composant, vérifie cette liste et la matrice de dépendances (§13 du prompt maître). **Réutiliser, jamais dupliquer.**
