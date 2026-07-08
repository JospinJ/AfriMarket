"use client";

import { useFiltersStore } from "@/store/useFiltersStore";

interface StoreFiltersProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  onSearch?: (query: string) => void;
}

export function StoreFilters({ sortBy, onSortChange, onSearch }: StoreFiltersProps) {
  const searchQuery = useFiltersStore((s) => s.searchQuery);
  const setFilter = useFiltersStore((s) => s.setFilter);

  const handleSearch = (value: string) => {
    setFilter("searchQuery", value);
    onSearch?.(value);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Rechercher dans la boutique..."
        aria-label="Rechercher dans la boutique"
        className="flex-1 rounded-lg border border-sand/30 px-4 py-2.5 text-sm focus:border-green-deep focus:outline-none"
      />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Trier les produits"
        className="rounded-lg border border-sand/30 px-4 py-2.5 text-sm focus:border-green-deep focus:outline-none"
      >
        <option value="relevance">Pertinence</option>
        <option value="price_asc">Prix croissant</option>
        <option value="price_desc">Prix décroissant</option>
        <option value="newest">Plus récents</option>
      </select>
    </div>
  );
}
