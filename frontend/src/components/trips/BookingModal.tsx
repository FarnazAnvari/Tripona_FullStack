"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import type { Trip } from "@/data/trips";

interface BookingModalProps {
  trip: Trip;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({
  trip,
  isOpen,
  onClose,
}: BookingModalProps) {
  const [guests, setGuests] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const basePrice = (Number(trip.currentPrice) || 0) * guests;
  const serviceFee = Math.round(basePrice * 0.05);
  const totalPrice = basePrice + serviceFee;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">
            {isSuccess ? "Booking Confirmed 🎉" : "Book Your Adventure"}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          /* Confirmation Success State */
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-xl font-bold text-gray-900">
              You're All Set, {fullName}!
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              We’ve sent a confirmation email with all trip instructions and
              itinerary details to{" "}
              <span className="font-semibold text-gray-800">{email}</span>.
            </p>

            <div className="mt-6 space-y-2 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Trip:</span>
                <span className="font-semibold text-gray-900">{trip.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Departure Date:</span>
                <span className="font-semibold text-gray-900">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Travelers:</span>
                <span className="font-semibold text-gray-900">{guests} Person(s)</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-gray-900">
                <span>Total Amount:</span>
                <span className="text-red-600">${totalPrice} USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition hover:bg-black"
            >
              Done
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            {/* Trip Preview Banner */}
            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50/60 p-3">
              <div className="flex-1">
                <h4 className="line-clamp-1 text-sm font-bold text-gray-900">
                  {trip.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {trip.duration} • {trip.country || "Worldwide"}
                </p>
              </div>
              <span className="text-base font-black text-red-600">
                ${trip.currentPrice}/pers
              </span>
            </div>

            {/* Travel Date & Guests */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">
                  Departure Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">
                  Number of Guests
                </label>
                <div className="flex items-center rounded-xl border border-gray-200 p-1">
                  <button
                    type="button"
                    onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-700 transition hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm font-bold text-gray-900">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((prev) => Math.min(10, prev + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-700 transition hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Traveler Information */}
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 234 567 890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                  />
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>
                  ${trip.currentPrice} × {guests} guests
                </span>
                <span className="font-semibold text-gray-900">${basePrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service & Booking Fee (5%)</span>
                <span className="font-semibold text-gray-900">${serviceFee}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-sm font-black text-gray-900">
                <span>Total Amount:</span>
                <span className="text-red-600">${totalPrice} USD</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-center font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-50"
            >
              <CreditCard size={18} />
              {isSubmitting
                ? "Processing Reservation..."
                : `Confirm & Reserve ($${totalPrice})`}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-green-600" />
              <span>Secure 256-bit encrypted reservation</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
