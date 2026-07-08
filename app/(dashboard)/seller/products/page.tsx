"use client";

import Link from "next/link";
import { SellerProductsList } from "@/components/seller/SellerProductsList";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

export default function SellerProductsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-night">Mes produits</h1>
          <p className="mt-1 text-sm text-sand">Catalogue Express, Import et Gros.</p>
        </div>
        <Button asChild className="bg-dash-accent text-night hover:bg-dash-accent-hover">
          <Link href={ROUTES.sellerProductsNew}>+ Nouveau produit</Link>
        </Button>
      </div>
      <SellerProductsList />
    </div>
  );
}
