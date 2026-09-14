"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Booking {
  _id: string;
  tripId?: {
    _id?: string;
    title?: string;
    image?: string;
    location?: string;
    price?: number;
  };
  contactInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
  status: string;
  totalPrice?: number;
  createdAt?: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyBookings() {
      try {
        setLoading(true);
        setError("");

        const res = await apiFetch("/bookings/my-bookings");

        // استخراج لیست رزروها با پوشش انواع ساختارهای خروجی بک‌اند
        if (Array.isArray(res)) {
          setBookings(res);
        } else if (res && Array.isArray(res.data)) {
          setBookings(res.data);
        } else if (res && Array.isArray(res.bookings)) {
          setBookings(res.bookings);
        } else {
          setBookings([]);
        }
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Error fetching booking list");
      } finally {
        setLoading(false);
      }
    }

    fetchMyBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          You haven't booked any trips yet.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border p-5 rounded-lg shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {booking.tripId?.title || "Trip details unavailable"}
                </h3>
                <p className="text-xs text-gray-400">
                  Booking ID: {booking._id}
                </p>
                {booking.contactInfo?.fullName && (
                  <p className="text-sm text-gray-600">
                    Booked for: {booking.contactInfo.fullName}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="capitalize px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {booking.status || "confirmed"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
