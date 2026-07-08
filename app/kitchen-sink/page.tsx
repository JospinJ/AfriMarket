"use client";

import { mockProducts } from "@/lib/mocks/products";
import { getSellerById } from "@/lib/mocks/sellers";
import { ProductCard } from "@/components/shared/ProductCard";
import { PriceBlock } from "@/components/shared/PriceBlock";
import { PurchaseModeChip } from "@/components/shared/PurchaseModeChip";
import { StarRating } from "@/components/shared/StarRating";
import { DynamicBadgeList } from "@/components/shared/Badge";
import { KpiCard } from "@/components/shared/KpiCard";
import { StatusTimeline } from "@/components/shared/StatusTimeline";
import { MobileMoneySelector } from "@/components/shared/MobileMoneySelector";
import { OtpInput } from "@/components/shared/OtpInput";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { ProductCardSkeleton, KpiSkeleton } from "@/components/shared/SkeletonLoaders";
import { deriveBadges } from "@/lib/utils/derive-badges";
import { TrendingUp } from "lucide-react";

const sampleProduct = mockProducts[0]!;
const sampleSeller = getSellerById(sampleProduct.sellerId)!;

export default function KitchenSinkPage() {
  return (
    <div className="min-h-screen bg-surface-light p-8">
      <h1 className="mb-8 font-display text-3xl font-bold text-night">
        Kitchen Sink — Composants partagés
      </h1>

      <div className="grid gap-12">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Triptyque (invariant #1)</h2>
          <div className="flex flex-wrap gap-4">
            {sampleProduct.offers.map((offer) => (
              <div key={offer.mode} className="rounded-lg border bg-white p-4">
                <PriceBlock offer={offer} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">PurchaseModeChip</h2>
          <div className="flex gap-2">
            {sampleProduct.offers.map((o) => (
              <PurchaseModeChip key={o.mode} mode={o.mode} etaDays={o.deliveryEtaDays} moq={o.moq} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Badges dynamiques</h2>
          <DynamicBadgeList badges={deriveBadges(sampleProduct, sampleSeller)} />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">StarRating</h2>
          <StarRating rating={4.5} count={128} />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">ProductCard</h2>
          <div className="max-w-xs">
            <ProductCard product={sampleProduct} seller={sampleSeller} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">KpiCard</h2>
          <div className="grid max-w-md grid-cols-2 gap-4">
            <KpiCard title="Commandes" value="1 234" change="+12%" trend="up" icon={TrendingUp} />
            <KpiSkeleton />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">StatusTimeline</h2>
          <StatusTimeline
            steps={[
              { key: "confirmed", label: "Confirmée", done: true },
              { key: "prepared", label: "Préparée", done: true },
              { key: "shipped", label: "Expédiée", done: false },
              { key: "in_delivery", label: "En livraison", done: false },
              { key: "delivered", label: "Livrée", done: false },
            ]}
          />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Mobile Money + OTP</h2>
          <div className="max-w-md space-y-4 rounded-lg border bg-white p-4">
            <MobileMoneySelector country="CM" />
            <OtpInput onComplete={() => {}} onResend={() => {}} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">QuantityStepper (MOQ Gros)</h2>
          <QuantityStepper
            quantity={10}
            min={sampleProduct.offers.find((o) => o.mode === "gros")?.moq ?? 1}
            max={500}
            moq={sampleProduct.offers.find((o) => o.mode === "gros")?.moq}
            onChange={() => {}}
          />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Skeleton</h2>
          <ProductCardSkeleton />
        </section>
      </div>
    </div>
  );
}
