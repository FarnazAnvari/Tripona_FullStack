"use client";

import { useState, type FormEvent } from "react";
import {
  type PassengerInfo,
  useBookingStore,
} from "@/store/bookingStore";

interface BookingStepTwoProps {
  onBack: () => void;
  onNext: () => void;
}

export default function BookingStepTwo({
  onBack,
  onNext,
}: BookingStepTwoProps) {
  const passengers = useBookingStore((state) => state.passengers);
  const updatePassenger = useBookingStore(
    (state) => state.updatePassenger
  );

  const [error, setError] = useState("");

  const handleChange = (
    index: number,
    field: keyof PassengerInfo,
    value: string
  ) => {
    updatePassenger(index, { [field]: value });

    if (error) {
      setError("");
    }
  };

  const validatePassengers = () => {
    return (
      passengers.length > 0 &&
      passengers.every((passenger) => {
        const hasRequiredFields =
          passenger.firstName.trim() !== "" &&
          passenger.lastName.trim() !== "" &&
          passenger.email.trim() !== "" &&
          passenger.phone.trim() !== "";

        const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          passenger.email.trim()
        );

        return hasRequiredFields && hasValidEmail;
      })
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validatePassengers()) {
      setError(
        "Please complete all required fields and enter a valid email address."
      );
      return;
    }

    setError("");
    onNext();
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold text-orange-600">
          Step 2 of 4
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          Traveler details
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Please enter the details exactly as they appear on each traveler&apos;s
          passport.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">
          {passengers.map((passenger, index) => (
            <div
              key={passenger.id || index}
              className="rounded-xl border border-slate-200 p-5"
            >
              <h3 className="mb-4 font-bold text-slate-900">
                Traveler {index + 1}
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  <span>
                    First name <span className="text-red-500">*</span>
                  </span>

                  <input
                    type="text"
                    value={passenger.firstName}
                    onChange={(event) =>
                      handleChange(index, "firstName", event.target.value)
                    }
                    required
                    autoComplete="given-name"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="Jane"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  <span>
                    Last name <span className="text-red-500">*</span>
                  </span>

                  <input
                    type="text"
                    value={passenger.lastName}
                    onChange={(event) =>
                      handleChange(index, "lastName", event.target.value)
                    }
                    required
                    autoComplete="family-name"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="Doe"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  <span>
                    Email address <span className="text-red-500">*</span>
                  </span>

                  <input
                    type="email"
                    value={passenger.email}
                    onChange={(event) =>
                      handleChange(index, "email", event.target.value)
                    }
                    required
                    autoComplete="email"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="jane@example.com"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  <span>
                    Phone number <span className="text-red-500">*</span>
                  </span>

                  <input
                    type="tel"
                    value={passenger.phone}
                    onChange={(event) =>
                      handleChange(index, "phone", event.target.value)
                    }
                    required
                    autoComplete="tel"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="+49 151 12345678"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Passport number

                  <input
                    type="text"
                    value={passenger.passportNumber || ""}
                    onChange={(event) =>
                      handleChange(
                        index,
                        "passportNumber",
                        event.target.value
                      )
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="Optional"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Dietary requirements

                  <input
                    type="text"
                    value={passenger.dietaryRequirements || ""}
                    onChange={(event) =>
                      handleChange(
                        index,
                        "dietaryRequirements",
                        event.target.value
                      )
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="Optional"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>

          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
          >
            Continue to review
          </button>
        </div>
      </form>
    </section>
  );
}
