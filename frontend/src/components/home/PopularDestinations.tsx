"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
  { id: 1, name: "Morocco", image: "/images/destinations/morocco.jpg" },
  { id: 2, name: "Greece", image: "/images/destinations/greece.jpg" },
  { id: 3, name: "Vietnam", image: "/images/destinations/vietnam.jpg" },
  { id: 4, name: "Peru", image: "/images/destinations/peru.jpg" },
  { id: 5, name: "Sri Lanka", image: "/images/destinations/srilanka.jpg" },
  { id: 6, name: "Kenya", image: "/images/destinations/kenya.jpg" },
  { id: 7, name: "Uzbekistan", image: "/images/destinations/uzbekistan.jpg" },
];

const PopularDestinations = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const nextSlide = () => {
    if (startIndex + visibleCount < destinations.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + visibleCount < destinations.length;

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-10 py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Popular destinations
        </h2>

        <button className="px-6 py-2 border border-black rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm">
          Search all destinations
        </button>
      </div>

      <div className="relative">
        {/* arrows wrapper */}
        <div className="absolute inset-0 pointer-events-none group">
          {canGoPrev && (
            <button
              onClick={prevSlide}
              className="pointer-events-auto absolute -left-5 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 bg-white/95 rounded-full flex items-center justify-center
              shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100
              transition hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {canGoNext && (
            <button
              onClick={nextSlide}
              className="pointer-events-auto absolute -right-5 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 bg-white/95 rounded-full flex items-center justify-center
              shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100
              transition hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>

        {/* slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
            }}
          >
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="min-w-[50%] sm:min-w-[33.33%] md:min-w-[25%] lg:min-w-[20%] px-2"
              >
                {/* card */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-sm group/card">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width:640px) 50vw,
                           (max-width:768px) 33vw,
                           (max-width:1024px) 25vw,
                           20vw"
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-[13px] shadow-lg whitespace-nowrap transition-transform group-hover/card:scale-105">
                      {dest.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
