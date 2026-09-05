"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingStepOne from "@/components/booking/BookingStepOne";
import BookingStepTwo from "@/components/booking/BookingStepTwo";
import BookingStepThree from "@/components/booking/BookingStepThree";
import BookingStepFour from "@/components/booking/BookingStepFour";
import BookingSummary from "@/components/booking/BookingSummary";
import { useBookingStore } from "@/store/bookingStore";

export default function BookingPage() {
  const router = useRouter();

  const tripId = useBookingStore((state) => state.tripId);
  const tripTitle = useBookingStore((state) => state.tripTitle);
  const bookingStatus = useBookingStore((state) => state.bookingStatus);
  const bookingReference = useBookingStore((state) => state.bookingReference);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !tripId) {
      router.replace("/trips");
    }
  }, [isHydrated, router, tripId]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (nextStep: 1 | 2 | 3 | 4) => {
    setStep(nextStep);
    scrollToTop();
  };

  const handleComplete = () => {
    const refParam = bookingReference ? `?ref=${bookingReference}` : "";
    router.push(`/booking/confirmation${refParam}`);
  };

  if (!isHydrated || !tripId) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <p className="text-slate-500 font-medium">Loading booking details...</p>
      </main>
    );
  }

  if (bookingStatus === "confirmed") {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            This booking is already confirmed.
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            You can view your trip confirmation receipt anytime.
          </p>
          <button
            type="button"
            onClick={() => router.push("/booking/confirmation")}
            className="mt-5 w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          >
            View Confirmation
          </button>
        </div>
      </main>
    );
  }

  const stepsList = [
    { num: 1, label: "Date & Guests" },
    { num: 2, label: "Passenger Info" },
    { num: 3, label: "Review" },
    { num: 4, label: "Payment" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-orange-600">
            Tripona Booking
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Complete your booking
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Tour:{" "}
            <span className="font-semibold text-slate-700">{tripTitle}</span>
          </p>
        </div>

        {/* Mobile Step Indicator */}
        <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:hidden">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>
              Step {step} of 4:{" "}
              <strong className="text-slate-900">
                {stepsList[step - 1].label}
              </strong>
            </span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Desktop Step Indicator */}
        <div className="mb-8 hidden items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex">
          {stepsList.map((s, idx) => {
            const isCurrent = step === s.num;
            const isCompleted = step > s.num;

            return (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  aria-current={isCurrent ? "step" : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${
                    isCurrent
                      ? "bg-orange-500 text-white shadow-sm"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {isCompleted ? "✓" : s.num}
                </div>
                <span
                  className={`text-sm font-medium ${
                    step >= s.num
                      ? "font-semibold text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
                {idx < stepsList.length - 1 && (
                  <div className="ml-4 h-[1px] w-10 bg-slate-200 lg:w-20" />
                )}
              </div>
            );
          })}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            {step === 1 && <BookingStepOne onNext={() => goToStep(2)} />}
            {step === 2 && (
              <BookingStepTwo
                onBack={() => goToStep(1)}
                onNext={() => goToStep(3)}
              />
            )}
            {step === 3 && (
              <BookingStepThree
                onBack={() => goToStep(2)}
                onNext={() => goToStep(4)}
              />
            )}
            {step === 4 && (
              <BookingStepFour
                onBack={() => goToStep(3)}
                onComplete={handleComplete}
              />
            )}
          </div>

          <aside className="h-fit">
            <BookingSummary />
          </aside>
        </div>
      </div>
    </main>
  );
}
