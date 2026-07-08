"use client";

import { QuickViewModal } from "@/components/pdp/QuickViewModal";
import { ToastViewport } from "@/components/notifications/ToastViewport";
import { CatalogHydrator } from "@/components/shared/CatalogHydrator";

export function GlobalOverlays() {
  return (
    <>
      <CatalogHydrator />
      <QuickViewModal />
      <ToastViewport />
    </>
  );
}
