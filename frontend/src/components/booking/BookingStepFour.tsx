"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";

interface BookingStepFourProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function BookingStepFour({ onBack }: BookingStepFourProps) {
  const router = useRouter();
  const tripTitle = useBookingStore((state) => state.tripTitle);
  const totalPrice = useBookingStore((state) => state.totalPrice);

  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  const handlePay = () => {
    setIsProcessing(true);
    // شبیه‌سازی پرداخت و رفتن به صفحه تایید
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/booking/confirmation");
    }, 1500);
  };

  const isFormValid =
    cardNumber.replace(/\s/g, "").length === 16 &&
    cardholderName.trim().length > 2 &&
    expiryDate.length >= 4 &&
    cvv.length >= 3;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
          Step 4 of 4
        </span>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          Payment Details
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Tour: {tripTitle || "Trip"} &mdash; Total: ${totalPrice}
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        <strong>Demo Payment:</strong> No real money will be charged. You can
        use any dummy card details (e.g., 16 digits).
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="cardNumber"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="4444 3333 2222 1114"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label
            htmlFor="cardholderName"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            Cardholder Name
          </label>
          <input
            id="cardholderName"
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Name on card"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiryDate"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="12/28"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label
              htmlFor="cvv"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              CVV
            </label>
            <input
              id="cvv"
              type="password"
              inputMode="numeric"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="123"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Review
        </button>
        <button
          type="button"
          onClick={handlePay}
          disabled={!isFormValid || isProcessing}
          className="rounded-xl bg-orange-500 px-10 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : `Pay $${totalPrice}`}
        </button>
      </div>
    </section>
  );
}
