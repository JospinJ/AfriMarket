import { notFound } from "next/navigation";
import { ProductListingPage } from "@/components/marketing/ProductListingPage";
import { filterProducts } from "@/lib/utils/filter-products";
import { getAllProducts } from "@/services/products";
import { getCategoryIdBySlug, getCategoryNameBySlug } from "@/lib/utils/category";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  return { title: `${getCategoryNameBySlug(slug)} — AfriMarket Hub` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryId = getCategoryIdBySlug(slug);
  if (!categoryId) notFound();

  const products = filterProducts(getAllProducts(), {
    categoryId,
    premiumOnly: false,
    fastDelivery: false,
    searchQuery: "",
  });

  return (
    <ProductListingPage
      title={getCategoryNameBySlug(slug)}
      description={`${products.length} produit${products.length !== 1 ? "s" : ""} — Express, Import et Gros.`}
      products={products}
      emptyMessage={`Aucun produit dans « ${getCategoryNameBySlug(slug)} » pour le moment. Parcourez toutes les catégories.`}
    />
  );
}
