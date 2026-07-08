"use client";

import { useEffect, useState } from "react";
import { useRoleStore } from "@/store/useRoleStore";

/** Attend la réhydratation Zustand avant d'afficher la nav RBAC (évite liens du mauvais rôle). */
export function useRoleHydrated(): boolean {
  const [hydrated, setHydrated] = useState(
    () => useRoleStore.persist.hasHydrated()
  );

  useEffect(() => {
    if (useRoleStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return useRoleStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  return hydrated;
}
