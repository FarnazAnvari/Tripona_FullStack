import mongoose, { Document, Schema } from 'mongoose';

export interface ITrip extends Document {
  id: number;
  title: string;
  slug: string;
  image: string;
  location: string;
  country: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  currentPrice: number;
  originalPrice?: number;
  badge?: string;
  category: string;
  featured?: boolean;
  description?: string;
}

const tripSchema = new Schema<ITrip>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    duration: { type: String, required: true },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 0 },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number },
    badge: { type: String },
    category: { type: String, default: 'Adventure' },
    featured: { type: Boolean, default: false },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Trip = mongoose.model<ITrip>('Trip', tripSchema);
