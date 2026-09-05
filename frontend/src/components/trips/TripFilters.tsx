"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw } from "lucide-react";

interface TripFiltersProps {
  categories: string[];
  minPriceLimit?: number;
  maxPriceLimit?: number;
}

export default function TripFilters({
  categories,
  minPriceLimit = 0,
  maxPriceLimit = 5000,
}: TripFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "all";
  const currentMaxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : maxPriceLimit;

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`/trips?${params.toString()}`, { scroll: false });
    });
  };

  const handleReset = () => {
    startTransition(() => {
      router.push("/trips", { scroll: false });
    });
  };

  const hasActiveFilters =
    searchParams.has("category") ||
    searchParams.has("maxPrice") ||
    searchParams.has("sort") ||
    searchParams.has("q");

  return (
    <aside className="h-fit w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <Filter size={18} className="text-red-600" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-semibold text-gray-500 transition hover:text-red-600"
          >
            <RotateCcw size={13} />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mt-6 space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Category
        </label>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => updateFilters("category", "all")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${
              currentCategory === "all"
                ? "bg-red-50 text-red-600 font-bold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateFilters("category", cat)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${
                currentCategory === cat
                  ? "bg-red-50 text-red-600 font-bold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Max Price
          </label>
          <span className="text-sm font-black text-gray-900">
            ${currentMaxPrice.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min={minPriceLimit}
          max={maxPriceLimit}
          step={50}
          value={currentMaxPrice}
          onChange={(e) => updateFilters("maxPrice", e.target.value)}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-red-600"
        />

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>${minPriceLimit}</span>
          <span>${maxPriceLimit}+</span>
        </div>
      </div>
    </aside>
  );
}
