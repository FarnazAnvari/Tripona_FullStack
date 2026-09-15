import { Router } from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking, // 👈 این بود که جا افتاده بود
} from "../controllers/bookingController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// ثبت رزرو (فقط کاربر لاگین‌شده)
router.post("/", protect, createBooking);

// مشاهده رزروهای کاربر جاری
router.get("/my-bookings", protect, getUserBookings);

// لغو رزرو
router.delete("/:id", protect, cancelBooking);

export default router;