"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      router.push(`/trips?query=${encodeURIComponent(destination.trim())}`);
    } else {
      router.push("/trips");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row sm:items-center sm:gap-2"
    >
      <div className="flex flex-1 items-center gap-3 px-3 py-2">
        <MapPin className="text-gray-400" size={20} />
        <div className="flex flex-col text-left">
          <label
            htmlFor="search-where"
            className="text-[11px] font-bold text-gray-500 uppercase tracking-wider"
          >
            Where to?
          </label>
          <input
            id="search-where"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search country, city, or tour..."
            className="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-95"
      >
        <Search size={18} />
        <span>Search</span>
      </button>
    </form>
  );
}
