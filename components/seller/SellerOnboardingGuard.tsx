"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRole } from "@/hooks/useRole";
import { useSellerStore } from "@/store/useSellerStore";
import { ROUTES } from "@/lib/constants/routes";

const ONBOARDING_PREFIX = "/seller/onboarding";

export function SellerOnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { role, isAuthenticated, isNewSeller, userId } = useRole();
  const store = useSellerStore((s) => s.store);
  const products = useSellerStore((s) => s.products);
  const onboardingStep = useSellerStore((s) => s.onboardingStep);
  const isOnboardingRoute = pathname.startsWith(ONBOARDING_PREFIX);

  useEffect(() => {
    if (role !== "seller" || !isAuthenticated) return;

    const mockSellerWithStore = !isNewSeller && userId && !store;
    if (mockSellerWithStore) return;

    if (!store && !isOnboardingRoute) {
      router.replace(ROUTES.sellerOnboarding);
      return;
    }
    if (store && products.length === 0 && onboardingStep === "product" && !isOnboardingRoute) {
      router.replace(ROUTES.sellerOnboardingProduct);
      return;
    }
  }, [
    role,
    isAuthenticated,
    isNewSeller,
    userId,
    store,
    products.length,
    onboardingStep,
    isOnboardingRoute,
    router,
    pathname,
  ]);

  return <>{children}</>;
}
