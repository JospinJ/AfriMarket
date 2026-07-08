"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdsHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-night">Ads Analytics</h1>
        <p className="mt-1 text-sm text-sand">Performance de vos campagnes publicitaires</p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="/seller/ads" className="gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Campagnes
        </Link>
      </Button>
    </header>
  );
}
