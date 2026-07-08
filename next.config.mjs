/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // En dev local, contourne l'optimiseur Next (fetch Node.js) si certificats SSL
    // invalides — les images sont chargées directement par le navigateur.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "media.gettyimages.com" },
      { protocol: "https", hostname: "d13k5xkmdqbhs.cloudfront.net" },
      { protocol: "https", hostname: "scontent-los4-1.xx.fbcdn.net" },
      { protocol: "https", hostname: "site.glotelho.cm" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "s.alicdn.com" },
    ],
  },
};

export default nextConfig;
