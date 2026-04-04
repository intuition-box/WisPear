"use client";

import type { SwipeDirection } from "@/types/swipe";

interface SwipeButtonsProps {
  onSwipe: (direction: SwipeDirection) => void;
}

export function SwipeButtons({ onSwipe }: SwipeButtonsProps) {
  return (
    <div className="flex gap-6 justify-center mt-2">
      <button
        onClick={() => onSwipe("dislike")}
        className="w-16 h-16 rounded-full border-none text-[22px] flex items-center justify-center shadow-card bg-red/8 text-red hover:shadow-md transition-shadow"
        aria-label="No"
      >
        ✕
      </button>
      <button
        onClick={() => onSwipe("like")}
        className="w-16 h-16 rounded-full border-none text-[22px] flex items-center justify-center shadow-card bg-green/8 text-green hover:shadow-md transition-shadow"
        aria-label="Yes"
      >
        ✓
      </button>
    </div>
  );
}
