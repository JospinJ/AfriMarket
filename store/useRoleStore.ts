import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Role, SellerTier } from "@/types/user";
import { mockUsers } from "@/lib/mocks/sellers";
import { rolePersistStorage } from "@/lib/utils/role-storage";
import type { SellerRegisterInput } from "@/lib/validations/seller-onboarding";

interface RoleState {
  isAuthenticated: boolean;
  userId: string;
  role: Role;
  tier?: SellerTier;
  isSupport: boolean;
  /** Profil vendeur enregistré via le parcours d'onboarding */
  isNewSeller?: boolean;
  login: (role: Role) => void;
  registerSeller: (data: SellerRegisterInput) => void;
  logout: () => void;
  /** @deprecated Préférer login() */
  setRole: (role: Role) => void;
}

const guestState = {
  isAuthenticated: false,
  userId: "",
  role: "buyer" as Role,
  tier: undefined as SellerTier | undefined,
  isSupport: false,
  isNewSeller: false,
};

export const useRoleStore = create<RoleState>()(
  persist(
    (set, get) => ({
      ...guestState,
      login: (role) => {
        const user = mockUsers.find((u) => u.role === role);
        set({
          isAuthenticated: true,
          role,
          userId: user?.id ?? "",
          tier: user?.sellerTier,
          isSupport: user?.isSupport ?? false,
          isNewSeller: false,
        });
      },
      registerSeller: (data) => {
        const userId = `user-seller-new-${Date.now()}`;
        set({
          isAuthenticated: true,
          role: "seller",
          userId,
          tier: "basic",
          isSupport: false,
          isNewSeller: true,
        });
        void data;
        // TODO API: POST /auth/register-seller → { userId, token }
      },
      logout: () => {
        set(guestState);
      },
      setRole: (role) => get().login(role),
    }),
    {
      name: "afrimarket-role",
      storage: createJSONStorage(() => rolePersistStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        role: state.role,
        tier: state.tier,
        isSupport: state.isSupport,
        isNewSeller: state.isNewSeller,
      }),
    }
  )
);
