import { getProductBySlug } from "@/lib/mocks/products";
import { ProductPageView } from "@/components/pdp/ProductPageView";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: `${product.title} | AfriMarket Hub`,
    description: `Achetez ${product.title} en Express, Import ou Gros sur AfriMarket Hub.`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductPageView slug={params.slug} />;
}
