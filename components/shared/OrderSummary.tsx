import { formatFCFA } from "@/lib/utils/format-fcfa";
import { cn } from "@/lib/utils/cn";
import type { CartItem } from "@/types/order";
import { getProductById } from "@/lib/mocks/products";
import { PurchaseModeChip } from "./PurchaseModeChip";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee?: number;
  discount?: number;
  className?: string;
}

export function OrderSummary({
  items,
  subtotal,
  deliveryFee = 0,
  discount = 0,
  className,
}: OrderSummaryProps) {
  const total = subtotal + deliveryFee - discount;

  return (
    <div className={cn("space-y-4 rounded-2xl bg-white p-4 shadow-sm", className)}>
      <h3 className="font-display text-lg font-semibold text-night">Résumé</h3>
      <ul className="max-h-48 space-y-3 overflow-y-auto">
        {items.map((item) => {
          const product = getProductById(item.productId);
          return (
            <li key={`${item.productId}-${item.mode}`} className="flex justify-between gap-2 text-sm">
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 break-words font-medium text-night">{item.title ?? product?.title}</p>
                <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2">
                  <PurchaseModeChip mode={item.mode} size="sm" />
                  <span className="text-sand">×{item.quantity}</span>
                </div>
              </div>
              <span className="shrink-0 font-medium tabular-nums">
                {formatFCFA(item.unitPrice * item.quantity)}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="space-y-2 border-t border-sand/20 pt-3 text-sm">
        <div className="flex justify-between">
          <span className="text-sand">Sous-total</span>
          <span>{formatFCFA(subtotal)}</span>
        </div>
        {deliveryFee > 0 && (
          <div className="flex justify-between">
            <span className="text-sand">Livraison</span>
            <span>{formatFCFA(deliveryFee)}</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-green-deep">
            <span>Réduction</span>
            <span>-{formatFCFA(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold text-night">
          <span>Total</span>
          <span>{formatFCFA(total)}</span>
        </div>
      </div>
    </div>
  );
}
