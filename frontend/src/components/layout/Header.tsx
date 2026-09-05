"use client";

import { useState, useEffect } from "react"; // useEffect اضافه شد برای مدیریت اسکرول
import Link from "next/link";
import { Heart, User, Phone, ChevronRight, Menu, X } from "lucide-react";

// Destinations (بدون تغییر)
const destinationsData: Record<string, string[]> = {
  Africa: ["Egypt", "Morocco", "South Africa", "Kenya", "Tanzania"],
  Asia: [
    "Armenia",
    "Hong Kong",
    "Maldives",
    "Taiwan",
    "Azerbaijan",
    "India",
    "Mongolia",
    "Tajikistan",
    "Bali",
    "Indonesia",
    "Nepal",
    "Thailand",
    "Bhutan",
    "Japan",
    "Pakistan",
    "Tibet",
    "Borneo",
    "Kazakhstan",
    "Philippines",
    "Timor-Leste",
    "Cambodia",
    "Kyrgyzstan",
    "Singapore",
    "Turkmenistan",
    "China",
    "Laos",
    "South Korea",
    "Uzbekistan",
    "Georgia",
    "Malaysia",
    "Sri Lanka",
    "Vietnam",
  ],
  "Australia & Oceania": ["Australia", "New Zealand"],
  "Central America": ["Costa Rica", "Belize"],
  Europe: ["Italy", "Greece", "Iceland", "Spain"],
  "Middle East": ["Jordan", "Turkey"],
  "North America": ["USA", "Canada"],
  Polar: ["Antarctica"],
  "South America": ["Peru", "Brazil"],
  "All destinations": [],
};

// Ways to travel (بدون تغییر)
const waysToTravelData: Record<string, string[]> = {
  Themes: [
    "18 to 35s",
    "Rail",
    "Cruises",
    "Sailing",
    "Cycling",
    "Short Breaks",
    "Expeditions",
    "Solo travel",
    "Family",
    "Tailor-Made",
    "Festivals",
    "Walking & trekking",
    "Food",
    "Wildlife",
    "Multi-active",
    "Women's Expeditions",
    "Polar",
    "View all themes",
  ],
  Styles: ["Basics", "Original", "Comfort", "Premium"],
  "New trips": ["New for 2024", "New for 2025"],
};

// Deals (بدون تغییر)
const dealsData = [
  "Last minute deals",
  "Early bird offers",
  "Discounted trips",
  "Special promotions",
  "View all deals",
];

// About (بدون تغییر)
const aboutData = [
  "About Tripona",
  "Our mission",
  "Responsible travel",
  "Careers",
  "Press & media",
  "Contact us",
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeContinent, setActiveContinent] = useState("Asia");
  const [activeWay, setActiveWay] = useState("Themes");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileView, setMobileView] = useState<
    | "main"
    | "destinations"
    | "continent"
    | "ways"
    | "wayCategory"
    | "deals"
    | "about"
  >("main");
  const [mobileContinent, setMobileContinent] = useState<string | null>(null);
  const [mobileWayCategory, setMobileWayCategory] = useState<string | null>(
    null,
  );

  // غیرفعال کردن اسکرول صفحه وقتی منوی موبایل باز است
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenu]);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10 h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="48" fill="#e31c23" />
              <path
                d="M50 20V80M20 50H80"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M30 30L70 70M30 70L70 30"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="50" cy="50" r="8" fill="white" />
            </svg>
            <span className="text-[#e31c23] text-[24px] font-bold tracking-tighter">
              Tripona
            </span>
          </Link>

          {/* Desktop Navigation (بدون تغییر) */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenMenu("destinations")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="relative flex items-center h-full text-[15px] font-semibold text-[#222] cursor-pointer">
                Destinations
                <span
                  className={`absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e31c23] transition-opacity ${openMenu === "destinations" ? "opacity-100" : "opacity-0"}`}
                ></span>
              </span>
              {openMenu === "destinations" && (
                <div className="absolute left-0 top-full mt-[1px] w-[980px] bg-white border border-gray-200 shadow-2xl flex rounded-b-lg overflow-hidden">
                  <div className="w-[280px] border-r border-gray-100 p-4 flex flex-col gap-1">
                    {Object.keys(destinationsData).map((item) => (
                      <div
                        key={item}
                        onMouseEnter={() => setActiveContinent(item)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-md cursor-pointer ${activeContinent === item ? "bg-gray-100 font-bold" : "hover:bg-gray-50 font-semibold text-gray-700"}`}
                      >
                        <span className="text-[14px]">{item}</span>
                        {item !== "All destinations" && (
                          <ChevronRight size={14} className="text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold mb-6">
                      {activeContinent}
                    </h2>
                    <div className="grid grid-cols-4 gap-y-3.5 gap-x-6">
                      {destinationsData[activeContinent]?.map((country) => (
                        <Link
                          key={country}
                          href="#"
                          className="text-[14px] text-gray-600 hover:text-[#e31c23]"
                        >
                          {country}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenMenu("ways")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="relative flex items-center h-full text-[15px] font-semibold text-[#222] cursor-pointer">
                Ways to travel
                <span
                  className={`absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e31c23] transition-opacity ${openMenu === "ways" ? "opacity-100" : "opacity-0"}`}
                ></span>
              </span>
              {openMenu === "ways" && (
                <div className="absolute left-0 top-full mt-[1px] w-[700px] bg-white border border-gray-200 shadow-2xl flex rounded-b-lg overflow-hidden">
                  <div className="w-[220px] border-r border-gray-100 p-4 flex flex-col gap-1">
                    {Object.keys(waysToTravelData).map((item) => (
                      <div
                        key={item}
                        onMouseEnter={() => setActiveWay(item)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-md cursor-pointer ${activeWay === item ? "bg-gray-100 font-bold" : "hover:bg-gray-50 font-semibold text-gray-700"}`}
                      >
                        <span className="text-[14px]">{item}</span>
                        {item !== "New trips" && (
                          <ChevronRight size={14} className="text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold mb-6">{activeWay}</h2>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                      {waysToTravelData[activeWay]?.map((item) => (
                        <Link
                          key={item}
                          href="#"
                          className="text-[15px] text-gray-600 hover:text-[#e31c23]"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenMenu("deals")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="relative flex items-center h-full text-[15px] font-semibold text-[#222] cursor-pointer">
                Deals
                <span
                  className={`absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e31c23] transition-opacity ${openMenu === "deals" ? "opacity-100" : "opacity-0"}`}
                ></span>
              </span>
              {openMenu === "deals" && (
                <div className="absolute left-0 top-full mt-[1px] w-[260px] bg-white border border-gray-200 shadow-xl rounded-b-lg p-4 flex flex-col gap-1">
                  {dealsData.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="px-4 py-2.5 rounded-md font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e31c23]"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenMenu("about")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="relative flex items-center h-full text-[15px] font-semibold text-[#222] cursor-pointer">
                About
                <span
                  className={`absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e31c23] transition-opacity ${openMenu === "about" ? "opacity-100" : "opacity-0"}`}
                ></span>
              </span>
              {openMenu === "about" && (
                <div className="absolute left-0 top-full mt-[1px] w-[260px] bg-white border border-gray-200 shadow-xl rounded-b-lg p-4 flex flex-col gap-1">
                  {aboutData.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="px-4 py-2.5 rounded-md font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e31c23]"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right side (Desktop Icons & Hamburger) */}
        <div className="flex items-center gap-6 text-gray-800">
          <div className="hidden lg:flex items-center gap-6">
            <Link href="#" className="hover:text-[#e31c23]">
              <Heart size={22} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="hover:text-[#e31c23]">
              <User size={22} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="hover:text-[#e31c23]">
              <Phone size={22} strokeWidth={1.5} />
            </Link>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      <div
        className={`fixed inset-0 bg-white z-[100] transition-transform duration-300 transform ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col h-full bg-white overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-5">
            {mobileView !== "main" && (
              <button
                onClick={() => {
                  if (mobileView === "continent") setMobileView("destinations");
                  else if (mobileView === "wayCategory") setMobileView("ways");
                  else setMobileView("main");
                }}
                className="text-[16px]"
              >
                ← Back
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenu(false);
                setMobileView("main");
              }}
              className="ml-auto"
            >
              <X size={32} strokeWidth={1.5} />
            </button>
          </div>

          {/* MAIN MENU */}
          {mobileView === "main" && (
            <div className="flex flex-col px-6">
              <button
                onClick={() => setMobileView("destinations")}
                className="flex justify-between py-5 text-[18px] px-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Destinations
                <ChevronRight size={20} />
              </button>

              <button
                onClick={() => setMobileView("ways")}
                className="flex justify-between py-5 text-[18px] px-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Ways to travel
                <ChevronRight size={20} />
              </button>

              <button
                onClick={() => setMobileView("deals")}
                className="flex justify-between py-5 text-[18px] px-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Deals
                <ChevronRight size={20} />
              </button>

              <button
                onClick={() => setMobileView("about")}
                className="flex justify-between py-5 text-[18px] px-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                About
                <ChevronRight size={20} />
              </button>

              <div className="px-0 my-4">
                <div className="h-[1px] bg-gray-200 w-full" />
              </div>

              <Link
                href="#"
                className="flex items-center gap-4 text-[17px] py-4 px-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Heart size={26} />
                Wishlist
              </Link>

              <Link
                href="#"
                className="flex items-center gap-4 text-[17px] py-4 px-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <User size={26} />
                Manage booking
              </Link>

              <Link
                href="#"
                className="flex items-center gap-4 text-[17px] py-4 px-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Phone size={26} />
                Contact us
              </Link>
            </div>
          )}

          {/* DESTINATIONS LEVEL */}
          {mobileView === "destinations" && (
            <div className="flex flex-col px-6">
              {Object.keys(destinationsData).map((continent) => (
                <button
                  key={continent}
                  onClick={() => {
                    setMobileContinent(continent);
                    setMobileView("continent");
                  }}
                  className="flex justify-between py-5 text-[18px] px-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {continent}
                  {continent !== "All destinations" && (
                    <ChevronRight size={20} />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* CONTINENT COUNTRIES */}
          {mobileView === "continent" && mobileContinent && (
            <div className="flex flex-col px-6">
              {destinationsData[mobileContinent]?.map((country) => (
                <Link
                  key={country}
                  href="#"
                  className="py-4 text-[17px] px-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {country}
                </Link>
              ))}
            </div>
          )}

          {/* WAYS TO TRAVEL LEVEL */}
          {mobileView === "ways" && (
            <div className="flex flex-col px-6">
              {Object.keys(waysToTravelData).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setMobileWayCategory(cat);
                    setMobileView("wayCategory");
                  }}
                  className="flex justify-between py-5 text-[18px] px-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {cat}
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          )}

          {/* WAY CATEGORY ITEMS */}
          {mobileView === "wayCategory" && mobileWayCategory && (
            <div className="flex flex-col px-6">
              {waysToTravelData[mobileWayCategory]?.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="py-4 text-[17px] px-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}

          {/* DEALS */}
          {mobileView === "deals" && (
            <div className="flex flex-col px-6">
              {dealsData.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="py-4 text-[17px] px-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}

          {/* ABOUT */}
          {mobileView === "about" && (
            <div className="flex flex-col px-6">
              {aboutData.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="py-4 text-[17px] px-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
