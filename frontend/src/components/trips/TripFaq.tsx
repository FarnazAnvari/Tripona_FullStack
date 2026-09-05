"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface TripFaqProps {
  faqs?: FaqItem[];
}

export default function TripFaq({ faqs = [] }: TripFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-xl font-black text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Everything you need to know before booking this trip.
      </p>

      <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/50">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="p-4 sm:p-5">
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between gap-4 text-left font-bold text-gray-900 transition hover:text-red-600"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-red-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 text-sm leading-relaxed text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
