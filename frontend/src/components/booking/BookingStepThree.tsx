"use client";

import { useBookingStore } from "@/store/bookingStore";

interface BookingStepThreeProps {
  onBack: () => void;
  onNext: () => void;
}

export default function BookingStepThree({
  onBack,
  onNext,
}: BookingStepThreeProps) {
  const tripTitle = useBookingStore((state) => state.tripTitle);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const guestsCount = useBookingStore((state) => state.guestsCount);
  const pricePerPerson = useBookingStore((state) => state.pricePerPerson);
  const serviceFee = useBookingStore((state) => state.serviceFee);
  const passengers = useBookingStore((state) => state.passengers);
  const totalPrice = useBookingStore((state) => state.totalPrice);

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Not selected";

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Step 3 of 4
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Review Your Booking
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* Trip & Date Details */}
        <div className="rounded-2xl bg-slate-50 p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Trip Details
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-400">Destination / Tour</p>
              <p className="font-semibold text-slate-800">
                {tripTitle || "Trip"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Selected Date</p>
              <p className="font-semibold text-slate-800">{formattedDate}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Guests</p>
              <p className="font-semibold text-slate-800">
                {guestsCount} {guestsCount > 1 ? "Guests" : "Guest"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Price per Person</p>
              <p className="font-semibold text-slate-800">
                ${pricePerPerson}
              </p>
            </div>
          </div>
        </div>

        {/* Passenger Information */}
        <div className="rounded-2xl bg-slate-50 p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Passenger Information
          </h3>
          <div className="mt-3 divide-y divide-slate-200">
            {passengers && passengers.length > 0 ? (
              passengers.map((p, index) => (
                <div
                  key={p.id || index}
                  className="py-3 first:pt-0 last:pb-0"
                >
                  <p className="font-semibold text-slate-800">
                    {index + 1}. {p.firstName} {p.lastName}
                  </p>
                  <p className="text-sm text-slate-500">
                    {p.email} &bull; {p.phone}
                  </p>
                  {Boolean(p.passportNumber || p.dietaryRequirements) && (
                    <p className="mt-1 text-xs text-slate-400">
                      {p.passportNumber ? `Passport: ${p.passportNumber}` : ""}
                      {p.passportNumber && p.dietaryRequirements
                        ? " | "
                        : ""}
                      {p.dietaryRequirements
                        ? `Diet: ${p.dietaryRequirements}`
                        : ""}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                No passenger details added yet.
              </p>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-orange-900">
            Payment Breakdown
          </h3>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>
                ${pricePerPerson} &times; {guestsCount}{" "}
                {guestsCount > 1 ? "guests" : "guest"}
              </span>
              <span className="font-medium text-slate-900">
                ${pricePerPerson * guestsCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span className="font-medium text-slate-900">
                ${serviceFee}
              </span>
            </div>
            <div className="flex justify-between border-t border-orange-200 pt-2 text-base font-bold text-slate-900">
              <span>Total Due</span>
              <span className="text-orange-600">${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Passenger Info
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-orange-500 px-8 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          Proceed to Payment
        </button>
      </div>
    </section>
  );
}
