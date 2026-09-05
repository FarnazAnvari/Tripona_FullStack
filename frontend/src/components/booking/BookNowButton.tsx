"use client";

import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";

interface BookNowButtonProps {
  trip: {
id: number;
slug: string;
title: string;
image?: string;
currentPrice: string | number;
  };
}

export default function BookNowButton({ trip }: BookNowButtonProps) {
  const router = useRouter();
  const initBooking = useBookingStore((state) => state.initBooking);

  const handleBooking = () => {
initBooking(trip);
router.push("/booking");
  };

  return (
<button
type="button"
onClick={handleBooking}
className="w-full rounded-xl bg-orange-500 px-5 py-4 text-center font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
>
Book this trip
</button>
  );
}
