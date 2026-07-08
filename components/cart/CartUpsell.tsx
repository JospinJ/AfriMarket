import { ProductCard } from "@/components/shared/ProductCard";
import { mockProducts } from "@/lib/mocks/products";

export function CartUpsell() {
  const suggestions = mockProducts.slice(0, 4);

  return (
    <section className="space-y-3">
      <h3 className="font-display text-lg font-semibold text-night">
        Fréquemment achetés ensemble
      </h3>
      {/* TODO AI: recommandations panier */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {suggestions.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
