"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRoleStore } from "@/store/useRoleStore";
import { ROUTES } from "@/lib/constants/routes";

export default function RegisterPage() {
  const router = useRouter();
  const login = useRoleStore((s) => s.login);
  const isAuthenticated = useRoleStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.buyer);
    }
  }, [isAuthenticated, router]);

  const handleRegister = () => {
    login("buyer");
    router.push(ROUTES.buyer);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-night">Inscription</h1>
      <p className="mt-2 text-sand">Créez votre compte acheteur AfriMarket Hub.</p>
      <Button className="mt-8 w-full" onClick={handleRegister}>
        Créer mon compte (démo)
      </Button>
      <p className="mt-6 text-center text-sm text-sand">
        Vendeur ?{" "}
        <Link href={ROUTES.registerSeller} className="text-primary hover:text-brand-orange-dark hover:underline">
          Créer ma boutique
        </Link>
        {" · "}
        Déjà inscrit ?{" "}
        <Link href={ROUTES.login} className="text-primary hover:text-brand-orange-dark hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
