import React from "react";
import { ChevronRight } from "lucide-react";

const continents = [
  "Africa",
  "Asia",
  "Australia & Oceania",
  "Central America",
  "Europe",
  "Middle East",
  "North America",
  "Polar",
  "South America",
  "All destinations",
];

const countries = [
  "Benin",
  "Lesotho",
  "Tanzania",
  "Botswana",
  "Madagascar",
  "The Gambia",
  "Comoros Island",
  "Malawi",
  "Togo",
  "Egypt",
  "Morocco",
  "Tunisia",
  "Eswatini (Swaziland)",
  "Namibia",
  "Uganda",
  "Ghana",
  "Rwanda",
  "Zambia",
  "Kenya",
  "Senegal",
  "Zanzibar",
  "Sierra Leone",
  "Zimbabwe",
  "South Africa",
];

export default function MegaMenu() {
  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl z-40 flex animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="max-w-[1400px] mx-auto w-full flex">
        {/* ستون سمت چپ: لیست قاره‌ها */}
        <div className="w-1/4 border-r border-gray-100 py-6">
          {continents.map((item, index) => (
            <div
              key={item}
              className={`flex items-center justify-between px-8 py-3 cursor-pointer transition-colors ${index === 0 ? "bg-gray-100 font-bold" : "hover:bg-gray-50 text-gray-700 font-semibold"}`}
            >
              <span className="text-[15px]">{item}</span>
              {item !== "All destinations" && (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </div>
          ))}
        </div>

        {/* ستون سمت راست: لیست کشورها */}
        <div className="w-3/4 p-10">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Africa</h2>
          <div className="grid grid-cols-3 gap-y-4 gap-x-8">
            {countries.map((country) => (
              <a
                key={country}
                href="#"
                className="text-[15px] text-gray-600 hover:text-brand-red transition-colors"
              >
                {country}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
