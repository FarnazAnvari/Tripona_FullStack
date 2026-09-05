import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { allTrips, type Trip } from "@/data/trips";
import TripGallery from "@/components/trips/TripGallery";
import TripFaq from "@/components/trips/TripFaq";
import BookingSidebar from "@/components/trips/BookingSidebar";




interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// تایپ تکمیلی برای رفع خطاهای تایپ‌اسکریپت در فیلدهای تور
type SafeTrip = Trip & {
  rating?: number;
  reviewsCount?: number;
  gallery?: string[];
  faqs?: { question: string; answer: string }[];
  highlights?: string[];
  currentPrice?: number;
  price?: number;
  country?: string;
  experience?: string;
  description?: string;
  image?: string;
};

const DEFAULT_FAQS = [
  {
    question: "What is included in this trip package?",
    answer:
      "The package includes professional guidance, planned accommodations, local transportation, and entry tickets mentioned in the itinerary.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "You can cancel up to 7 days before the trip departure date for a full 100% refund. Cancellations made within 7 days are subject to partial fees.",
  },
  {
    question: "Do I need special travel insurance?",
    answer:
      "We strongly recommend having international travel medical insurance covering adventurous outdoor activities.",
  },
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80";

export async function generateStaticParams() {
  return allTrips.map((trip) => ({
    slug: trip.slug,
  }));
}

export default async function TripDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rawTrip = allTrips.find((t) => t.slug === slug);

  if (!rawTrip) {
    notFound();
  }

  const trip = rawTrip as SafeTrip;

  const relatedTrips = allTrips
    .filter((t) => t.id !== trip.id && (t as SafeTrip).experience === trip.experience)
    .slice(0, 3);

  const displayRelated =
    relatedTrips.length > 0
      ? relatedTrips
      : allTrips.filter((t) => t.id !== trip.id).slice(0, 3);

  const tripMainImage = trip.image || FALLBACK_IMAGE;

  const galleryImages: string[] =
    trip.gallery && trip.gallery.length > 0
      ? trip.gallery
      : [tripMainImage];

  const faqsToDisplay =
    trip.faqs && trip.faqs.length > 0 ? trip.faqs : DEFAULT_FAQS;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/trips" className="hover:text-red-600">
            Trips
          </Link>
          <span>/</span>
          <span className="line-clamp-1 font-semibold text-gray-800">
            {trip.title}
          </span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
              {trip.experience || "Adventure"}
            </span>
            <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
              <Star size={16} className="fill-amber-500 text-amber-500" />
              <span>{trip.rating ?? 4.8}</span>
              <span className="text-gray-400">
                ({trip.reviewsCount ?? 24} reviews)
              </span>
            </div>
          </div>

          <h1 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl lg:text-4xl">
            {trip.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-red-500" />
              <span>{trip.country || "Worldwide"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-blue-500" />
              <span>{trip.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={16} className="text-emerald-500" />
              <span>Group / Solo</span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-10">
          <TripGallery images={galleryImages} />
        </div>

        {/* Main Content & Sticky Sidebar */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main Info Column */}
          <div className="space-y-10 lg:col-span-2">
            {/* Overview / Description */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-black text-gray-900">Overview</h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                {trip.description ||
                  "Experience an unforgettable journey with professional guides, scenic landscapes, and authentic local experiences crafted for adventurous travelers."}
              </p>
            </section>

            {/* Highlights */}
            {trip.highlights && trip.highlights.length > 0 && (
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-black text-gray-900">
                  <Sparkles size={20} className="text-amber-500" />
                  Trip Highlights
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {trip.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-green-500"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <TripFaq faqs={faqsToDisplay} />
            </section>
          </div>

          {/* Booking Sidebar Column */}
          <div className="lg:col-span-1">
            <BookingSidebar trip={trip} />
          </div>
        </div>

        {/* Related Trips Section */}
        {displayRelated.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-black text-gray-900">
              You Might Also Like
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Explore similar thrilling adventures around the globe.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayRelated.map((item) => {
                const relTrip = item as SafeTrip;
                const imgSrc = relTrip.image || FALLBACK_IMAGE;
                return (
                  <Link
                    key={relTrip.id}
                    href={`/trips/${relTrip.slug}`}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={imgSrc}
                        alt={relTrip.title || "Related Trip"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-bold text-red-600">
                        {relTrip.experience || "Adventure"}
                      </span>
                      <h3 className="mt-1 line-clamp-1 font-bold text-gray-900 group-hover:text-red-600">
                        {relTrip.title}
                      </h3>
                      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                        <span className="text-xs text-gray-500">
                          {relTrip.duration}
                        </span>
                        <span className="font-black text-gray-900">
                          ${relTrip.currentPrice ?? relTrip.price ?? 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
