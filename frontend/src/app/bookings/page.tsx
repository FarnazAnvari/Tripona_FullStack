"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Booking {
  _id: string;
  tripId: { title: string; destination: string; image?: string };
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await apiFetch("/api/bookings/my-bookings");
        const data = await res.json();
        setBookings(data.data ?? data.bookings ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        {bookings.length === 0 ? (
          <p className="text-gray-500">You have no bookings yet.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => (
              <li key={b._id} className="border rounded-xl p-4 shadow-sm">
                <h2 className="font-semibold">{b.tripId?.title}</h2>
                <p className="text-sm text-gray-500">
                  {b.guests} guests · ${b.totalPrice} ·{" "}
                  {new Date(b.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
