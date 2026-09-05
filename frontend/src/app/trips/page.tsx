import { Suspense } from "react";
import TripsClient from "@/components/trips/TripsClient";

export const metadata = {
  title: "Explore Trips | Tripona",
  description:
    "Search and discover amazing curated travel experiences worldwide.",
};

export default function TripsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-gray-500">Loading trips...</div>
      }
    >
      <TripsClient />
    </Suspense>
  );
}
