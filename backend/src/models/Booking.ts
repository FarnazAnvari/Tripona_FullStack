import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  tripId: number;
  tripTitle: string;
  userId?: mongoose.Types.ObjectId;
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  startDate: string;
  guests: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingStatus: 'confirmed' | 'cancelled';
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    tripId: { type: Number, required: true },
    tripTitle: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    contactInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    startDate: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
    bookingStatus: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
