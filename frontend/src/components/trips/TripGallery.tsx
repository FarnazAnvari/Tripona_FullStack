"use client";

import { useState } from "react";
import Image from "next/image";

interface TripGalleryProps {
  images: string[];
}

export default function TripGallery({ images }: TripGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md">
        <Image
          src={selectedImage || images[0]}
          alt="Trip preview"
          fill
          priority
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                selectedImage === img
                  ? "border-red-600 ring-2 ring-red-600/20"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
