import { Smartphone } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AppDownloadBlockProps {
  className?: string;
}

export function AppDownloadBlock({ className }: AppDownloadBlockProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
        Application mobile
      </p>
      <p className="text-sm font-medium text-white">Commandez partout, suivez en temps réel</p>
      <div className="flex flex-wrap gap-2">
        <a
          href="#"
          className="inline-flex min-h-11 items-center rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-semibold text-white transition-all hover:border-gold/40 hover:bg-white/15"
          aria-label="Google Play"
        >
          Google Play
        </a>
        <a
          href="#"
          className="inline-flex min-h-11 items-center rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-semibold text-white transition-all hover:border-gold/40 hover:bg-white/15"
          aria-label="App Store"
        >
          App Store
        </a>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-white/25 bg-white/5 text-[10px] font-medium uppercase tracking-wider text-white/50"
          aria-label="QR code application"
        >
          QR Code
        </div>
        <div className="flex h-24 w-14 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 shadow-inner">
          <Smartphone className="text-gold" size={28} aria-hidden />
        </div>
      </div>
    </div>
  );
}
