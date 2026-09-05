"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import type { Trip } from "@/data/trips";
import BookingModal from "./BookingModal";
import BookNowButton from "@/components/booking/BookNowButton";

interface BookingSidebarProps {
  trip: Trip;
}

export default function BookingSidebar({ trip }: BookingSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="sticky top-6 space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Starting from
          </span>

          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-3xl font-black text-gray-900 sm:text-4xl">
              USD ${trip.currentPrice}
            </span>

            {trip.originalPrice && (
              <span className="text-base text-gray-400 line-through">
                USD ${trip.originalPrice}
              </span>
            )}

            <span className="text-xs text-gray-500">/ person</span>
          </div>
        </div>

        <div className="space-y-3 border-t border-gray-100 pt-3 text-sm">
          <div className="flex items-center justify-between text-gray-600">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-gray-400" />
              Availability:
            </span>
            <span className="font-semibold text-green-600">
              Available all year
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-gray-400" />
              Duration:
            </span>
            <span className="font-semibold text-gray-900">{trip.duration}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <BookNowButton
            trip={{
              id: trip.id,
              slug: trip.slug,
              title: trip.title,
              image: trip.image || "",
              currentPrice: trip.currentPrice ?? trip.price ?? 0,
            }}
          />

          <p className="text-center text-[11px] text-gray-400">
            Free cancellation up to 30 days before departure
          </p>
        </div>

        <div className="space-y-2 rounded-xl bg-gray-50 p-4 text-xs text-gray-600">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={14} className="text-green-600" />
            No hidden booking fees
          </div>
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={14} className="text-green-600" />
            24/7 dedicated support
          </div>
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={14} className="text-green-600" />
            Flexible deposit payments
          </div>
        </div>
      </div>

      {/* Booking Modal Popup */}
      <BookingModal
        trip={trip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
