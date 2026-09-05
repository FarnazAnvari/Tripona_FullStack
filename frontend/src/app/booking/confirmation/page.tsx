"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const tripTitle = useBookingStore((state) => state.tripTitle);
  const bookingReference = useBookingStore((state) => state.bookingReference);

  const reference = searchParams.get("ref") || bookingReference;

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-600">
          ✓
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-emerald-600">
          Booking confirmed
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
          Your adventure is reserved!
        </h1>

        <p className="mt-4 leading-7 text-slate-500">
          Thank you for booking{" "}
          <span className="font-semibold text-slate-700">
            {tripTitle || "your trip"}
          </span>
          . We will send your booking details to your email address.
        </p>

        <div className="mt-7 rounded-2xl bg-slate-50 px-5 py-4">
          <p className="text-sm text-slate-500">Booking reference</p>
          <p className="mt-1 text-2xl font-extrabold tracking-wider text-orange-600">
            {reference || "TRP-XXXXX"}
          </p>
        </div>

        <Link
          href="/trips"
          className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          Explore more trips
        </Link>
      </section>
    </main>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-10">
          <p className="text-slate-500">Loading confirmation...</p>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
