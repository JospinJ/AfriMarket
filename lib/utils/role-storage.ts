import type { StateStorage } from "zustand/middleware";

/** Sync Zustand persist ↔ cookie pour que le middleware RBAC lise le bon rôle. */
export const rolePersistStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")
      .slice(1)
      .join("=");
    if (cookie) return decodeURIComponent(cookie);
    return localStorage.getItem(name);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, value);
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  },
};
