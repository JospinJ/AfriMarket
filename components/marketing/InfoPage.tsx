import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

interface InfoPageProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function InfoPage({
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
}: InfoPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-night">{title}</h1>
      <p className="mt-4 text-lg text-sand">{description}</p>
      {children && <div className="mt-6 space-y-4 text-night">{children}</div>}
      <div className="mt-8 flex flex-wrap gap-3">
        {primaryAction && (
          <Button asChild>
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </Button>
        )}
        {secondaryAction && (
          <Button asChild variant="outline">
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
        {!primaryAction && (
          <Button asChild variant="outline">
            <Link href={ROUTES.home}>Retour à l&apos;accueil</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
