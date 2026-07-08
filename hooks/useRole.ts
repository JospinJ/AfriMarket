"use client";

import { useCallback } from "react";
import { useRoleStore } from "@/store/useRoleStore";
import type { PermissionAction, Role, SellerTier } from "@/types/user";

const PERMISSIONS: Record<PermissionAction, (role: Role, tier?: SellerTier, isSupport?: boolean) => boolean> = {
  viewFullAnalytics: (role, tier) =>
    role === "admin" || (role === "seller" && (tier === "gold" || tier === "elite")),
  manageUsers: (role) => role === "admin",
  createProduct: (role) => role === "seller",
  acceptDelivery: (role) => role === "driver",
  createCampaign: (role) => role === "seller" || role === "admin",
  moderateDispute: (role, _tier, isSupport) => role === "admin" || isSupport === true,
};

const ROLE_HOME: Record<Role, string> = {
  admin: "/admin",
  seller: "/seller",
  driver: "/driver",
  buyer: "/buyer",
};

export function useRole() {
  const role = useRoleStore((s) => s.role);
  const tier = useRoleStore((s) => s.tier);
  const isSupport = useRoleStore((s) => s.isSupport);
  const userId = useRoleStore((s) => s.userId);
  const isAuthenticated = useRoleStore((s) => s.isAuthenticated);
  const isNewSeller = useRoleStore((s) => s.isNewSeller);
  const login = useRoleStore((s) => s.login);
  const logout = useRoleStore((s) => s.logout);
  const setRole = useRoleStore((s) => s.setRole);

  const can = useCallback(
    (action: PermissionAction): boolean => PERMISSIONS[action](role, tier, isSupport),
    [role, tier, isSupport]
  );

  const homePath = ROLE_HOME[role];

  return { role, tier, isSupport, userId, isAuthenticated, isNewSeller, can, homePath, login, logout, setRole };
}
