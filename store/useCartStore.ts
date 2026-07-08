import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/order";
import type { PurchaseMode } from "@/types/product";
import { getProductById } from "@/lib/mocks/products";

interface CartState {
  items: CartItem[];
  couponCode?: string;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, mode: PurchaseMode) => void;
  updateQuantity: (productId: string, mode: PurchaseMode, quantity: number) => void;
  setCoupon: (code: string | undefined) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: undefined,
      addItem: (item) => {
        const product = getProductById(item.productId);
        const offer = product?.offers.find((o) => o.mode === item.mode);
        if (!offer) return;

        let quantity = item.quantity ?? 1;
        if (item.mode === "gros" && offer.moq && quantity < offer.moq) {
          quantity = offer.moq;
        }

        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.mode === item.mode
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.mode === item.mode
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity,
                unitPrice: item.unitPrice,
                title: item.title ?? product?.title,
                image: item.image ?? product?.images[0],
              },
            ],
          };
        });
      },
      removeItem: (productId, mode) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.mode === mode)
          ),
        })),
      updateQuantity: (productId, mode, quantity) => {
        const product = getProductById(productId);
        const offer = product?.offers.find((o) => o.mode === mode);
        if (!offer) return;
        if (quantity > offer.stock) return;
        if (mode === "gros" && offer.moq && quantity < offer.moq) return;
        if (quantity < 1) return;

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.mode === mode ? { ...i, quantity } : i
          ),
        }));
      },
      setCoupon: (code) => set({ couponCode: code }),
      clearCart: () => set({ items: [], couponCode: undefined }),
      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "afrimarket-cart" }
  )
);
