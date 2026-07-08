import Link from "next/link";
import Image from "next/image";
import { mockSellers } from "@/lib/mocks/sellers";
import { IMAGES } from "@/lib/constants/images";
import { ROUTES } from "@/lib/constants/routes";
import { StarRating } from "@/components/shared/StarRating";

export const metadata = { title: "Top vendeurs — AfriMarket Hub" };

export default function TopSellersPage() {
  const sorted = [...mockSellers].sort((a, b) => b.rating.average - a.rating.average);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-night md:text-3xl">Top vendeurs</h1>
      <p className="mt-2 text-sand">Les boutiques les mieux notées par les acheteurs.</p>
      <ol className="mt-8 space-y-3">
        {sorted.map((seller, index) => (
          <li key={seller.id}>
            <Link
              href={ROUTES.store(seller.storeSlug)}
              className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">
                {index + 1}
              </span>
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={seller.logoUrl ?? IMAGES.sellers.seller1}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-night">{seller.storeName}</p>
                <p className="text-sm text-sand">{seller.city}</p>
              </div>
              <StarRating rating={seller.rating.average} size="sm" />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
