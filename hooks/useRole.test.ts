import { describe, it, expect } from "vitest";
import type { PermissionAction, Role } from "@/types/user";

const PERMISSIONS: Record<
  PermissionAction,
  (role: Role, tier?: string, isSupport?: boolean) => boolean
> = {
  viewFullAnalytics: (role, tier) =>
    role === "admin" || (role === "seller" && (tier === "gold" || tier === "elite")),
  manageUsers: (role) => role === "admin",
  createProduct: (role) => role === "seller",
  acceptDelivery: (role) => role === "driver",
  createCampaign: (role) => role === "seller" || role === "admin",
  moderateDispute: (role, _tier, isSupport) => role === "admin" || isSupport === true,
};

describe("RBAC permissions", () => {
  it("buyer cannot create product", () => {
    expect(PERMISSIONS.createProduct("buyer")).toBe(false);
  });

  it("seller can create product", () => {
    expect(PERMISSIONS.createProduct("seller")).toBe(true);
  });

  it("seller basic cannot view full analytics", () => {
    expect(PERMISSIONS.viewFullAnalytics("seller", "basic")).toBe(false);
  });

  it("seller gold can view full analytics", () => {
    expect(PERMISSIONS.viewFullAnalytics("seller", "gold")).toBe(true);
  });

  it("only driver can accept delivery", () => {
    expect(PERMISSIONS.acceptDelivery("driver")).toBe(true);
    expect(PERMISSIONS.acceptDelivery("buyer")).toBe(false);
  });

  it("only admin can manage users", () => {
    expect(PERMISSIONS.manageUsers("admin")).toBe(true);
    expect(PERMISSIONS.manageUsers("seller")).toBe(false);
  });
});
