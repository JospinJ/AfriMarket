"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/mocks/products";
import { getSellerById } from "@/lib/mocks/sellers";
import { PdpContent } from "@/components/pdp/PdpContent";
import { useSellerStore } from "@/store/useSellerStore";

interface ProductPageViewProps {
  slug: string;
}

export function ProductPageView({ slug }: ProductPageViewProps) {
  const [ready, setReady] = useState(false);
  const syncRuntimeCatalog = useSellerStore((s) => s.syncRuntimeCatalog);

  useEffect(() => {
    syncRuntimeCatalog();
    setReady(true);
  }, [syncRuntimeCatalog]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-sand">Chargement du produit…</p>
      </div>
    );
  }

  const product = getProductBySlug(slug);
  if (!product) notFound();
  const seller = getSellerById(product.sellerId);
  if (!seller) notFound();

  return <PdpContent product={product} seller={seller} />;
}
