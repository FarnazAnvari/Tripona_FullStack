import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PassengerInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber?: string;
  dietaryRequirements?: string;
}

export interface BookingState {
  tripId: number | null;
  tripSlug: string | null;
  tripTitle: string;
  tripImage: string;
  pricePerPerson: number;
  selectedDate: string | null;
  guestsCount: number;
  passengers: PassengerInfo[];
  serviceFee: number;
  totalPrice: number;
  bookingReference: string | null;
  bookingStatus: "idle" | "pending" | "confirmed" | "failed";
  initBooking: (trip: {
    id: number;
    slug: string;
    title: string;
    image?: string;
    currentPrice: string | number;
  }) => void;
  setDateAndGuests: (date: string, guests: number) => void;
  updatePassenger: (index: number, info: Partial<PassengerInfo>) => void;
  setPassengers: (passengers: PassengerInfo[]) => void;
  confirmBooking: (referenceCode?: string) => string;
  resetBooking: () => void;
}

const parsePrice = (price: string | number): number => {
  if (typeof price === "number") {
    return price;
  }
  const cleaned = price.replace(/[^0-9.]/g, "");
  return Number(cleaned) || 0;
};

const generateBookingRef = (): string => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `TRP-${randomNum}`;
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      tripId: null,
      tripSlug: null,
      tripTitle: "",
      tripImage: "/images/placeholder.jpg",
      pricePerPerson: 0,
      selectedDate: null,
      guestsCount: 1,
      passengers: [
        {
          id: "passenger-1",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
      ],
      serviceFee: 45,
      totalPrice: 0,
      bookingReference: null,
      bookingStatus: "idle",

      initBooking: (trip) => {
        const basePrice = parsePrice(trip.currentPrice);
        const currentGuests = get().guestsCount || 1;
        const fee = get().serviceFee;

        set({
          tripId: trip.id,
          tripSlug: trip.slug,
          tripTitle: trip.title,
          tripImage: trip.image || "/images/placeholder.jpg",
          pricePerPerson: basePrice,
          totalPrice: basePrice * currentGuests + fee,
          bookingStatus: "idle",
        });
      },

      setDateAndGuests: (date, guests) => {
        const basePrice = get().pricePerPerson;
        const fee = get().serviceFee;
        const currentPassengers = get().passengers;

        const newPassengers: PassengerInfo[] = Array.from(
          { length: guests },
          (_, index) =>
            currentPassengers[index] || {
              id: `passenger-${index + 1}`,
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
            }
        );

        set({
          selectedDate: date,
          guestsCount: guests,
          passengers: newPassengers,
          totalPrice: basePrice * guests + fee,
        });
      },

      updatePassenger: (index, info) => {
        const updated = [...get().passengers];
        if (updated[index]) {
          updated[index] = { ...updated[index], ...info };
          set({ passengers: updated });
        }
      },

      setPassengers: (passengers) => {
        set({ passengers });
      },

      confirmBooking: (customRef) => {
        const ref = customRef || generateBookingRef();
        set({
          bookingReference: ref,
          bookingStatus: "confirmed",
        });
        return ref;
      },

      resetBooking: () => {
        set({
          tripId: null,
          tripSlug: null,
          tripTitle: "",
          tripImage: "/images/placeholder.jpg",
          pricePerPerson: 0,
          selectedDate: null,
          guestsCount: 1,
          passengers: [
            {
              id: "passenger-1",
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
            },
          ],
          totalPrice: 0,
          bookingReference: null,
          bookingStatus: "idle",
        });
      },
    }),
    {
      name: "tripona-booking-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
