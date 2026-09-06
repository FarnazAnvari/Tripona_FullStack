import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthRequest } from '../middleware/authMiddleware';

// ساخت توکن JWT
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "7d",
  });
};

// ۱. ثبت‌نام کاربر جدید (Register)
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // بررسی پر بودن فیلدها
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
      return;
    }

    // بررسی وجود ایمیل تکراری
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: "Email already registered" });
      return;
    }

    // هش کردن پسورد
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ساخت کاربر
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: "User registered successfully 🎉",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ۲. ورود کاربر (Login)
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
      return;
    }

    // پیدا کردن کاربر (همراه با پسورد هش‌شده)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    // بررسی تطابق پسورد
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: "Logged in successfully 🚀",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    // اطلاعات کاربر از میدلور protect در req.user قرار گرفته
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};