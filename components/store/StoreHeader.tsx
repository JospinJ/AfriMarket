import Image from "next/image";
import { MessageCircle, Share2 } from "lucide-react";
import type { Seller } from "@/types/seller";
import { SellerBadge } from "@/components/shared/SellerBadge";
import { StarRating } from "@/components/shared/StarRating";
import { FollowButton } from "@/components/shared/FollowButton";

interface StoreHeaderProps {
  seller: Seller;
}

export function StoreHeader({ seller }: StoreHeaderProps) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Découvrez la boutique ${seller.storeName} sur AfriMarket Hub`
  )}`;

  return (
    <div className="relative">
      <div className="relative h-32 overflow-hidden bg-night md:h-48">
        {seller.bannerUrl && (
          <Image
            src={seller.bannerUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-motif-wax" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="-mt-10 flex flex-col gap-4 md:-mt-12 md:flex-row md:items-end">
          {seller.logoUrl && (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-md md:h-24 md:w-24">
              <Image src={seller.logoUrl} alt={seller.storeName} fill sizes="96px" className="object-cover" />
            </div>
          )}
          <div className="flex-1 pb-2">
            <h1 className="font-display text-2xl font-bold text-night">{seller.storeName}</h1>
            <SellerBadge tier={seller.tier} verified={seller.kycStatus === "verified"} />
            <StarRating rating={seller.rating.average} count={seller.rating.count} className="mt-1" />
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-sand">
              {seller.deliveredOrders && (
                <span>{seller.deliveredOrders} commandes livrées</span>
              )}
              {seller.followersCount && (
                <span>{seller.followersCount} abonnés</span>
              )}
              {seller.responseTimeMins && (
                <span>Répond en ~{seller.responseTimeMins} min</span>
              )}
              {seller.city && <span>{seller.city}, {seller.country}</span>}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pb-2">
            <FollowButton sellerId={seller.id} />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <button
              type="button"
              aria-label="Partager la boutique"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-sand/30 px-4 py-2 text-sm"
            >
              <Share2 size={18} />
              Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
