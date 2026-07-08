/** Chemins d'images locales — représentation africaine (pas de modèles occidentaux). */

import { PRODUCT_IMAGE_GALLERIES } from "@/lib/constants/product-images";

export interface HeroImageMeta {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** false si l'image contient déjà texte/CTA (bannière complète) */
  showOverlay: boolean;
}

export const IMAGES = {
  placeholder: "/images/placeholder.svg",
  products: {
    phone1: "/images/products/samsung-galaxy-a15.jpg",
    phone1b: "/images/products/samsung-galaxy-a15-2.jpg",
    phone2: "/images/products/iphone-13.jpg",
    dress1: PRODUCT_IMAGE_GALLERIES.dressWax[0]!,
    headphone: "/images/products/jbl-tune-510.jpg",
    rice: "/images/products/riz-25kg.jpg",
    laptop: "/images/products/hp-laptop.jpg",
    shoes: "/images/products/nike-air-max-90.jpg",
    watch: "/images/products/xiaomi-band.jpg",
    oil: "/images/products/huile-palme.jpg",
    tablet: "/images/products/samsung-tab-a9.jpg",
    bag: "/images/products/sac-cuir.jpg",
    generator: "/images/products/generateur.jpg",
    bookAchebe: "/images/products/book-achebe.jpg",
    notebooks: "/images/products/notebooks.jpg",
    bookYouth: "/images/products/book-youth.jpg",
    dictionary: "/images/products/dictionary.jpg",
    pens: "/images/products/pens.jpg",
    comicBook: "/images/products/comic-book.jpg",
    motoHelmet: "/images/products/moto-helmet.jpg",
    motoGloves: "/images/products/moto-gloves.jpg",
    motoOil: "/images/products/moto-oil.jpg",
    motoMirror: "/images/products/moto-mirror.jpg",
    motoBrake: "/images/products/moto-brake.jpg",
    motoJacket: "/images/products/moto-jacket.jpg",
    perfumeMen: "/images/products/perfume-men.jpg",
    perfumeWomen: "/images/products/perfume-women.jpg",
    perfumeGift: "/images/products/perfume-gift.jpg",
    deodorant: "/images/products/deodorant.jpg",
    perfumeOil: "/images/products/perfume-oil.jpg",
    diffuser: "/images/products/diffuser.jpg",
    rattanBasket: "/images/products/rattan-basket.jpg",
    raphiaBag: "/images/products/raphia-bag.jpg",
    rattanCoasters: "/images/products/rattan-coasters.jpg",
    rattanBasketLarge: "/images/products/rattan-basket-large.jpg",
    rattanMirror: "/images/products/rattan-mirror.jpg",
    rattanTray: PRODUCT_IMAGE_GALLERIES.rattanTray[0]!,
  },
  hero: {
    hero1: "/images/hero/hero1.jfif",
    hero2: "/images/hero/hero2.png",
    hero3: "/images/hero/hero3.PNG",
  },
  sellers: {
    seller1: "/images/sellers/seller1.jpg",
    seller2: "/images/sellers/seller2.jpg",
    banner1: "/images/sellers/banner1.jpg",
    banner2: "/images/sellers/banner2.jpg",
  },
  stores: {
    librairieLogo: "/images/stores/librairie-logo.jpg",
    librairieBanner: "/images/stores/librairie-banner.jpg",
    motoLogo: "/images/stores/moto-logo.jpg",
    motoBanner: "/images/stores/moto-banner.jpg",
    parfumLogo: "/images/stores/parfum-logo.jpg",
    parfumBanner: "/images/stores/parfum-banner.jpg",
    raphiaLogo: "/images/stores/raphia-logo.jpg",
    raphiaBanner: "/images/stores/raphia-banner.jpg",
  },
  misc: {
    driver: "/images/misc/driver.png",
    evidence1: "/images/misc/evidence1.jpg",
  },
  logo: "/images/logo/logoApp.png",
  africa: {
    silhouettes: "/images/africa/silhouettes.png",
    waves: "/images/africa/waves.png",
  },
  ecosystem: {
    merchant: "/images/ecosystem/merchant.jpg",
    entrepreneur: "/images/ecosystem/entrepreneur.jpg",
  },
} as const;

/** Métadonnées hero — dimensions réelles pour object-contain (tout visible, sans crop). */
export const HERO_META = {
  hero1: {
    src: IMAGES.hero.hero1,
    width: 375,
    height: 533,
    alt: "Commerce et innovation en Afrique",
    showOverlay: true,
  },
  hero2: {
    src: IMAGES.hero.hero2,
    width: 1586,
    height: 992,
    alt: "Commerce transfrontalier africain",
    showOverlay: true,
  },
  hero3: {
    src: IMAGES.hero.hero3,
    width: 595,
    height: 715,
    alt: "Entrepreneuriat Premium — Gold et Elite AfriMarket Hub",
    showOverlay: false,
  },
} as const satisfies Record<string, HeroImageMeta>;
