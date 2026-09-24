"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TripItem {
  _id?: string;
  id?: number | string;
  title: string;
  slug: string;
  category?: string;
  experience?: string;
  duration?: string;
  image?: string;
  currentPrice: number;
  originalPrice?: number;
}

interface TripsApiResponse {
  data?: TripItem[];
  trips?: TripItem[];
}

const ALL_CATEGORY = "All trips";
const FALLBACK_IMAGE = "/images/fallback-trip.jpg";

export default function TripSection() {
  const [tripsData, setTripsData] = useState<TripItem[]>([]);
  const [activeTab, setActiveTab] = useState(ALL_CATEGORY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTrips() {
      try {
        setLoading(true);
        setError("");

        const apiBaseUrl = (
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        ).replace(/\/$/, "");

        const response = await fetch(`${apiBaseUrl}/trips`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch trips: ${response.status}`);
        }

        const result = (await response.json()) as TripsApiResponse | TripItem[];

        const receivedTrips = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.trips)
              ? result.trips
              : [];

        setTripsData(receivedTrips);
        setActiveTab(ALL_CATEGORY);
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        console.error("Error fetching trips:", fetchError);
        setError("Trips could not be loaded. Please check your backend.");
        setTripsData([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTrips();

    return () => controller.abort();
  }, []);

  // استخراج دسته‌بندی‌های یکتا به همراه تب All trips
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        tripsData
          .map((trip) => trip.category?.trim())
          .filter((category): category is string => Boolean(category)),
      ),
    );

    return [ALL_CATEGORY, ...uniqueCategories];
  }, [tripsData]);

  // فیلتر کردن تورها بر اساس تب انتخاب شده
  const visibleTrips = useMemo(() => {
    if (activeTab === ALL_CATEGORY) {
      return tripsData;
    }
    return tripsData.filter((trip) => trip.category?.trim() === activeTab);
  }, [activeTab, tripsData]);

  // اسکرول نرم اسلایدر
  const scrollSlider = useCallback((direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollDistance = 290; // عرض کارت + فاصله
    slider.scrollBy({
      left: direction === "right" ? scrollDistance : -scrollDistance,
      behavior: "smooth",
    });
  }, []);

  const handleImageError = useCallback((tripKey: string) => {
    setFailedImages((prev) => ({ ...prev, [tripKey]: true }));
  }, []);

  if (loading) {
    return (
      <section className="bg-white px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-5 overflow-hidden">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="w-[270px] flex-none rounded-xl border border-gray-100 bg-white p-2"
              >
                <div className="h-48 animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-4 space-y-2 p-2">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                  <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (tripsData.length === 0) {
    return (
      <section className="bg-white px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl py-12 text-center text-gray-500">
          No trips found.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* نوار تب‌های دسته‌بندی */}
        <div
          className="mb-8 flex gap-8 overflow-x-auto border-b border-gray-100 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
        >
          {categories.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(category);
                  sliderRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                }}
                className={`whitespace-nowrap pb-3 text-lg font-bold transition-colors ${
                  isActive
                    ? "border-b-2 border-gray-900 text-gray-900"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* اسلایدر کارت‌های تور */}
        {visibleTrips.length > 0 ? (
          <div className="group relative">
            {/* دکمه قبلی */}
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              aria-label="Previous trips"
              className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition hover:scale-110 group-hover:opacity-100 md:opacity-0"
            >
              <ChevronLeft size={22} />
            </button>

            {/* ظرف اسکرول کارت‌ها */}
            <div
              ref={sliderRef}
              className="flex gap-5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {visibleTrips.map((trip, idx) => {
                const tripKey = String(trip._id ?? trip.id ?? trip.slug ?? idx);
                const hasFailed = failedImages[tripKey];
                const imageSrc =
                  hasFailed || !trip.image ? FALLBACK_IMAGE : trip.image;

                return (
                  <Link
                    key={tripKey}
                    href={`/trips/${encodeURIComponent(trip.slug)}`}
                    className="group/card block w-[270px] flex-none overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
                  >
                    {/* تصویر و عنوان بزرگ روی عکس */}
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image
                        src={imageSrc}
                        alt={trip.title}
                        fill
                        sizes="270px"
                        className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                        onError={() => handleImageError(tripKey)}
                      />
                        {trip.experience || trip.title}
                    </div>

                    {/* اطلاعات متنی و قیمت کارت */}
                    <div className="flex h-[150px] flex-col justify-between p-4">
                      <div>
                        <p className="mb-1 text-sm text-gray-500">
                          {trip.duration || "Duration varies"}
                        </p>
                        <h4 className="line-clamp-2 font-bold text-gray-900 transition group-hover/card:text-red-600">
                          {trip.title}
                        </h4>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] uppercase text-gray-500">
                          From
                        </p>
                        <div className="flex items-center justify-end gap-2">
                          {typeof trip.originalPrice === "number" &&
                            trip.originalPrice > trip.currentPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                USD ${trip.originalPrice.toLocaleString()}
                              </span>
                            )}
                          <span className="text-lg font-black text-gray-900">
                            USD ${trip.currentPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* دکمه بعدی */}
            <button
              type="button"
              onClick={() => scrollSlider("right")}
              aria-label="Next trips"
              className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition hover:scale-110 group-hover:opacity-100 md:opacity-0"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        ) : (
          <p className="py-12 text-center text-gray-500">
            No trips found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
