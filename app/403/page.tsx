import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-light px-4 text-center">
      <p className="font-display text-6xl font-bold text-terracotta">403</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-night">Accès refusé</h1>
      <p className="mt-2 max-w-md text-sm text-sand">
        Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Button asChild className="mt-6">
        <Link href="/buyer">Retour à mon espace</Link>
      </Button>
    </div>
  );
}
