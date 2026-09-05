"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stories = [
  {
    id: 1,
    category: "memorable stories",
    title: "The Unfinished Canvas in the Shadow of the Louvre",
    image: "/images/stories/story-1.jpg",
    link: "/stories/louvre-canvas",
  },
  {
    id: 2,
    category: "memorable stories",
    title: "The Shadow of the Leaning Tower",
    image: "/images/stories/story-2.jpg",
    link: "/stories/leaning-tower",
  },
  {
    id: 3,
    category: "memorable stories",
    title: "The Melody Between the Streets of Barcelona",
    image: "/images/stories/story-3.jpg",
    link: "/stories/barcelona-melody",
  },
  {
    id: 4,
    category: "memorable stories",
    title: "The Bicycle by the Canal",
    image: "/images/stories/story-4.jpg",
    link: "/stories/canal-bicycle",
  },
  {
    id: 5,
    category: "memorable stories",
    title: "The Light Over the Frozen Harbor",
    image: "/images/stories/story-5.jpg",
    link: "/stories/frozen-harbor",
  },
  {
    id: 6,
    category: "memorable stories",
    title: "The Line Through Berlin",
    image: "/images/stories/story-6.jpg",
    link: "/stories/berlin-line",
  },
];

const GoodStoriesSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const nextSlide = () => {
    if (startIndex + visibleCount < stories.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + visibleCount < stories.length;

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-10 py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Get inspired on The Good Times
        </h2>

        <button className="px-6 py-2 border border-black rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm">
          Read all stories
        </button>
      </div>

      <div className="relative">
        {/* arrows */}
        <div className="absolute inset-0 pointer-events-none group">
          {canGoPrev && (
            <button
              onClick={prevSlide}
              className="pointer-events-auto absolute -left-5 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 bg-white/95 rounded-full flex items-center justify-center
              shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100
              transition hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {canGoNext && (
            <button
              onClick={nextSlide}
              className="pointer-events-auto absolute -right-5 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 bg-white/95 rounded-full flex items-center justify-center
              shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100
              transition hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>

        {/* carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
            }}
          >
            {stories.map((story) => (
              <div
                key={story.id}
                className="min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[20%] px-2"
              >
                <Link
                  href={story.link}
                  className="block bg-white rounded-2xl overflow-hidden border border-gray-100
                  h-full group/card cursor-pointer
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width:640px) 100vw,
                             (max-width:768px) 50vw,
                             (max-width:1024px) 33vw,
                             20vw"
                      className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                      priority
                    />
                  </div>

                  {/* content */}
                  <div className="p-5 flex-grow">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      {story.category}
                    </p>

                    <h3 className="text-lg font-bold text-gray-900 leading-snug transition-colors group-hover/card:text-gray-700">
                      {story.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoodStoriesSection;
