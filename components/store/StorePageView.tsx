"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getSellerBySlug } from "@/lib/mocks/sellers";
import { getProductsBySeller } from "@/lib/mocks/products";
import { StoreContent } from "@/components/store/StoreContent";
import { useSellerStore } from "@/store/useSellerStore";

interface StorePageViewProps {
  slug: string;
}

export function StorePageView({ slug }: StorePageViewProps) {
  const [ready, setReady] = useState(false);
  const syncRuntimeCatalog = useSellerStore((s) => s.syncRuntimeCatalog);

  useEffect(() => {
    syncRuntimeCatalog();
    setReady(true);
  }, [syncRuntimeCatalog]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-surface-light">
        <p className="text-sm text-sand">Chargement de la boutique…</p>
      </div>
    );
  }

  const seller = getSellerBySlug(slug);
  if (!seller) notFound();

  const products = getProductsBySeller(seller.id);
  return <StoreContent seller={seller} products={products} />;
}
