import Link from "next/link";
import Image from "next/image";
import type { Seller } from "@/types/seller";
import { SellerBadge } from "@/components/shared/SellerBadge";
import { StarRating } from "@/components/shared/StarRating";

interface SellerMiniCardProps {
  seller: Seller;
}

export function SellerMiniCard({ seller }: SellerMiniCardProps) {
  return (
    <div className="rounded-2xl border border-sand/20 bg-white p-4">
      <div className="flex items-start gap-3">
        {seller.logoUrl && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image src={seller.logoUrl} alt={seller.storeName} fill sizes="48px" className="object-cover" />
          </div>
        )}
        <div className="flex-1">
          <SellerBadge
            storeName={seller.storeName}
            tier={seller.tier}
            verified={seller.kycStatus === "verified"}
          />
          <StarRating
            rating={seller.rating.average}
            count={seller.rating.count}
            size="sm"
            className="mt-1"
          />
          <p className="mt-1 text-xs text-sand">
            {seller.responseRatePct}% réponse · {seller.responseTimeMins} min · {seller.city}, {seller.country}
          </p>
        </div>
      </div>
      <Link
        href={`/stores/${seller.storeSlug}`}
        className="mt-3 inline-flex min-h-[44px] items-center text-sm font-medium text-green-deep hover:underline"
      >
        Voir la boutique →
      </Link>
    </div>
  );
}
