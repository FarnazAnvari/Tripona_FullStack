import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Trip } from './models/Trip';

dotenv.config();

const trips = [
  {
    id: 1,
    title: 'Swiss Alps Hiking Expedition',
    slug: 'swiss-alps-hiking-expedition',
    country: 'Switzerland',
    location: 'Interlaken, Switzerland',
    category: 'Adventure',
    rating: 4.9,
    reviewsCount: 128,
    duration: '7 Days',
    groupSize: '12 People',
    currentPrice: 1850,
    originalPrice: 2100,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    description: 'Experience the breathtaking beauty of the Swiss Alps with guided hiking trails, mountain cabins, and stunning panoramic views of the Matterhorn.',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Kyoto Cultural Heritage & Tea Journey',
    slug: 'kyoto-cultural-heritage-tea-journey',
    country: 'Japan',
    location: 'Kyoto, Japan',
    category: 'Culture',
    rating: 4.8,
    reviewsCount: 94,
    duration: '5 Days',
    groupSize: '8 People',
    currentPrice: 1450,
    originalPrice: 1650,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse yourself in traditional Japanese culture with private tea ceremonies, temple visits, and historic bamboo groves.',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Bali Island Luxury & Wellness Retreat',
    slug: 'bali-island-luxury-wellness-retreat',
    country: 'Indonesia',
    location: 'Ubud, Indonesia',
    category: 'Relaxation',
    rating: 4.95,
    reviewsCount: 210,
    duration: '6 Days',
    groupSize: '10 People',
    currentPrice: 1200,
    originalPrice: 1400,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Recharge your mind and body with luxury villa stays, yoga sessions, spa therapies, and tropical waterfall excursions.',
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Santorini Sunset Sailing & Wine Tour',
    slug: 'santorini-sunset-sailing-wine-tour',
    country: 'Greece',
    location: 'Santorini, Greece',
    category: 'Romance',
    rating: 4.75,
    reviewsCount: 88,
    duration: '4 Days',
    groupSize: '6 People',
    currentPrice: 1600,
    originalPrice: 1750,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    description: 'Sail the Aegean Sea on a private catamaran, explore volcanic beaches, and taste award-winning volcanic wines.',
    isFeatured: false,
  },
];

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined in .env');

    await mongoose.connect(uri);
    console.log('🍃 Connected to MongoDB for seeding...');

    // پاک کردن تورهای قبلی و ثبت تورهای اصلاح‌شده
    await Trip.deleteMany();
    console.log('🗑️ Previous trips cleared.');

    await Trip.insertMany(trips);
    console.log('✅ Sample trips seeded successfully! 🎉');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
