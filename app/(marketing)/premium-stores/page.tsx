import Link from "next/link";
import Image from "next/image";
import { mockSellers } from "@/lib/mocks/sellers";
import { IMAGES } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { SellerBadge } from "@/components/shared/SellerBadge";

export const metadata = { title: "Boutiques Premium — AfriMarket Hub" };

export default function PremiumStoresPage() {
  const premiumSellers = mockSellers.filter(
    (s) => s.tier === "gold" || s.tier === "elite"
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-night md:text-3xl">
        Boutiques Premium
      </h1>
      <p className="mt-2 text-sand">
        Vendeurs certifiés Gold & Elite — qualité et service garantis.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {premiumSellers.map((seller) => (
          <Link
            key={seller.id}
            href={ROUTES.store(seller.storeSlug)}
            className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image
                src={seller.logoUrl ?? IMAGES.sellers.seller1}
                alt={seller.storeName}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-night">{seller.storeName}</p>
              <p className="text-sm text-sand">{seller.city}</p>
              <SellerBadge tier={seller.tier} className="mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
