"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { allTrips } from "../../data/trips";

interface Booking {
  _id: string;
  tripId: number | string;
  startDate?: string;
  guests?: number;
  totalPrice?: number;
  status: string;
  createdAt?: string;
  contactInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMyBookings() {
      try {
        setLoading(true);
        setError("");

        const res = await apiFetch("/bookings/my-bookings");

        if (res && res.success && Array.isArray(res.data)) {
          setBookings(res.data);
        } else if (Array.isArray(res)) {
          setBookings(res);
        } else if (res && Array.isArray((res as any).data)) {
          setBookings((res as any).data);
        } else {
          setBookings([]);
        }
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }

    fetchMyBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!isConfirmed) return;

    try {
      setCancellingId(bookingId);

      // ارسال درخواست لغو به اندپوینت بک‌اند
      await apiFetch(`/bookings/${bookingId}`, {
        method: "DELETE",
      });

      // به‌روزرسانی آنی وضعیت در UI بدون نیاز به رفرش صفحه
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (err: any) {
      console.error("Failed to cancel booking:", err);
      alert(err?.message || "Failed to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-medium">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and view all your booked trips
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50/50">
          <div className="text-4xl mb-3">🎒</div>
          <h3 className="text-lg font-semibold text-gray-800">
            No bookings yet
          </h3>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            You haven&apos;t booked any adventures yet. Start exploring!
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition"
          >
            Explore Trips
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const trip = Array.isArray(allTrips)
              ? allTrips.find((t) => Number(t.id) === Number(booking.tripId))
              : null;

            const title = trip?.title || `Trip #${booking.tripId}`;
            const image = trip?.image;
            const country = trip?.country;
            const duration = trip?.duration;

            const formattedDate = booking.startDate
              ? new Date(booking.startDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Date unavailable";

            return (
              <div
                key={booking._id}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {image ? (
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      ✈️
                    </div>
                  )}

                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-gray-900 leading-snug">
                      {title}
                    </h3>

                    {(country || duration) && (
                      <p className="text-xs text-gray-500 font-medium">
                        {country ? `📍 ${country}` : ""}{" "}
                        {duration ? `· ⏱ ${duration}` : ""}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 pt-1">
                      <span>📅 {formattedDate}</span>
                      {typeof booking.guests === "number" && (
                        <span>
                          👥 {booking.guests} guest
                          {booking.guests > 1 ? "s" : ""}
                        </span>
                      )}
                      {typeof booking.totalPrice === "number" && (
                        <span className="font-semibold text-gray-900">
                          💰 ${booking.totalPrice}
                        </span>
                      )}
                    </div>

                    {booking.contactInfo?.fullName && (
                      <p className="text-[11px] text-gray-400">
                        Booked for: {booking.contactInfo.fullName}
                      </p>
                    )}
                  </div>
                </div>

                {/* بخش وضعیت و دکمه لغو رزرو */}
                <div className="mt-4 md:mt-0 flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      booking.status?.toLowerCase() === "cancelled"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {booking.status?.toLowerCase() === "cancelled"
                      ? "Cancelled"
                      : "Confirmed"}
                  </span>

                  {booking.status?.toLowerCase() !== "cancelled" && (
                    <button
                      type="button"
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={cancellingId === booking._id}
                      className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {cancellingId === booking._id
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
