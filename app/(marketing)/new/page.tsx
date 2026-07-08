import { ProductListingPage } from "@/components/marketing/ProductListingPage";
import { getNewProducts } from "@/lib/utils/filter-products";
import { getAllProducts } from "@/services/products";

export const metadata = { title: "Nouveautés — AfriMarket Hub" };

export default function NewArrivalsPage() {
  const products = getNewProducts(getAllProducts());
  return (
    <ProductListingPage
      title="Nouveautés"
      description="Les derniers produits ajoutés sur la marketplace."
      products={products}
    />
  );
}
