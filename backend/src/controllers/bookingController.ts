import { Response } from "express";
import { Booking } from "../models/Booking";
import { AuthRequest } from "../middleware/authMiddleware";

// ثبت رزرو جدید
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId, startDate, guests, totalPrice, contactInfo } = req.body;

    const booking = await Booking.create({
      userId: req.user?._id, // 👈 گرفتن اتوماتیک از توکن احراز هویت
      tripId,
      startDate,
      guests,
      totalPrice,
      contactInfo,
      status: "confirmed",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully 🎉",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

// دریافت تمام رزروهای کاربر جاری
export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.user?._id }).populate(
      "tripId",
    );

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

// لغو رزرو
export const cancelBooking = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?._id) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });
      return;
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    if (booking.status === "cancelled") {
      res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
      return;
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};
