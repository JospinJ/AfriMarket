"use client";

import { useEffect, useState } from "react";

/** True après le premier rendu client — évite les mismatches d'hydratation (Zustand persist, Date, etc.). */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
