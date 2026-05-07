"use client";

import { useState } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#e8e8e6]">
        <img
          src={images[active]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-[16/9] rounded-xl overflow-hidden bg-[#e8e8e6] ring-2 transition-all duration-200 ${
                i === active
                  ? "ring-[#ecc744]"
                  : "ring-transparent hover:ring-[rgba(28,28,25,0.2)]"
              }`}
            >
              <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
