import { Request, Response } from 'express';
import { Trip } from '../models/Trip';

// دریافت تمام تورها (با قابلیت فیلتر بر اساس دسته‌بندی و سرچ)
export const getTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;
    let query: any = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search as string, $options: 'i' };
    }

    const trips = await Trip.find(query);
    res.status(200).json({ success: true, count: trips.length, data: trips });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// دریافت یک تور بر اساس Slug
export const getTripBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.findOne({ slug: req.params.slug });
    if (!trip) {
      res.status(404).json({ success: false, message: 'Trip not found' });
      return;
    }
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
