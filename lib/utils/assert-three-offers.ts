import { PRODUCT_MODES, type Product } from "@/types/product";

export function assertThreeOffers(product: Product): void {
  if (product.offers.length !== 3) {
    throw new Error(`Product ${product.id} must have exactly 3 offers`);
  }
  for (const mode of PRODUCT_MODES) {
    if (!product.offers.some((o) => o.mode === mode)) {
      throw new Error(`Product ${product.id} missing offer for mode: ${mode}`);
    }
  }
  const gros = product.offers.find((o) => o.mode === "gros");
  if (gros && !gros.moq) {
    throw new Error(`Product ${product.id} gros offer requires moq`);
  }
}

export { PRODUCT_MODES };
