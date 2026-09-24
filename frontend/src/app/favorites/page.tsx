// src/app/favorites/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2, MapPin, ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // خواندن لیست علاقه‌مندی‌ها از لوکال استوریج
    const saved = localStorage.getItem("tripona_favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("tripona_favorites", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-950 mb-8">My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">No favorites yet</h2>
            <p className="text-gray-500 mt-2">Explore our trips and heart the ones you love!</p>
            <Link href="/" className="mt-6 inline-block px-6 py-2 bg-black text-white rounded-xl font-medium">
              Browse Trips
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((trip) => (
              <div key={trip.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden relative">
                    {/* تصویر تور */}
                    <img src={trip.image} alt={trip.title} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{trip.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="w-3 h-3" /> {trip.location}
                  </div>
                </div>
                <button 
                  onClick={() => removeFavorite(trip.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
