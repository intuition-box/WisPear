
import type { SwipeDirection } from "@/types/swipe";

interface SwipeButtonsProps {
  onSwipe: (direction: SwipeDirection) => void;
  onSkip?: () => void;
}

export function SwipeButtons({ onSwipe, onSkip }: SwipeButtonsProps) {
  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <div className="flex gap-8 justify-center">
        <button
          onClick={() => onSwipe("dislike")}
          className="w-[64px] h-[64px] rounded-full text-[24px] flex items-center justify-center bg-red-soft text-red shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Disagree"
        >
          ✕
        </button>
        <button
          onClick={() => onSwipe("like")}
          className="w-[64px] h-[64px] rounded-full text-[24px] flex items-center justify-center bg-green-soft text-green shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Agree"
        >
          ✓
        </button>
      </div>
      {onSkip && (
        <button
          onClick={onSkip}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-bg-raised border border-line hover:border-line-strong text-[13px] font-medium text-ink-muted hover:text-ink-secondary shadow-xs hover:shadow-sm active:scale-95 transition-all duration-200"
        >
          Skip — I don't know
        </button>
      )}
    </div>
  );
}
