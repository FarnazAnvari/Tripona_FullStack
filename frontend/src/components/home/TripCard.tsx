import Image from "next/image";
import Link from "next/link";
import { Trip } from "@/data/trips";

interface TripCardProps {
  trip: Trip;
  priority?: boolean;
}

// یک تصویر پیش‌فرض سبک (SVG Placeholder) در صورتی که تصویری لود نشد یا وجود نداشت
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='16'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export default function TripCard({ trip, priority = false }: TripCardProps) {
  const imageSrc =
    (typeof trip.image === "string" && trip.image.trim()) ||
    (Array.isArray(trip.images) && trip.images[0]?.trim()) ||
    FALLBACK_IMAGE;

  const imageAlt = trip.title
    ? `${trip.title} tour photo`
    : "Trip destination image";

  return (
    <Link
      href={`/trips/${trip.slug}`}
      aria-label={`View details for ${trip.title}`}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/20"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {trip.duration ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
            {trip.duration}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
          {trip.location}
          {trip.country ? `, ${trip.country}` : ""}
        </div>
        <h3 className="mt-1 text-lg font-bold text-gray-900 transition group-hover:text-red-600">
          {trip.title}
        </h3>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xs font-medium text-gray-400">From</span>
          <span className="text-lg font-bold text-gray-900">
            USD ${trip.price}
          </span>
          {trip.oldPrice ? (
            <span className="text-sm text-gray-400 line-through">
              USD ${trip.oldPrice}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
