import { getSellerBySlug } from "@/lib/mocks/sellers";
import { StorePageView } from "@/components/store/StorePageView";

interface StorePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: StorePageProps) {
  const seller = getSellerBySlug(params.slug);
  if (!seller) return { title: "Boutique introuvable" };
  return {
    title: `${seller.storeName} | AfriMarket Hub`,
    description: `Découvrez la boutique ${seller.storeName} sur AfriMarket Hub.`,
  };
}

export default function StorePage({ params }: StorePageProps) {
  return <StorePageView slug={params.slug} />;
}
