"use client";

import { SellerOnboardingGuard } from "@/components/seller/SellerOnboardingGuard";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return <SellerOnboardingGuard>{children}</SellerOnboardingGuard>;
}
