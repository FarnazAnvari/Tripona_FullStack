"use client";

import Image from "next/image";
import { useBookingStore } from "@/store/bookingStore";

export default function BookingSummary() {
  const tripTitle = useBookingStore((state) => state.tripTitle);
  const tripImage = useBookingStore((state) => state.tripImage);
  const pricePerPerson = useBookingStore((state) => state.pricePerPerson);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const guestsCount = useBookingStore((state) => state.guestsCount);
  const serviceFee = useBookingStore((state) => state.serviceFee);
  const totalPrice = useBookingStore((state) => state.totalPrice);

  const travelersPrice = (pricePerPerson || 0) * (guestsCount || 1);

  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(`${selectedDate}T12:00:00`))
    : "Not selected yet";

  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-slate-900">Booking summary</h2>

      <div className="mt-5 flex gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={tripImage || "/images/placeholder.jpg"}
            alt={tripTitle || "Selected trip"}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="line-clamp-2 font-semibold text-slate-900">
            {tripTitle || "Select a trip first"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {guestsCount} {guestsCount === 1 ? "traveler" : "travelers"}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-y border-slate-100 py-5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Departure</span>
          <span className="text-right font-medium text-slate-800">
            {formattedDate}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            ${(pricePerPerson || 0).toLocaleString()} × {guestsCount}
          </span>
          <span className="font-medium text-slate-800">
            ${travelersPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Service fee</span>
          <span className="font-medium text-slate-800">
            ${(serviceFee || 0).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-4 text-lg">
        <span className="font-bold text-slate-900">Total</span>
        <span className="font-extrabold text-orange-600">
          ${(totalPrice || travelersPrice + (serviceFee || 0)).toLocaleString()}
        </span>
      </div>
    </aside>
  );
}
