/** Routes centralisées — source de vérité pour la navigation */

export const ROUTES = {
  home: "/",
  cart: "/cart",
  checkout: "/checkout",
  legal: "/legal",
  legalTerms: "/legal#intro",
  legalPrivacy: "/legal#donnees",
  kitchenSink: "/kitchen-sink",

  // Découverte
  flashSales: "/flash-sales",
  newArrivals: "/new",
  products: "/products",
  categories: "/categories",
  category: (slug: string) => `/category/${slug}` as const,
  premiumStores: "/premium-stores",
  topSellers: "/top-sellers",
  favorites: "/favorites",
  compare: "/compare",
  search: (q: string) => `/?q=${encodeURIComponent(q)}` as const,

  // Produit & boutique
  product: (slug: string) => `/products/${slug}` as const,
  store: (slug: string) => `/stores/${slug}` as const,
  tracking: (orderId: string) => `/orders/${orderId}/tracking` as const,
  trackingLookup: "/tracking",

  // Business
  becomeSeller: "/become-seller",
  becomeDriver: "/become-driver",
  premium: "/premium",
  advertise: "/advertise",
  deliveryZones: "/delivery-zones",

  // Aide
  help: "/help",
  faq: "/faq",
  contact: "/contact",

  // Compte
  login: "/login",
  register: "/register",
  addresses: "/addresses",
  wallet: "/wallet",
  settings: "/settings",

  // Dashboards
  admin: "/admin",
  seller: "/seller",
  driver: "/driver",
  buyer: "/buyer",
  support: "/support",
  messages: "/messages",
  sellerProducts: "/seller/products",
  sellerProductsNew: "/seller/products/new",
  sellerOnboarding: "/seller/onboarding",
  sellerOnboardingProduct: "/seller/onboarding/product",
  registerSeller: "/register/seller",
  sellerPremium: "/seller/premium",
  sellerAds: "/seller/ads",
  sellerReviews: "/seller/reviews",
  supportDisputes: "/support/disputes",
} as const;
