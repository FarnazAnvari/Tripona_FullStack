import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  tripId: number; 
  userId: mongoose.Types.ObjectId;
  startDate: Date;
  guests: number;
  totalPrice: number;
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  status: "pending" | "confirmed" | "cancelled";
}

const bookingSchema = new Schema<IBooking>(
  {
    tripId: {
      type: Number,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    contactInfo: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
