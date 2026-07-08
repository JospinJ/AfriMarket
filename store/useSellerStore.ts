import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { setRuntimeCatalog } from "@/lib/catalog/runtime";
import type { StoreProfile } from "@/lib/mocks/store-profiles";
import type { Product } from "@/types/product";
import type { Seller } from "@/types/seller";
import type { ProductCreateInput, StoreCreateInput } from "@/lib/validations/seller-onboarding";
import { assertThreeOffers } from "@/lib/utils/assert-three-offers";
import { slugify } from "@/lib/utils/slugify";
import { IMAGES } from "@/lib/constants/images";

export type OnboardingStep = "register" | "store" | "product" | "done";

interface SellerCatalogState {
  store: Seller | null;
  storeProfile: StoreProfile | null;
  products: Product[];
  onboardingStep: OnboardingStep;
  hasStore: () => boolean;
  hasProducts: () => boolean;
  isOnboardingComplete: () => boolean;
  createStore: (userId: string, input: StoreCreateInput) => Seller;
  addProduct: (sellerId: string, input: ProductCreateInput) => Product;
  completeOnboarding: () => void;
  resetSellerCatalog: () => void;
  syncRuntimeCatalog: () => void;
}

function buildProduct(sellerId: string, input: ProductCreateInput): Product {
  const slug = slugify(input.title) || `produit-${Date.now().toString(36)}`;
  const product: Product = {
    id: `prod-user-${Date.now()}`,
    slug: `${slug}-${Date.now().toString(36).slice(-4)}`,
    title: input.title,
    brand: input.brand || undefined,
    categoryId: input.categoryId,
    sellerId,
    images: [input.imageUrl],
    offers: [
      {
        mode: "express",
        price: input.expressPrice,
        deliveryEtaDays: [1, 3],
        stock: input.expressStock,
      },
      {
        mode: "import",
        price: input.importPrice,
        deliveryEtaDays: [10, 25],
        stock: input.importStock,
      },
      {
        mode: "gros",
        price: input.grosPrice,
        deliveryEtaDays: [15, 30],
        stock: input.grosStock,
        moq: input.grosMoq,
      },
    ],
    rating: { average: 0, count: 0 },
    soldCount: 0,
    viewsCount: 0,
    badges: ["new"],
    createdAt: new Date().toISOString(),
  };
  assertThreeOffers(product);
  return product;
}

function buildStore(userId: string, input: StoreCreateInput): Seller {
  return {
    id: `seller-user-${userId}`,
    userId,
    storeName: input.storeName,
    storeSlug: input.storeSlug,
    logoUrl: input.logoUrl || IMAGES.placeholder,
    bannerUrl: input.bannerUrl || undefined,
    tier: "basic",
    kycStatus: "pending",
    rating: { average: 0, count: 0 },
    responseRatePct: 100,
    responseTimeMins: 30,
    followersCount: 0,
    deliveredOrders: 0,
    country: "CM",
    city: input.city,
    badges: ["local"],
  };
}

function buildProfile(input: StoreCreateInput): StoreProfile {
  return {
    slug: input.storeSlug,
    tagline: input.specialty,
    description: input.description,
    specialty: input.specialty,
    foundedYear: new Date().getFullYear(),
    deliveryZones: [input.city, "Douala", "Yaoundé"],
    avgDeliveryDays: "24–72 h (Express) · 10–25 j (Import)",
    returnPolicy: "Retour sous 7 jours si article non ouvert",
    languages: ["Français", "English"],
    highlights: ["⚡ Express local", "🌍 Import", "🏭 Vente en gros"],
  };
}

export const useSellerStore = create<SellerCatalogState>()(
  persist(
    (set, get) => ({
      store: null,
      storeProfile: null,
      products: [],
      onboardingStep: "register",
      hasStore: () => get().store !== null,
      hasProducts: () => get().products.length > 0,
      isOnboardingComplete: () => get().onboardingStep === "done",
      createStore: (userId, input) => {
        const store = buildStore(userId, input);
        const storeProfile = buildProfile(input);
        set({ store, storeProfile, onboardingStep: "product" });
        get().syncRuntimeCatalog();
        return store;
      },
      addProduct: (sellerId, input) => {
        const product = buildProduct(sellerId, input);
        set((state) => ({
          products: [product, ...state.products],
          onboardingStep: state.onboardingStep === "product" ? "done" : state.onboardingStep,
        }));
        get().syncRuntimeCatalog();
        return product;
      },
      completeOnboarding: () => set({ onboardingStep: "done" }),
      resetSellerCatalog: () =>
        set({ store: null, storeProfile: null, products: [], onboardingStep: "register" }),
      syncRuntimeCatalog: () => {
        const { store, storeProfile, products } = get();
        if (!store) return;
        setRuntimeCatalog({
          sellers: [store],
          products,
          profiles: storeProfile ? { [store.storeSlug]: storeProfile } : {},
        });
      },
    }),
    {
      name: "afrimarket-seller-catalog",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        store: state.store,
        storeProfile: state.storeProfile,
        products: state.products,
        onboardingStep: state.onboardingStep,
      }),
      onRehydrateStorage: () => (state) => {
        state?.syncRuntimeCatalog();
      },
    },
  ),
);
