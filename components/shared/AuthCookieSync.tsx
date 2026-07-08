"use client";

import { useEffect } from "react";
import { rolePersistStorage } from "@/lib/utils/role-storage";

const STORAGE_KEY = "afrimarket-role";

/** Synchronise localStorage → cookie au chargement (sessions existantes). */
export function AuthCookieSync() {
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      rolePersistStorage.setItem(STORAGE_KEY, stored);
    }
  }, []);

  return null;
}
