import { Request, Response } from 'express';
import { Booking } from '../models/Booking';

// ثبت یک رزرو جدید
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId, tripTitle, contactInfo, startDate, guests, totalPrice } = req.body;

    if (!tripId || !contactInfo || !startDate || !guests || !totalPrice) {
      res.status(400).json({ success: false, message: 'Please provide all required booking details' });
      return;
    }

    const newBooking = await Booking.create({
      tripId,
      tripTitle,
      contactInfo,
      startDate,
      guests,
      totalPrice,
      paymentStatus: 'completed',
      bookingStatus: 'confirmed',
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully 🎉',
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// دریافت لیست تمام رزروها
export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
