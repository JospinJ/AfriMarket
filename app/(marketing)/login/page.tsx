"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRoleStore } from "@/store/useRoleStore";
import { ROUTES } from "@/lib/constants/routes";
import type { Role } from "@/types/user";

const ROLE_HOME: Record<Role, string> = {
  admin: ROUTES.admin,
  seller: ROUTES.seller,
  driver: ROUTES.driver,
  buyer: ROUTES.buyer,
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-12">Chargement…</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useRoleStore((s) => s.login);
  const isAuthenticated = useRoleStore((s) => s.isAuthenticated);
  const role = useRoleStore((s) => s.role);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROLE_HOME[role]);
    }
  }, [isAuthenticated, role, router]);

  const handleLogin = (selectedRole: Role) => {
    login(selectedRole);
    const next = searchParams.get("next");
    const destination =
      next && next.startsWith("/") ? next : ROLE_HOME[selectedRole];
    router.push(destination);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-night">Connexion</h1>
      <p className="mt-2 text-sand">Choisissez un profil démo pour accéder à la plateforme.</p>
      <div className="mt-8 grid gap-3">
        {(["buyer", "seller", "driver", "admin"] as const).map((r) => (
          <Button key={r} variant="outline" className="justify-start" onClick={() => handleLogin(r)}>
            Se connecter en {r}
          </Button>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-sand">
        Pas de compte ?{" "}
        <Link href={ROUTES.register} className="text-primary hover:text-brand-orange-dark hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}
