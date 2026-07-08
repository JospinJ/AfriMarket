"use client";

import { useEffect } from "react";
import { useSellerStore } from "@/store/useSellerStore";

/** Synchronise le catalogue vendeur persisté vers le registre runtime (client). */
export function CatalogHydrator() {
  const syncRuntimeCatalog = useSellerStore((s) => s.syncRuntimeCatalog);

  useEffect(() => {
    syncRuntimeCatalog();
  }, [syncRuntimeCatalog]);

  return null;
}
