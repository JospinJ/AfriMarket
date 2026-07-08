import type { Role, SellerTier } from "@/types/user";

export interface NavItem {
  labelKey: string;
  href: string;
  iconKey: string;
  minTier?: SellerTier;
  permission?:
    | "viewFullAnalytics"
    | "manageUsers"
    | "createProduct"
    | "acceptDelivery"
    | "createCampaign"
    | "moderateDispute";
}

export function getDashboardNav(role: Role, tier?: SellerTier, isSupport?: boolean): NavItem[] {
  const securityHref = `/${role}/security`;

  switch (role) {
    case "admin":
      return [
        { labelKey: "dashboard.nav.overview", href: "/admin", iconKey: "overview" },
        {
          labelKey: "dashboard.nav.users",
          href: "/admin/users",
          iconKey: "users",
          permission: "manageUsers",
        },
        { labelKey: "dashboard.nav.deliveryZones", href: "/admin/delivery-zones", iconKey: "deliveryZones" },
        {
          labelKey: "dashboard.nav.analytics",
          href: "/admin/analytics",
          iconKey: "analytics",
          permission: "viewFullAnalytics",
        },
        { labelKey: "dashboard.nav.messages", href: "/messages", iconKey: "messages" },
        { labelKey: "dashboard.nav.security", href: securityHref, iconKey: "security" },
        ...(isSupport
          ? [
              {
                labelKey: "dashboard.nav.supportDisputes",
                href: "/support/disputes",
                iconKey: "supportDisputes",
                permission: "moderateDispute" as const,
              },
            ]
          : []),
      ];
    case "seller":
      return [
        { labelKey: "dashboard.nav.overview", href: "/seller", iconKey: "overview" },
        {
          labelKey: "dashboard.nav.products",
          href: "/seller/products",
          iconKey: "products",
          permission: "createProduct",
        },
        { labelKey: "dashboard.nav.orders", href: "/seller/orders", iconKey: "orders" },
        { labelKey: "dashboard.nav.premium", href: "/seller/premium", iconKey: "premium" },
        {
          labelKey: "dashboard.nav.ads",
          href: "/seller/ads",
          iconKey: "ads",
          permission: "createCampaign",
        },
        {
          labelKey: "dashboard.nav.adsAnalytics",
          href: "/seller/ads/analytics",
          iconKey: "adsAnalytics",
          permission: "viewFullAnalytics",
          minTier: "gold",
        },
        { labelKey: "dashboard.nav.reviews", href: "/seller/reviews", iconKey: "reviews" },
        { labelKey: "dashboard.nav.messages", href: "/messages", iconKey: "messages" },
        { labelKey: "dashboard.nav.security", href: securityHref, iconKey: "security" },
      ];
    case "driver":
      return [
        { labelKey: "dashboard.nav.overview", href: "/driver", iconKey: "overview" },
        {
          labelKey: "dashboard.nav.deliveries",
          href: "/driver/deliveries",
          iconKey: "deliveries",
          permission: "acceptDelivery",
        },
        { labelKey: "dashboard.nav.earnings", href: "/driver/earnings", iconKey: "earnings" },
        { labelKey: "dashboard.nav.messages", href: "/messages", iconKey: "messages" },
        { labelKey: "dashboard.nav.security", href: securityHref, iconKey: "security" },
      ];
    case "buyer":
      return [
        { labelKey: "dashboard.nav.overview", href: "/buyer", iconKey: "overview" },
        { labelKey: "dashboard.nav.orders", href: "/buyer/orders", iconKey: "orders" },
        { labelKey: "dashboard.nav.messages", href: "/messages", iconKey: "messages" },
        { labelKey: "dashboard.nav.security", href: securityHref, iconKey: "security" },
      ];
    default:
      return [];
  }
}

export function getSupportNav(): NavItem[] {
  return [
    { labelKey: "dashboard.nav.overview", href: "/support", iconKey: "overview" },
    {
      labelKey: "dashboard.nav.disputes",
      href: "/support/disputes",
      iconKey: "disputes",
      permission: "moderateDispute",
    },
    { labelKey: "dashboard.nav.messages", href: "/messages", iconKey: "messages" },
    { labelKey: "dashboard.nav.security", href: "/support/security", iconKey: "security" },
  ];
}

export function filterNavByPermissions(
  items: NavItem[],
  can: (action: NonNullable<NavItem["permission"]>) => boolean,
  role: Role,
  tier?: SellerTier,
): NavItem[] {
  const TIER_RANK = { basic: 0, gold: 1, elite: 2 } as const;

  return items.filter((item) => {
    if (item.permission && !can(item.permission)) return false;
    if (item.minTier && role === "seller") {
      const current = tier ?? "basic";
      if (TIER_RANK[current] < TIER_RANK[item.minTier]) return false;
    }
    return true;
  });
}
