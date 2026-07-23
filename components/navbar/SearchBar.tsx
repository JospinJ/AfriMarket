"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Mic, MicOff, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useFiltersStore } from "@/store/useFiltersStore";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { SearchSuggestions } from "./SearchSuggestions";

type SearchScope = "all" | "products" | "stores" | "categories";

interface VoiceRecognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start(): void;
}

type VoiceWindow = Window & {
  SpeechRecognition?: new () => VoiceRecognition;
  webkitSpeechRecognition?: new () => VoiceRecognition;
};

const SCOPES: { value: SearchScope; label: string }[] = [
  { value: "all", label: "Toutes catégories" },
  { value: "products", label: "Produits" },
  { value: "stores", label: "Boutiques" },
  { value: "categories", label: "Catégories" },
];

interface SearchBarProps {
  compact?: boolean;
  expanded?: boolean;
  className?: string;
  onNavigate?: () => void;
}

export function SearchBar({
  compact = false,
  expanded = false,
  className,
  onNavigate,
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [scope, setScope] = useState<SearchScope>("all");
  const [focused, setFocused] = useState(expanded);
  const [localQuery, setLocalQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const setFilter = useFiltersStore((s) => s.setFilter);
  const { addSearch } = useSearchHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expanded) {
      setFocused(true);
      inputRef.current?.focus();
    }
  }, [expanded]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateWithQuery = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      addSearch(trimmed);
      setFilter("searchQuery", trimmed);
      setFocused(false);
      onNavigate?.();
      if (pathname !== "/") {
        router.push(`/?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [addSearch, setFilter, onNavigate, pathname, router],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateWithQuery(localQuery);
  };

  const handleSelect = (value: string) => {
    setLocalQuery(value);
    navigateWithQuery(value);
  };

  const startVoiceSearch = () => {
    setVoiceError(null);
    const voiceWindow = window as VoiceWindow;
    const SpeechRecognitionCtor =
      voiceWindow.SpeechRecognition ?? voiceWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setVoiceError("Recherche vocale non disponible sur cet appareil.");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setLocalQuery(transcript);
      navigateWithQuery(transcript);
      setListening(false);
    };
    recognition.onerror = () => {
      setVoiceError("Impossible d'écouter. Réessayez.");
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div ref={containerRef} className={cn("relative w-full min-w-0", className)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex w-full overflow-hidden rounded-xl border-2 transition-all duration-200",
          focused
            ? "border-primary shadow-glow-orange"
            : "border-transparent shadow-premium-sm",
        )}
        role="search"
      >
        {!compact && (
          <label className="relative hidden w-[128px] shrink-0 lg:w-[148px] xl:block">
            <span className="sr-only">Catégorie de recherche</span>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value as SearchScope)}
              className="h-12 w-full cursor-pointer appearance-none truncate border-r border-sand/20 bg-ivory pl-3 pr-8 text-sm font-medium text-night focus:outline-none lg:h-14"
              aria-label="Portée de recherche"
            >
              {SCOPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-sand"
              aria-hidden
            >
              ▼
            </span>
          </label>
        )}

        <div className="relative min-w-0 flex-1 bg-white">
          <input
            ref={inputRef}
            type="search"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={
              compact
                ? "Rechercher…"
                : "Rechercher un produit, une boutique ou une catégorie…"
            }
            className={cn(
              "h-12 w-full bg-transparent pl-4 text-sm text-night placeholder:text-sand focus:outline-none lg:h-14 lg:pl-5 lg:text-base",
              compact ? "pr-12" : "pr-28 lg:pr-36",
            )}
            aria-label="Recherche de produits"
            aria-controls="search-suggestions-panel"
            aria-autocomplete="list"
            autoComplete="off"
          />

          {!compact && (
            <button
              type="button"
              onClick={startVoiceSearch}
              className={cn(
                "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg transition-colors lg:h-11 lg:w-11",
                "right-[7rem] lg:right-[10rem]",
                listening
                  ? "bg-terracotta/15 text-terracotta"
                  : "text-sand hover:bg-surface-light hover:text-night",
              )}
              aria-label={listening ? "Écoute en cours…" : "Recherche vocale"}
            >
              {listening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          )}

          <button
            type="submit"
            className={cn(
              "absolute right-0 top-0 flex h-12 items-center justify-center bg-primary font-bold text-night transition-colors hover:bg-primary-hover lg:h-14",
              compact ? "w-12" : "min-w-[3rem] gap-1.5 px-3 sm:min-w-[5.5rem] sm:gap-2 sm:px-4 lg:min-w-[8.5rem] lg:px-6",
            )}
            aria-label="Lancer la recherche"
          >
            <Search size={20} aria-hidden />
            {!compact && <span className="hidden text-sm sm:inline lg:text-base">Rechercher</span>}
          </button>
        </div>
      </form>

      {voiceError && (
        <p className="mt-1 text-xs text-terracotta" role="alert">
          {voiceError}
        </p>
      )}

      <AnimatePresence>
        {focused && (
          <motion.div
            id="search-suggestions-panel"
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-sand/15 bg-white shadow-premium-xl"
          >
            <SearchSuggestions query={localQuery} onSelect={handleSelect} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
