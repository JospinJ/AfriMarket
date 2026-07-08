import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "images");

function svg(width, height, bg, accent, label) {
  const fontSize = Math.max(14, Math.min(width, height) / 12);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#0B1220"/>
    </linearGradient>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="${accent}" opacity="0.15"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#dots)"/>
  <rect x="${width * 0.1}" y="${height * 0.15}" width="${width * 0.8}" height="${height * 0.55}" rx="12" fill="${accent}" opacity="0.2"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#F7F5F2" font-family="system-ui,sans-serif" font-size="${fontSize}" font-weight="600">${label}</text>
  <text x="50%" y="${height * 0.62}" dominant-baseline="middle" text-anchor="middle" fill="${accent}" font-family="system-ui,sans-serif" font-size="${fontSize * 0.65}" opacity="0.9">AfriMarket Hub</text>
</svg>`;
}

const assets = [
  { rel: "products/phone1.svg", w: 600, h: 600, bg: "#1F4D36", accent: "#C9A227", label: "Samsung Galaxy A15" },
  { rel: "products/phone1b.svg", w: 600, h: 600, bg: "#1F4D36", accent: "#C9A227", label: "Galaxy — vue 2" },
  { rel: "products/phone2.svg", w: 600, h: 600, bg: "#2C3E50", accent: "#C9A227", label: "iPhone 13" },
  { rel: "products/dress1.svg", w: 600, h: 600, bg: "#C1502E", accent: "#C9A227", label: "Robe Wax" },
  { rel: "products/headphone.svg", w: 600, h: 600, bg: "#1F4D36", accent: "#A9895C", label: "Casque JBL" },
  { rel: "products/rice.svg", w: 600, h: 600, bg: "#A9895C", accent: "#F7F5F2", label: "Riz 25kg" },
  { rel: "products/laptop.svg", w: 600, h: 600, bg: "#0B1220", accent: "#C9A227", label: "HP Laptop" },
  { rel: "products/shoes.svg", w: 600, h: 600, bg: "#C1502E", accent: "#1F4D36", label: "Nike Air Max" },
  { rel: "products/watch.svg", w: 600, h: 600, bg: "#1F4D36", accent: "#C9A227", label: "Xiaomi Band" },
  { rel: "products/oil.svg", w: 600, h: 600, bg: "#C9A227", accent: "#1F4D36", label: "Huile de palme" },
  { rel: "products/tablet.svg", w: 600, h: 600, bg: "#2C3E50", accent: "#C9A227", label: "Galaxy Tab A9" },
  { rel: "products/bag.svg", w: 600, h: 600, bg: "#A9895C", accent: "#C9A227", label: "Sac cuir" },
  { rel: "products/generator.svg", w: 600, h: 600, bg: "#0B1220", accent: "#C1502E", label: "Générateur 3kW" },
  { rel: "hero/hero1.svg", w: 1200, h: 400, bg: "#1F4D36", accent: "#C9A227", label: "Livraison Express" },
  { rel: "hero/hero2.svg", w: 1200, h: 400, bg: "#C1502E", accent: "#C9A227", label: "Import — Prix réduits" },
  { rel: "hero/hero3.svg", w: 1200, h: 400, bg: "#0B1220", accent: "#C9A227", label: "Vendeur Premium" },
  { rel: "sellers/seller1.svg", w: 100, h: 100, bg: "#1F4D36", accent: "#C9A227", label: "TY" },
  { rel: "sellers/seller2.svg", w: 100, h: 100, bg: "#C1502E", accent: "#C9A227", label: "DF" },
  { rel: "sellers/banner1.svg", w: 1200, h: 300, bg: "#1F4D36", accent: "#C9A227", label: "Tech Yaoundé Pro" },
  { rel: "sellers/banner2.svg", w: 1200, h: 300, bg: "#C1502E", accent: "#C9A227", label: "Douala Fashion Hub" },
  { rel: "misc/driver.svg", w: 100, h: 100, bg: "#1F4D36", accent: "#F7F5F2", label: "IB" },
  { rel: "misc/evidence1.svg", w: 400, h: 300, bg: "#0B1220", accent: "#C1502E", label: "Preuve" },
  { rel: "placeholder.svg", w: 600, h: 600, bg: "#A9895C", accent: "#F7F5F2", label: "Produit" },
];

for (const asset of assets) {
  const filePath = path.join(root, asset.rel);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, svg(asset.w, asset.h, asset.bg, asset.accent, asset.label));
}

console.log(`Generated ${assets.length} placeholder images in public/images/`);
