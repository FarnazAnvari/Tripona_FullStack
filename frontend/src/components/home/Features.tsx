"use client";

import React from "react";

const features = [
  {
    text: "Limitless destinations, countless memories",
  },
  {
    text: "Travel with people who share your passion",
  },
  {
    text: "Creating unforgettable journeys since 2015",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        {/* تیتر اصلی */}
        <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-12 font-medium">
          Travel with purpose, explore with heart
        </h2>

        {/* بخش ویژگی‌ها */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              {/* متن ویژگی */}
              <div className="flex-1 px-8 py-6 md:py-0 text-center">
                <p className="text-gray-800 text-lg md:text-xl leading-snug max-w-[250px] mx-auto">
                  {feature.text}
                </p>
              </div>

              {/* خط جداکننده - فقط در دسکتاپ و بین آیتم‌ها نمایش داده می‌شود */}
              {index < features.length - 1 && (
                <div className="hidden md:block w-px h-16 bg-gray-300" />
              )}

              {/* خط جداکننده افقی برای موبایل (اختیاری) */}
              {index < features.length - 1 && (
                <div className="md:hidden w-16 h-px bg-gray-200 my-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
