"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ChatWidget from "@/components/home/ChatWidget";

const Footer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const footerLinks = {
    Booking: [
      "My Booking",
      "Submit trip feedback",
      "Safe Travels Hub",
      "Travel Alerts",
      "Flexible bookings",
      "Booking conditions",
      "Agent login",
    ],
    Company: [
      "About us",
      "The Good Times",
      "Intrepid DMC",
      "Careers",
      "Privacy policy",
      "Your privacy choices",
      "Intrepidtravel.com accessibility statement",
    ],
    Contact: ["Get in touch", "Live chat", "FAQ", "Reviews", "Newsroom"],
    Purpose: [
      "B Corp",
      "The Intrepid Foundation",
      "People",
      "Planet",
      "Wildlife",
      "Modern Slavery Statement",
    ],
  };

  return (
    <footer className="relative bg-[#F9F9F9] pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-4 space-y-8">
            <div className="max-w-xs">
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                Change region
              </label>

              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-3 px-4 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer">
                  <option>Global</option>
                  <option>Australia</option>
                  <option>Europe</option>
                  <option>United States</option>
                </select>

                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[15px] text-gray-800 leading-relaxed">
                Subscribe and save USD $100 on <br />
                your next trip.{" "}
                <span className="underline cursor-pointer">T&Cs apply.</span>
              </p>

              <button className="bg-black text-white px-10 py-3.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors w-full sm:w-auto">
                Subscribe to emails
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold text-gray-900 mb-5">{title}</h4>

                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[14px] text-gray-600 hover:text-black transition-colors flex items-center"
                      >
                        {link === "Your privacy choices" && (
                          <span className="mr-2 text-blue-500 text-xs">✓✕</span>
                        )}
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="border-2 border-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              B
            </div>

            <div className="text-[10px] leading-tight font-bold uppercase">
              Certified <br /> Corporation
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-800 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-blue-600 transition-colors" />
            <FaInstagram className="cursor-pointer hover:text-pink-600 transition-colors" />
            <FaTiktok className="cursor-pointer hover:opacity-70 transition-opacity" />
            <FaXTwitter className="cursor-pointer hover:opacity-70 transition-opacity" />
            <FaYoutube className="cursor-pointer hover:text-red-600 transition-colors" />
            <FaLinkedinIn className="cursor-pointer hover:text-blue-700 transition-colors" />
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#E41F26] text-white px-4 py-3 rounded-full shadow-2xl cursor-pointer flex items-center gap-2 hover:bg-[#c91b21] transition-colors"
      >
        <span className="bg-white/20 p-1.5 rounded-full">
          <MessageCircle size={20} />
        </span>
        <span className="font-bold text-xs">Live chat</span>
      </button>
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </footer>
  );
};

export default Footer;
