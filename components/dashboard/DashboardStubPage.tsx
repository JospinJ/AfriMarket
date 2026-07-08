import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DashboardStubPageProps {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

export function DashboardStubPage({
  title,
  description,
  backHref = "/",
  backLabel = "Retour au tableau de bord",
}: DashboardStubPageProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-lg border border-dash-border bg-white shadow-sm">
        <div className="h-1 bg-dash-accent" aria-hidden />
        <header className="border-b border-dash-border px-6 py-5">
          <h1 className="font-display text-xl font-bold text-night">{title}</h1>
          <p className="mt-1 text-sm text-sand">{description}</p>
        </header>
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-sand">
            {/* TODO API: brancher les données réelles */}
            Module en préparation — interface mockée pour la navigation.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-5 border-dash-border hover:border-dash-accent hover:text-[#c45500]"
          >
            <Link href={backHref}>{backLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
