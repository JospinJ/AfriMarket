import { ProductListingPage } from "@/components/marketing/ProductListingPage";
import { getAllProducts } from "@/services/products";

export const metadata = {
  title: "Tous les produits — AfriMarket Hub",
  description: "Parcourez l'ensemble du catalogue — Express, Import et Gros.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <ProductListingPage
      title="Tous les produits"
      description="Express, Import et Gros — chaque produit affiche ses 3 modes d'achat."
      products={products}
      emptyMessage="Aucun produit disponible pour le moment."
    />
  );
}
