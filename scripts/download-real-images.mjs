/**
 * Télécharge des photos pour AfriMarket Hub (Unsplash / Pexels).
 * Règle : aucune personne non africaine — entrepreneurs, livreurs et héros = visages africains
 * ou scènes urbaines/commerces africains ; produits = objets sans modèles occidentaux.
 *
 * Usage: npm run download:images
 */
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "images");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** @type {{ rel: string; url: string }[]} */
const ASSETS = [
  // ——— Produits (objets uniquement, pas de mannequins) ———
  {
    rel: "products/samsung-galaxy-a15.jpg",
    url: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=85&fit=crop",
  },
  {
    rel: "products/samsung-galaxy-a15-2.jpg",
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85&fit=crop",
  },
  {
    rel: "products/iphone-13.jpg",
    url: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    rel: "products/robe-wax.jpg",
    url: "https://images.pexels.com/photos/6311655/pexels-photo-6311655.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    rel: "products/jbl-tune-510.jpg",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85&fit=crop",
  },
  {
    rel: "products/riz-25kg.jpg",
    url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=85&fit=crop",
  },
  {
    rel: "products/hp-laptop.jpg",
    url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85&fit=crop",
  },
  {
    rel: "products/nike-air-max-90.jpg",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85&fit=crop",
  },
  {
    rel: "products/xiaomi-band.jpg",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85&fit=crop",
  },
  {
    rel: "products/huile-palme.jpg",
    url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=85&fit=crop",
  },
  {
    rel: "products/samsung-tab-a9.jpg",
    url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=85&fit=crop",
  },
  {
    rel: "products/sac-cuir.jpg",
    url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85&fit=crop",
  },
  {
    rel: "products/generateur.jpg",
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=85&fit=crop",
  },

  // ——— Hero : villes & entrepreneurs africains ———
  {
    rel: "hero/hero1.jpg",
    url: "https://images.pexels.com/photos/325117/pexels-photo-325117.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    rel: "hero/hero2.jpg",
    url: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&q=80&fit=crop",
  },
  {
    rel: "hero/hero3.jpg",
    url: "https://images.unsplash.com/photo-1580894908361-967195033215?w=1200&q=80&fit=crop",
  },

  // ——— Vendeurs : portraits entrepreneurs africains ———
  {
    rel: "sellers/seller1.jpg",
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&fit=crop",
  },
  {
    rel: "sellers/seller2.jpg",
    url: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=80&fit=crop",
  },
  {
    rel: "sellers/banner1.jpg",
    url: "https://images.pexels.com/photos/8293770/pexels-photo-8293770.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    rel: "sellers/banner2.jpg",
    url: "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },

  // ——— Livreur africain ———
  {
    rel: "misc/driver.jpg",
    url: "https://images.pexels.com/photos/6875742/pexels-photo-6875742.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    rel: "misc/evidence1.jpg",
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&fit=crop",
  },
];

function download(url) {
  return new Promise((resolve, reject) => {
    const request = (targetUrl, redirects = 0) => {
      if (redirects > 5) {
        reject(new Error(`Too many redirects: ${url}`));
        return;
      }
      https
        .get(targetUrl, { headers: { "User-Agent": "AfriMarketHub/1.0" } }, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            const next = new URL(res.headers.location, targetUrl).toString();
            res.resume();
            request(next, redirects + 1);
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${targetUrl}`));
            res.resume();
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks)));
          res.on("error", reject);
        })
        .on("error", reject);
    };
    request(url);
  });
}

async function main() {
  let ok = 0;
  let fail = 0;

  for (const { rel, url } of ASSETS) {
    const dest = path.join(root, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    try {
      process.stdout.write(`↓ ${rel} … `);
      const buf = await download(url);
      if (buf.length < 5000) {
        throw new Error(`fichier trop petit (${buf.length} o)`);
      }
      fs.writeFileSync(dest, buf);
      console.log(`OK (${Math.round(buf.length / 1024)} Ko)`);
      ok++;
    } catch (err) {
      console.log(`ÉCHEC — ${err.message}`);
      fail++;
    }
    await sleep(400);
  }

  console.log(`\nTerminé : ${ok} OK, ${fail} échec(s).`);
  if (fail > 0) process.exit(1);
}

main();
