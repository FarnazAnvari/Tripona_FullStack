"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// دیتا برای هر اسلاید
const slides = [
  {
    url: "/images/hero/Adventure.jpg",
    title: "Adventure starts here",
    description:
      "Discover authentic experiences and unforgettable journeys across the globe.",
  },
  {
    url: "/images/hero/Explore.jpg",
    title: "Explore the Unknown",
    description:
      "Dive into hidden gems and see the world through a different lens.",
  },
  {
    url: "/images/hero/unforgettable.jpg",
    title: "Unforgettable Memories",
    description:
      "Join our community of travelers and share stories that last a lifetime.",
  },
  {
    url: "/images/hero/awaits1.jpg",
    title: "Your Journey Awaits",
    description: "Find the perfect destination for your next big escape.",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000); // زمان را به 6 ثانیه افزایش دادم تا فرصت خواندن متن باشد
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-[62vh] min-h-[500px] w-full overflow-hidden bg-gray-900 group">
      {/* اسلایدها */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* تصویر با افکت زوم ملایم */}
          <div
            className={`absolute inset-0 transition-transform duration-[6000ms] ${index === currentIndex ? "scale-110" : "scale-100"}`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* محتوای متنی مخصوص هر اسلاید */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
            <div
              className={`transition-all duration-1000 transform ${
                index === currentIndex
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-white text-4xl md:text-7xl font-bold tracking-tight drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-white text-lg md:text-2xl mt-6 font-medium drop-shadow-lg max-w-2xl mx-auto">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* کنترلهای چپ و راست */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={36} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={36} />
      </button>

      {/* نشانگرهای پایین (دایره‌ها) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex ? "w-10 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
