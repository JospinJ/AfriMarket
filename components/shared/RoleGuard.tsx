"use client";

import { useRole } from "@/hooks/useRole";
import type { Role, SellerTier } from "@/types";

const TIER_RANK: Record<SellerTier, number> = {
  basic: 0,
  gold: 1,
  elite: 2,
};

export interface RoleGuardProps {
  allow: Role[];
  minTier?: SellerTier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function meetsTierRequirement(
  role: Role,
  tier: SellerTier | undefined,
  minTier: SellerTier | undefined
): boolean {
  if (!minTier) return true;
  if (role !== "seller") return false;
  const current = tier ?? "basic";
  return TIER_RANK[current] >= TIER_RANK[minTier];
}

export function RoleGuard({ allow, minTier, children, fallback = null }: RoleGuardProps) {
  const { role, tier } = useRole();

  const isAllowed = allow.includes(role) && meetsTierRequirement(role, tier, minTier);

  if (!isAllowed) return <>{fallback}</>;
  return <>{children}</>;
}
