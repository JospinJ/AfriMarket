"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";

interface SellerVideoPreviewProps {
  sellerName: string;
  posterImage: string;
  sellerImage?: string;
  onClose: () => void;
}

/** Vidéo vendeur mockée — // TODO API: URL stream vendeur */
export function SellerVideoPreview({
  sellerName,
  posterImage,
  sellerImage,
  onClose,
}: SellerVideoPreviewProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-night">
      <Image src={posterImage} alt="" fill sizes="100vw" className="object-cover opacity-40 blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />

      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-full glass-dark p-2 text-white"
        aria-label="Fermer la vidéo"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {sellerImage && (
          <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-primary shadow-glow-orange">
            <Image src={sellerImage} alt="" fill sizes="64px" className="object-cover" />
          </div>
        )}
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-glow-orange"
          aria-label="Lire la vidéo du vendeur"
        >
          <Play className="h-7 w-7 fill-night text-night" />
        </motion.button>
        <p className="font-display text-lg font-bold text-white">{sellerName}</p>
        <p className="mt-2 max-w-xs text-sm text-white/75">
          Présentation du produit par le vendeur — démo courte (mock)
        </p>
        <p className="mt-4 text-xs text-primary">// TODO API: lecteur vidéo vendeur</p>
      </div>
    </div>
  );
}
