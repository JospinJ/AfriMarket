import { ProductListingPage } from "@/components/marketing/ProductListingPage";
import { getFlashSaleProducts } from "@/lib/utils/filter-products";
import { getAllProducts } from "@/services/products";

export const metadata = { title: "Flash Sales — AfriMarket Hub" };

export default function FlashSalesPage() {
  const products = getFlashSaleProducts(getAllProducts());
  return (
    <ProductListingPage
      title="⚡ Flash Sales"
      description="Offres limitées — stock local, livraison express 24–72 h."
      products={products}
      emptyMessage="Aucune flash sale en cours. Revenez bientôt !"
    />
  );
}
