"use client";

import { ProductCard } from "@/components/shared/ProductCard";
import { getSellerById } from "@/lib/mocks/sellers";
import type { Product } from "@/types/product";

interface ProductListingPageProps {
  title: string;
  description?: string;
  products: Product[];
  emptyMessage?: string;
}

export function ProductListingPage({
  title,
  description,
  products,
  emptyMessage = "Aucun produit pour le moment.",
}: ProductListingPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-night md:text-3xl">{title}</h1>
      {description && <p className="mt-2 text-sand">{description}</p>}

      {products.length === 0 ? (
        <p className="mt-8 rounded-lg bg-surface-light p-8 text-center text-sand">{emptyMessage}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              seller={getSellerById(product.sellerId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
