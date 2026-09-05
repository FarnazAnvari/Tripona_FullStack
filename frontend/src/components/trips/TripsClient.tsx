"use client";

import { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { allTrips, tripCategories, Trip } from "@/data/trips";
import TripCard from "@/components/home/TripCard";
import TripFilters from "./TripFilters";

export default function TripsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const maxPriceParam = searchParams.get("maxPrice");
  const sortParam = searchParams.get("sort") || "featured";

  // استخراج دسته‌بندی‌ها به صورت داینامیک
  const availableCategories = useMemo(() => Object.keys(tripCategories), []);

  // هندل سرچ متنی
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (val.trim()) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    startTransition(() => {
      router.push(`/trips?${params.toString()}`, { scroll: false });
    });
  };

  // هندل سورتینگ
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "featured") {
      params.set("sort", val);
    } else {
      params.delete("sort");
    }
    startTransition(() => {
      router.push(`/trips?${params.toString()}`, { scroll: false });
    });
  };

  // فیلتر و مرتب‌سازی داده‌ها
  const filteredTrips = useMemo(() => {
    let result: Trip[] = [...allTrips];

    // ۱. فیلتر دسته‌بندی
    if (selectedCategory && selectedCategory !== "all") {
      const categoryTrips = tripCategories[selectedCategory] || [];
      const categorySlugs = new Set(categoryTrips.map((t) => t.slug));
      result = result.filter((trip) => categorySlugs.has(trip.slug));
    }

    // ۲. فیلتر جست‌وجو (عنوان، کشور، تجربه و توضیحات)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (trip) =>
          trip.title.toLowerCase().includes(q) ||
          trip.country?.toLowerCase().includes(q) ||
          trip.experience.toLowerCase().includes(q) ||
          trip.description?.toLowerCase().includes(q),
      );
    }

    // ۳. فیلتر حداکثر قیمت
    if (maxPriceParam) {
      const maxPrice = Number(maxPriceParam);
      result = result.filter((trip) => {
        const numericPrice = Number(trip.currentPrice.replace(/[^0-9.]/g, ""));
        return !isNaN(numericPrice) ? numericPrice <= maxPrice : true;
      });
    }

    // ۴. مرتب‌سازی (Sorting)
    result.sort((a, b) => {
      const priceA = Number(a.currentPrice.replace(/[^0-9.]/g, "")) || 0;
      const priceB = Number(b.currentPrice.replace(/[^0-9.]/g, "")) || 0;

      switch (sortParam) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "duration-asc": {
          const durA = parseInt(a.duration) || 0;
          const durB = parseInt(b.duration) || 0;
          return durA - durB;
        }
        case "featured":
        default:
          return a.id - b.id;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, maxPriceParam, sortParam]);

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Explore All Trips
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Find and filter extraordinary curated journeys around the world.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              defaultValue={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search trips"
              placeholder="Search by destination, country, or experience..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-600 focus:bg-white"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-gray-400" />
            <select
              value={sortParam}
              onChange={handleSortChange}
              aria-label="Sort trips"
              className="rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm font-semibold text-gray-700 outline-none transition focus:border-red-600 focus:bg-white"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration-asc">Duration: Shortest first</option>
              <option value="title-asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Sidebar + Trip Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left Column: Filters */}
          <div className="lg:col-span-1">
            <TripFilters categories={availableCategories} />
          </div>

          {/* Right Column: Trips List */}
          <main className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-500">
                Showing {filteredTrips.length}{" "}
                {filteredTrips.length === 1 ? "trip" : "trips"}
              </span>
            </div>

            {filteredTrips.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTrips.map((trip, index) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    priority={index < 3}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
                <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  No trips found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search terms or clearing some filters.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
