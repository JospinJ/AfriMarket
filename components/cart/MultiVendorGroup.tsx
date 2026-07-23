import type { CartItem } from "@/types/order";
import { getSellerById } from "@/lib/mocks/sellers";
import { CartItemRow } from "./CartItemRow";

interface MultiVendorGroupProps {
  sellerId: string;
  items: CartItem[];
}

export function MultiVendorGroup({ sellerId, items }: MultiVendorGroupProps) {
  const seller = getSellerById(sellerId);

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-1 rounded-lg bg-night/5 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="min-w-0 truncate text-sm font-semibold text-night">
          {seller?.storeName ?? "Vendeur"}
        </h3>
        <span className="shrink-0 text-xs text-sand">
          Livraison estimée 1–3 j (moto)
        </span>
      </div>
      {items.map((item) => (
        <CartItemRow key={`${item.productId}-${item.mode}`} item={item} />
      ))}
    </section>
  );
}
