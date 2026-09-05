"use client";

import { useState } from "react";
import { useBookingStore } from "@/store/bookingStore";

interface BookingStepOneProps {
  onNext: () => void;
}

export default function BookingStepOne({ onNext }: BookingStepOneProps) {
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const guestsCount = useBookingStore((state) => state.guestsCount);
  const setDateAndGuests = useBookingStore(
    (state) => state.setDateAndGuests
  );

  const [date, setDate] = useState(selectedDate || "");
  const [guests, setGuests] = useState(guestsCount || 1);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleContinue = () => {
    if (!date) {
      setError("Please select your preferred departure date.");
      return;
    }

    if (guests < 1) {
      setError("At least one traveler is required.");
      return;
    }

    setDateAndGuests(date, guests);
    setError("");
    onNext();
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold text-orange-600">Step 1 of 2</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          Choose date and travelers
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Select your preferred departure date and the number of travelers.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Departure date
          <input
            type="date"
            value={date}
            min={today}
            onChange={(event) => setDate(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Number of travelers
          <select
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "Traveler" : "Travelers"}
                </option>
              )
            )}
          </select>
        </label>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleContinue}
        className="mt-6 w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
      >
        Continue to traveler details
      </button>
    </section>
  );
}
