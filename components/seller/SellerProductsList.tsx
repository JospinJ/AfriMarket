"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceBlock } from "@/components/shared/PriceBlock";
import { PurchaseModeChip } from "@/components/shared/PurchaseModeChip";
import { useSellerStore } from "@/store/useSellerStore";
import { ROUTES } from "@/lib/constants/routes";

export function SellerProductsList() {
  const store = useSellerStore((s) => s.store);
  const products = useSellerStore((s) => s.products);

  return (
    <div className="space-y-6">
      {store && (
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-lg border border-dash-border bg-dash-bg/50 p-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dash-accent/20 text-dash-accent">
              <Store className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-night">{store.storeName}</p>
              <Link
                href={ROUTES.store(store.storeSlug)}
                className="text-xs text-primary hover:underline"
              >
                Voir la boutique publique →
              </Link>
            </div>
          </div>
          <Button asChild size="sm" className="bg-dash-accent text-night hover:bg-dash-accent-hover">
            <Link href={ROUTES.sellerProductsNew}>
              <Plus className="mr-1 h-4 w-4" />
              Nouveau produit
            </Link>
          </Button>
        </div>
      )}

      {products.length === 0 ? (
        <div className="rounded-lg border border-dashed border-dash-border bg-white px-6 py-12 text-center">
          <p className="text-sm text-sand">Aucun produit pour le moment.</p>
          <Button asChild className="mt-4 bg-dash-accent text-night hover:bg-dash-accent-hover">
            <Link href={ROUTES.sellerOnboardingProduct}>Ajouter mon premier produit</Link>
          </Button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const express = product.offers.find((o) => o.mode === "express");
            return (
              <li
                key={product.id}
                className="overflow-hidden rounded-lg border border-dash-border bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] bg-surface-light">
                  <Image
                    src={product.images[0] ?? "/images/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-contain bg-ivory p-2"
                    sizes="(max-width:768px) 100vw, 33vw"
                    unoptimized={product.images[0]?.startsWith("http")}
                  />
                  <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-medium text-sand">
                    En validation
                  </span>
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="line-clamp-2 font-semibold text-night">{product.title}</h3>
                  {express && <PriceBlock offer={express} size="sm" />}
                  <Link
                    href={ROUTES.product(product.slug)}
                    className="inline-block text-xs font-medium text-primary hover:underline"
                  >
                    Aperçu produit →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
