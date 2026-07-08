"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "@/store/useToastStore";
import { useTranslation } from "@/hooks/useTranslation";

export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);
  const { t } = useTranslation();

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(100vw-2rem,360px)] flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto overflow-hidden rounded-xl border border-white/15 bg-night/95 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-start gap-3 p-4">
              <div className="min-w-0 flex-1">
                {toast.href ? (
                  <Link
                    href={toast.href}
                    className="block text-sm font-semibold text-white hover:text-primary"
                    onClick={() => dismiss(toast.id)}
                  >
                    {toast.title}
                  </Link>
                ) : (
                  <p className="text-sm font-semibold text-white">{toast.title}</p>
                )}
                {toast.message && (
                  <p className="mt-1 text-xs leading-relaxed text-white/65">{toast.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="shrink-0 rounded p-1 text-white/40 hover:bg-white/10 hover:text-white"
                aria-label={t("common.close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <motion.div
              className="h-0.5 bg-primary"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
