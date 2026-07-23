import { IMAGES } from "@/lib/constants/images";
import { PRODUCT_IMAGE_GALLERIES } from "@/lib/constants/product-images";
import { assertThreeOffers } from "@/lib/utils/assert-three-offers";
import { specialtyProducts } from "@/lib/mocks/specialty-stores";
import {
  getRuntimeProductById,
  getRuntimeProductBySlug,
  getRuntimeProductsBySeller,
} from "@/lib/catalog/runtime";
import type { Product } from "@/types/product";

function createProduct(
  partial: Omit<Product, "offers"> & {
    expressPrice: number;
    importPrice: number;
    grosPrice: number;
    grosMoq: number;
    expressOriginal?: number;
    importOriginal?: number;
  }
): Product {
  const product: Product = {
    ...partial,
    offers: [
      {
        mode: "express",
        price: partial.expressPrice,
        originalPrice: partial.expressOriginal,
        deliveryEtaDays: [1, 3],
        stock: 25,
      },
      {
        mode: "import",
        price: partial.importPrice,
        originalPrice: partial.importOriginal,
        deliveryEtaDays: [10, 25],
        stock: 100,
      },
      {
        mode: "gros",
        price: partial.grosPrice,
        deliveryEtaDays: [15, 30],
        stock: 500,
        moq: partial.grosMoq,
      },
    ],
  };
  assertThreeOffers(product);
  return product;
}

export const mockProducts: Product[] = [
  createProduct({
    id: "prod-1",
    slug: "samsung-galaxy-a15",
    title: "Samsung Galaxy A15 128Go",
    brand: "Samsung",
    categoryId: "phones",
    sellerId: "seller-1",
    images: [...PRODUCT_IMAGE_GALLERIES.phone1],
    expressPrice: 125000,
    expressOriginal: 145000,
    importPrice: 89000,
    importOriginal: 110000,
    grosPrice: 75000,
    grosMoq: 10,
    rating: { average: 4.5, count: 128 },
    soldCount: 340,
    viewsCount: 2100,
    createdAt: "2026-05-01T00:00:00Z",
    specs: { stockage: "128 Go", ram: "6 Go", ecran: "6.5 pouces" },
  }),
  createProduct({
    id: "prod-2",
    slug: "iphone-13-reconditionne",
    title: "iPhone 13 Reconditionné 256Go",
    brand: "Apple",
    categoryId: "phones",
    sellerId: "seller-2",
    images: [IMAGES.products.phone2],
    expressPrice: 385000,
    expressOriginal: 420000,
    importPrice: 295000,
    grosPrice: 260000,
    grosMoq: 5,
    rating: { average: 4.8, count: 89 },
    soldCount: 156,
    viewsCount: 1800,
    createdAt: "2026-06-15T00:00:00Z",
  }),
  createProduct({
    id: "prod-4",
    slug: "casque-bluetooth-jbl",
    title: "Casque Bluetooth JBL Tune 510",
    brand: "JBL",
    categoryId: "accessories",
    sellerId: "seller-1",
    images: [IMAGES.products.headphone],
    expressPrice: 35000,
    expressOriginal: 42000,
    importPrice: 22000,
    importOriginal: 28000,
    grosPrice: 18000,
    grosMoq: 15,
    rating: { average: 4.4, count: 67 },
    soldCount: 210,
    viewsCount: 980,
    createdAt: "2026-04-10T00:00:00Z",
  }),
  createProduct({
    id: "prod-5",
    slug: "riz-parfume-25kg",
    title: "Riz Parfumé Premium 25kg",
    categoryId: "seeds",
    sellerId: "seller-3",
    images: [...PRODUCT_IMAGE_GALLERIES.rice],
    expressPrice: 18500,
    importPrice: 14000,
    grosPrice: 11000,
    grosMoq: 50,
    rating: { average: 4.3, count: 45 },
    soldCount: 1200,
    viewsCount: 3200,
    createdAt: "2026-03-01T00:00:00Z",
  }),
  createProduct({
    id: "prod-6",
    slug: "laptop-hp-15",
    title: "HP Laptop 15 Core i5 8Go",
    brand: "HP",
    categoryId: "computers",
    sellerId: "seller-1",
    images: [IMAGES.products.laptop],
    expressPrice: 425000,
    expressOriginal: 480000,
    importPrice: 320000,
    grosPrice: 285000,
    grosMoq: 3,
    rating: { average: 4.6, count: 34 },
    soldCount: 78,
    viewsCount: 650,
    createdAt: "2026-02-20T00:00:00Z",
  }),
  createProduct({
    id: "prod-7",
    slug: "chaussures-sport-nike",
    title: "Nike Air Max 90",
    brand: "Nike",
    categoryId: "men",
    sellerId: "seller-2",
    images: [...PRODUCT_IMAGE_GALLERIES.shoes],
    expressPrice: 75000,
    importPrice: 52000,
    grosPrice: 42000,
    grosMoq: 12,
    rating: { average: 4.7, count: 156 },
    soldCount: 445,
    viewsCount: 2100,
    createdAt: "2026-06-01T00:00:00Z",
  }),
  createProduct({
    id: "prod-8",
    slug: "montre-connectee-xiaomi",
    title: "Montre Connectée Xiaomi Band 8",
    brand: "Xiaomi",
    categoryId: "accessories",
    sellerId: "seller-1",
    images: [...PRODUCT_IMAGE_GALLERIES.watch],
    expressPrice: 28000,
    expressOriginal: 35000,
    importPrice: 18000,
    grosPrice: 14000,
    grosMoq: 25,
    rating: { average: 4.5, count: 201 },
    soldCount: 567,
    viewsCount: 2800,
    createdAt: "2026-05-20T00:00:00Z",
  }),
  createProduct({
    id: "prod-9",
    slug: "huile-palme-5l",
    title: "Huile de Palme Raffinée 5L",
    categoryId: "food",
    sellerId: "seller-3",
    images: [IMAGES.products.oil],
    expressPrice: 4500,
    importPrice: 3200,
    grosPrice: 2500,
    grosMoq: 100,
    rating: { average: 4.1, count: 89 },
    soldCount: 2300,
    viewsCount: 5600,
    createdAt: "2026-01-15T00:00:00Z",
  }),
  createProduct({
    id: "prod-10",
    slug: "tablette-samsung-tab-a9",
    title: "Samsung Galaxy Tab A9 64Go",
    brand: "Samsung",
    categoryId: "tablets",
    sellerId: "seller-1",
    images: [IMAGES.products.tablet],
    expressPrice: 95000,
    importPrice: 72000,
    grosPrice: 62000,
    grosMoq: 8,
    rating: { average: 4.4, count: 56 },
    soldCount: 123,
    viewsCount: 890,
    createdAt: "2026-06-10T00:00:00Z",
  }),
  createProduct({
    id: "prod-11",
    slug: "sac-main-cuir",
    title: "Sac à Main Cuir Véritable",
    categoryId: "women",
    sellerId: "seller-2",
    images: [IMAGES.products.bag],
    expressPrice: 45000,
    importPrice: 28000,
    grosPrice: 22000,
    grosMoq: 10,
    rating: { average: 4.8, count: 78 },
    soldCount: 234,
    viewsCount: 1200,
    createdAt: "2026-07-02T00:00:00Z",
  }),
  createProduct({
    id: "prod-12",
    slug: "generateur-essence-3kw",
    title: "Générateur Essence 3kW",
    categoryId: "parts",
    sellerId: "seller-3",
    images: [...PRODUCT_IMAGE_GALLERIES.generator],
    expressPrice: 185000,
    importPrice: 145000,
    grosPrice: 125000,
    grosMoq: 5,
    rating: { average: 4.2, count: 23 },
    soldCount: 45,
    viewsCount: 320,
    createdAt: "2026-04-01T00:00:00Z",
  }),
  createProduct({
    id: "prod-13",
    slug: "pulverisateur-agricole-16l",
    title: "Pulvérisateur Agricole 16L",
    categoryId: "agri-tools",
    sellerId: "seller-3",
    images: [IMAGES.products.oil],
    expressPrice: 12500,
    importPrice: 8900,
    grosPrice: 6500,
    grosMoq: 10,
    rating: { average: 4.0, count: 18 },
    soldCount: 92,
    viewsCount: 410,
    createdAt: "2026-05-15T00:00:00Z",
  }),
  ...specialtyProducts,
];

export function getProductBySlug(slug: string): Product | undefined {
  return getRuntimeProductBySlug(slug) ?? mockProducts.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return getRuntimeProductById(id) ?? mockProducts.find((p) => p.id === id);
}

export function getProductsBySeller(sellerId: string): Product[] {
  const runtime = getRuntimeProductsBySeller(sellerId);
  const mock = mockProducts.filter((p) => p.sellerId === sellerId);
  const ids = new Set(runtime.map((p) => p.id));
  return [...runtime, ...mock.filter((p) => !ids.has(p.id))];
}
