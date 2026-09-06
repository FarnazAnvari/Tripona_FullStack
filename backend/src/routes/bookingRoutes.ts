import { Router } from "express";
import {
  createBooking,
  getUserBookings,
} from "../controllers/bookingController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// ثبت رزرو (فقط کاربران لاگین‌شده)
router.post("/", protect, createBooking);

// مشاهده رزروهای کاربر جاری
router.get("/my-bookings", protect, getUserBookings);

export default router;


console.log('protect:', protect);
console.log('getUserBookings:', getUserBookings);

// روت‌ها را اینجا بنویسید
router.get('/my-bookings', protect, getUserBookings);